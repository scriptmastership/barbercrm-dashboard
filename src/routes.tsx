import { FunctionComponent } from 'react';
import AuthLogin from 'pages/AuthLogin';
import AdminHome from 'pages/AdminHome';
import AdminCalendar from 'pages/AdminCalendar';
import AdminProgram from 'pages/AdminProgram';
import AdminTeam from 'pages/AdminTeam';
import AdminService from 'pages/AdminService';
import AdminServiceCategory from 'pages/AdminServiceCategory';
import AdminServiceCategoryEdit from 'pages/AdminServiceCategoryEdit';
import AdminServicePackage from 'pages/AdminServicePackage';
import AdminServicePackageEdit from 'pages/AdminServicePackageEdit';
import AdminClient from 'pages/AdminClient';
import AdminNotification from 'pages/AdminNotification';
import AdminPrint from 'pages/AdminPrint';

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
    path: '/admin/calendar',
    scope: 'admin',
    component: AdminCalendar,
  },
  {
    path: '/admin/program',
    scope: 'admin',
    component: AdminProgram,
  },
  {
    path: '/admin/team',
    scope: 'admin',
    component: AdminTeam,
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
  {
    path: '/admin/client',
    scope: 'admin',
    component: AdminClient,
  },
  {
    path: '/admin/notification',
    scope: 'admin',
    component: AdminNotification,
  },
  {
    path: '/admin/print',
    scope: 'admin',
    component: AdminPrint,
  },
];

export default routes;