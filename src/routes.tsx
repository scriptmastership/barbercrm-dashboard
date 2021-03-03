import { FunctionComponent } from 'react';
import Login from 'pages/auth/Login';

interface Route {
  path: string;
  title: string;
  scope: string;
  component: FunctionComponent
}

const routes: Route[] = [
  {
    path: '/login',
    title: 'Login',
    scope: 'auth',
    component: Login,
  }
];

export default routes;