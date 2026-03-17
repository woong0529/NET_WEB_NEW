import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.tsx';
import MainPage from './pages/main.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
