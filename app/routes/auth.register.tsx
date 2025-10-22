import { data, redirect, type ActionFunctionArgs } from "react-router";
import RegisterForm from "~/components/auth/RegisterForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log(username, password);

  const errors: { [key: string]: string } = {};

  if (!username.trim()) {
    errors.username = "Invalid username";
  }

  if (password.length < 8) {
    errors.password = "Password should be at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return redirect("/");
}

export default function RegisterRoute() {
  return <RegisterForm />;
}
