import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Form, useActionData, useFetcher, useNavigation } from 'react-router';

const LoginForm = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  const errors = actionData?.errors;

  const isLoading =
    navigation.state === 'submitting' &&
    navigation.formAction === '/auth/login';

  const guestLoading =
    navigation.state === 'submitting' &&
    navigation.formAction === '/auth/guest';

  return (
    <Card className="bg-[#212121] py-5">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login into your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Form Login */}
        <Form
          className="space-y-6"
          noValidate
          method="post"
          action="/auth/login"
        >
          <div>
            <label
              htmlFor="username"
              className="uppercase text-xs font-bold text-white"
            >
              Username
            </label>
            <Input
              name="username"
              placeholder="Enter Your Username"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-700 text-white ${
                errors?.username ? 'border border-red-500' : ''
              }`}
            />
            {errors?.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="uppercase text-xs font-bold text-white"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0  bg-gray-700 text-white ${
                errors?.password ? 'border border-red-500' : ''
              }`}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors?.general && (
            <p className="text-red-600 text-sm text-center">{errors.general}</p>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        {/* Guest Login */}
        <Form method="post" action="/auth/guest" className="mt-4">
          <Button
            type="submit"
            className="w-full cursor-pointer text-white bg-purple-600 hover:bg-purple-700"
            disabled={guestLoading}
          >
            {guestLoading ? 'Creating Guest Account....' : 'Guest Login'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
