import { data, redirect, type LoaderFunctionArgs } from 'react-router';
import { guestLogin } from '~/api/auth.api';
import { createUserSession, getAuthData } from '~/services/session.server';

export async function action() {
  try {
    const { accessToken, refreshToken, expiresAt } = await guestLogin();

    return await createUserSession({
      accessToken,
      refreshToken,
      expiresAt,
      redirectTo: '/',
    });
  } catch (error) {
    return data(
      {
        errors: { general: 'Failed to create guest account' },
      },
      { status: 400 },
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const authData = await getAuthData(request);

  if (authData?.isAuthenticated) {
    return redirect('/');
  }

  return null;
}
