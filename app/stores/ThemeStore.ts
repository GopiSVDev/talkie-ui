import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '~/constants/app';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

interface ThemeStore {
  theme: string;
  setTheme: (themeId: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: THEMES.LIGHT,

      setTheme: (themeId) =>
        set((state) => ({
          theme: Object.values(THEMES).includes(themeId as any)
            ? themeId
            : state.theme,
        })),
    }),
    {
      name: STORAGE_KEYS.THEME,
    },
  ),
);
