import { FunctionComponent } from 'react';
import AuthLogin from 'pages/AuthLogin';
import AdminHome from 'pages/AdminHome';
import AdminService from 'pages/AdminService';
import AdminServiceCategory from 'pages/AdminServiceCategory';
import AdminServiceCategoryEdit from 'pages/AdminServiceCategoryEdit';
import AdminServicePackage from 'pages/AdminServicePackage';
import AdminServicePackageEdit from 'pages/AdminServicePackageEdit';

interface Route {
  path: string;
  scope: string;
  component: FunctionComponent
}

const routes: Route[] = [
  {
    path: '/login',
    scope: 'auth',
    component: AuthLogin,
  },
  {
    path: '/admin/home',
    scope: 'admin',
    component: AdminHome,
  },
  {
    path: '/admin/service',
    scope: 'admin',
    component: AdminService,
  },
  {
    path: '/admin/service/category',
    scope: 'admin',
    component: AdminServiceCategory,
  },
  {
    path: '/admin/service/category/:id',
    scope: 'admin',
    component: AdminServiceCategoryEdit,
  },
  {
    path: '/admin/service/package',
    scope: 'admin',
    component: AdminServicePackage,
  },
  {
    path: '/admin/service/package/:id',
    scope: 'admin',
    component: AdminServicePackageEdit,
  },
];

export default routes;