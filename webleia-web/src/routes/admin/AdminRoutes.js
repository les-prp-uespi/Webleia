import {
  DashboardPage,
  ReadTextualGenrePage,
  EditTextualGenrePage,
  HomePage,
} from '../../pages';

export const AdminRoutes = [
  {
    index: true,
    element: <DashboardPage />,
  },
  {
    path: 'textual-genre',
    element: <ReadTextualGenrePage />,
  },
  {
    path: 'textual-genre/edit/:id',
    element: <EditTextualGenrePage />,
  },
  {
    path: 'perfil-aluno/:id',
    element: <HomePage />
  }
];
