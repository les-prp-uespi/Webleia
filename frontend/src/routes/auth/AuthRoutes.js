import { RegisterPage, ForgotPasswordPage, LoginPage } from 'pages';

export const AuthRoutes = [
  {
    index: true,
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'recuperar-senha/:token?',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'cadastro',
    element: <RegisterPage />,
  },
];
