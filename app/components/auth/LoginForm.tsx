import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Form, useActionData, useNavigation } from 'react-router';

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
    <Card className="bg-card py-5">
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
              className="uppercase text-xs font-bold text-foreground"
            >
              Username
            </label>
            <Input
              name="username"
              placeholder="Enter Your Username"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-input text-foreground ${
                errors?.username ? 'border border-destructive' : ''
              }`}
            />
            {errors?.username && (
              <p className="text-destructive text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="uppercase text-xs font-bold text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0  bg-input text-foreground ${
                errors?.password ? 'border border-destructive' : ''
              }`}
            />
            {errors?.password && (
              <p className="text-destructive text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors?.general && (
            <p className="text-destructive text-sm text-center">
              {errors.general}
            </p>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer text-primary-foreground bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        {/* Guest Login */}
        <Form method="post" action="/auth/guest" className="mt-4">
          <Button
            type="submit"
            className="w-full cursor-pointer text-secondary-foreground bg-secondary hover:bg-secondary/90"
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
