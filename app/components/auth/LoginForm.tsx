import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router";
import { useAuthStore } from "~/store/useAuthStore";
import { guest, login } from "~/api/userApi";

const LoginForm = () => {
  const navigate = useNavigate();
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;

  const [guestLoading, setGuestLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   setLoading(true);
  //   setErrorMsg(null);

  //   try {
  //     const { accessToken, refreshToken, expiresAt } = await login({
  //       username: formValues.username,
  //       password: formValues.password,
  //     });

  //     setToken(token);
  //     setUser(user);

  //     toast.success("Login Successful");

  //     setFormValues({
  //       username: "",
  //       password: "",
  //     });

  //     navigate("/");
  //   } catch (error) {
  //     if (error instanceof Error)
  //       toast.error("Username or password is incorrect");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const guestLogin = async () => {
  //   setGuestLoading(true);

  //   try {
  //     const { token, user } = await guest();

  //     setToken(token);
  //     setUser(user);

  //     toast.success("Guest Login Successful");

  //     navigate("/");
  //   } catch (error) {
  //     if (error instanceof Error) toast.error("Guest Login Failed");
  //   } finally {
  //     setGuestLoading(false);
  //   }
  // };

  const isLoading = fetcher.state !== "idle";

  return (
    <Card className="bg-[#212121] py-5">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login into your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
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
                errors?.username ? "border border-red-500" : ""
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
                errors?.password ? "border border-red-500" : ""
              }`}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* <Button
            onClick={guestLogin}
            type="button"
            className="w-full cursor-pointer text-white bg-purple-600 hover:bg-purple-700"
            disabled={guestLoading}
          >
            {guestLoading ? "Creating Guest Account...." : "Guest Login"}
          </Button> */}
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
