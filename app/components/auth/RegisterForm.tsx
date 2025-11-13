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

const RegisterForm = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  const errors = actionData?.errors;

  const isLoading =
    navigation.state === 'submitting' &&
    navigation.formAction === '/auth/register';

  return (
    <Card className="bg-background py-5">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form
          className="space-y-6"
          noValidate
          method="post"
          action="/auth/register"
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
              placeholder="Enter New Username"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0  bg-input text-foreground ${
                errors?.username ? 'border border-destructive' : ''
              }`}
            />
            {errors?.username && (
              <p className="text-destructive text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="uppercase text-xs font-bold text-foreground"
            >
              Name
            </label>
            <Input
              name="name"
              placeholder="Enter New Name"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0  bg-input text-foreground ${
                errors?.name ? 'border border-destructive' : ''
              }`}
            />
            {errors?.name && (
              <p className="text-destructive text-xs mt-1">{errors?.name}</p>
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="uppercase text-xs font-bold text-foreground"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0  bg-input text-foreground ${
                errors?.confirmPassword ? 'border border-destructive' : ''
              }`}
            />
            {errors?.confirmPassword && (
              <p className="text-destructive text-xs mt-1">
                {errors.confirmPassword}
              </p>
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
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
