import {
  data,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import { login } from '~/api/auth.api';
import LoginForm from '~/components/auth/LoginForm';
import { createUserSession, getAuthData } from '~/services/session.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const errors: { [key: string]: string } = {};

  if (!username.trim()) {
    errors.username = 'Invalid username';
  }

  if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters';
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const { accessToken, refreshToken, expiresAt } = await login({
      username,
      password,
    });

    return await createUserSession({
      accessToken,
      refreshToken,
      expiresAt,
      redirectTo: '/',
    });
  } catch (error) {
    return data(
      {
        errors: { general: 'Username or password is incorrect' },
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

export default function LoginRoute() {
  return <LoginForm />;
}
