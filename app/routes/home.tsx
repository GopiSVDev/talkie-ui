import { useAuthStore } from "~/store/useAuthStore";
import type { Route } from "./+types/home";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Talkie" },
    { name: "description", content: "Instant messages, real conversations." },
  ];
}

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>LOGGED IN</>;
}
