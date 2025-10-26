import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('auth', 'routes/auth.tsx', [
    route('login', 'routes/auth.login.tsx'),
    route('register', 'routes/auth.register.tsx'),
    route('guest', 'routes/auth.guest.tsx'),
  ]),
] satisfies RouteConfig;
