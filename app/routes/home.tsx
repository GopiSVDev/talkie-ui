import type { LoaderFunctionArgs } from 'react-router';
import { requireAuth } from '~/services/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireAuth(request);
}

const Home = () => {
  return <div>Home</div>;
};

export default Home;
