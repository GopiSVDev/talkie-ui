import { createCookieSessionStorage, redirect } from "react-router";

const { SESSION_SECRET } = process.env;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET || "secretSession"],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const EXPIRES_AT_KEY = "expiresAt";

export async function createUserSession({
  request,
  accessToken,
  refreshToken,
  expiresAt,
  redirectTo = "/",
}: {
  request: Request;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  redirectTo?: string;
}) {
  const session = await getSession(request.headers.get("Cookie"));

  session.set(ACCESS_TOKEN_KEY, accessToken);
  session.set(REFRESH_TOKEN_KEY, refreshToken);
  session.set(EXPIRES_AT_KEY, expiresAt);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    },
  });
}

export async function getAuthData(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get(ACCESS_TOKEN_KEY);
  const refreshToken = session.get(REFRESH_TOKEN_KEY);
  const expiresAt = session.get(EXPIRES_AT_KEY);

  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken,
    expiresAt,
    isAuthenticated: true,
  };
}

export async function getToken(request: Request) {
  const authData = await getAuthData(request);
  return authData?.accessToken || null;
}

export async function requireAuth(
  request: Request,
  redirectTo: string = "/auth/login"
) {
  const authData = await getAuthData(request);

  if (!authData?.accessToken) {
    throw redirect(redirectTo);
  }

  return authData;
}

export async function logout(
  request: Request,
  redirectTo: string = "/auth/login"
) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
