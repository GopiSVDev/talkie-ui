import { type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router';
import { logout } from '~/services/session.server';

export async function action({ request }: ActionFunctionArgs) {
  return logout(request, '/auth/login');
}

export async function loader({ request }: LoaderFunctionArgs) {
  return logout(request, '/auth/login');
}

export default function LogoutRoute() {
  return null;
}
