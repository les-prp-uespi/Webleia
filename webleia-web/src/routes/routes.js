import { createBrowserRouter } from 'react-router-dom';
import { publicMiddleware, authAdminMiddleware, authMiddleware } from '../app/middlewares';
import { AdminRoutes } from './admin';
import { AuthRoutes } from './auth';
import { CommonRoutes } from './common';
import { MainLayout, AuthLayout } from '../app/layouts';

export const Routes = [
  {
    path: '/',
    loader: authMiddleware,
    element: <MainLayout />,
    children: CommonRoutes,
  },
  {
    path: '/auth',
    loader: publicMiddleware,
    element: <AuthLayout />,
    children: AuthRoutes,
  },
  {
    path: '/admin',
    element: <MainLayout />,
    loader: authAdminMiddleware,
    children: AdminRoutes,
  },
];

export default createBrowserRouter(Routes);
