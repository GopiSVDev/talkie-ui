import { data, redirect, type ActionFunctionArgs } from 'react-router';
import { register } from '~/api/auth.api';
import RegisterForm from '~/components/auth/RegisterForm';
import { createUserSession } from '~/services/session.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const errors: { [key: string]: string } = {};

  if (!username.trim()) {
    errors.username = 'Username is required';
  } else if (username.length < 4) {
    errors.username = 'Username should be atleast 4 characters';
  }

  if (!name.trim()) {
    errors.name = 'Name is required';
  } else if (name.length < 4) {
    errors.name = 'Name should be atleast 4 characters';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const { accessToken, refreshToken, expiresAt } = await register({
      username,
      name,
      password,
    });

    return await createUserSession({
      accessToken,
      refreshToken,
      expiresAt,
      redirectTo: '/',
    });
  } catch (error: any) {
    let errorMessage = 'Failed to create an account';

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

export default function RegisterRoute() {
  return <RegisterForm />;
}
