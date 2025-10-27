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
  } catch (error: any) {
    let errorMessage = 'Failed to create guest account';

    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }

    return data(
      {
        errors: { general: errorMessage },
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
