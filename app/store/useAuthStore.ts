import type { UserBase } from "~/types/user";
import { isTokenExpired } from "~/utils/jwt";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setTokens: (
    accessToken: string | null,
    refreshToken?: string | null,
    expiresAt?: number | null
  ) => void;
  logout: (silent?: boolean) => void;
  validateToken: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
      isLoading: false,

      setTokens: (accessToken, refreshToken, expiresAt) => {
        set({
          accessToken,
          refreshToken: refreshToken ?? get().refreshToken,
          expiresAt: expiresAt ?? get().expiresAt,
          isAuthenticated: !!accessToken,
        });

        if (accessToken) {
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${accessToken}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      },

      logout: (silent = false) => {
        set({
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: false,
        });

        localStorage.removeItem("auth-store");
        delete axios.defaults.headers.common["Authorization"];

        if (!silent) {
          toast.success("Logged out successfully");
          window.location.href = "/";
        }
      },

      validateToken: () => {
        const { accessToken, expiresAt } = get();

        if (
          !accessToken ||
          !expiresAt ||
          Date.now() > expiresAt ||
          isTokenExpired(expiresAt)
        ) {
          get().logout(true);
          return false;
        }

        return true;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
      }),
    }
  )
);
