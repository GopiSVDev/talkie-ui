import { useAuthStore } from "~/store/useAuthStore";
import type { Route } from "./+types/home";
import AuthPage from "~/pages/AuthPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Talkie" },
    { name: "description", content: "Instant messages, real conversations." },
  ];
}

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Home /> : <AuthPage />;
}
