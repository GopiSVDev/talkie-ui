import { useAuthStore } from "~/store/useAuthStore";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Talkie" },
    { name: "description", content: "Instant messages, real conversations." },
  ];
}

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <>LOGGED IN</>;
}
