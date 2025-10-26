import { createCookieSessionStorage, redirect } from 'react-router';
import { refreshTokens } from '~/api/auth.api';
import { isTokenExpired, shouldRefreshToken } from '~/utils/jwt';

const { SESSION_SECRET } = process.env;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [SESSION_SECRET || 'secretSession'],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const EXPIRES_AT_KEY = 'expiresAt';

export async function createUserSession({
  accessToken,
  refreshToken,
  expiresAt,
  redirectTo = '/',
}: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  redirectTo?: string;
}) {
  const session = await getSession();

  session.set(ACCESS_TOKEN_KEY, accessToken);
  session.set(REFRESH_TOKEN_KEY, refreshToken);
  session.set(EXPIRES_AT_KEY, expiresAt);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}

export async function getAuthData(request: Request) {
  try {
    const session = await getSession(request.headers.get('Cookie'));

    const accessToken = session.get(ACCESS_TOKEN_KEY);
    const refreshToken = session.get(REFRESH_TOKEN_KEY);
    const expiresAt = session.get(EXPIRES_AT_KEY);

    if (!accessToken || typeof accessToken !== 'string') return null;

    const expiresAtNumber = expiresAt ? parseInt(expiresAt) : null;
    if (isTokenExpired(expiresAtNumber)) return null;

    return {
      accessToken,
      refreshToken: refreshToken || null,
      expiresAt: expiresAtNumber || null,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error('Error reading auth data from session:', error);
    return null;
  }
}

export async function getToken(request: Request) {
  const authData = await getAuthData(request);
  return authData?.accessToken || null;
}

export async function refreshAuthSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const currentRefreshToken = session.get(REFRESH_TOKEN_KEY);

  if (!currentRefreshToken || typeof currentRefreshToken !== 'string') {
    return null;
  }

  const { accessToken, expiresAt } = await refreshTokens(currentRefreshToken);

  session.set(ACCESS_TOKEN_KEY, accessToken);
  session.set(EXPIRES_AT_KEY, expiresAt);

  return new Response(null, {
    headers: {
      'Set-Cookie': await commitSession(session, { maxAge: 60 * 60 * 24 * 7 }),
    },
  });
}

export async function requireAuth(
  request: Request,
  redirectTo: string = '/auth/login',
) {
  let authData = await getAuthData(request);

  if (!authData) {
    throw redirect(redirectTo);
  }

  if (shouldRefreshToken(authData.expiresAt)) {
    const refreshResponse = await refreshAuthSession(request);

    if (refreshResponse) {
      return refreshResponse;
    } else {
      throw redirect(redirectTo);
    }
  }

  return authData;
}

export async function logout(
  request: Request,
  redirectTo: string = '/auth/login',
) {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}
