import { FunctionComponent } from 'react';
import Login from 'pages/auth/Login';
import AdminHome from 'pages/admin/Home';
import AdminServices from 'pages/admin/Services';

interface Route {
  path: string;
  scope: string;
  component: FunctionComponent
}

const routes: Route[] = [
  {
    path: '/login',
    scope: 'auth',
    component: Login,
  },
  {
    path: '/admin',
    scope: 'admin',
    component: AdminHome,
  },
  {
    path: '/admin/services',
    scope: 'admin',
    component: AdminServices,
  },
];

export default routes;