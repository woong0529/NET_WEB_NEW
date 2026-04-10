import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.tsx';
import MainPage from './pages/main.tsx';
import DataPage from './pages/data_page.tsx';
import AdminPage from './pages/admin_page.tsx';
import AboutPage from './pages/about_page.tsx';
import NoticePage from './pages/notice/notice_page.tsx';
import NoticeDetailPage from './pages/notice/notice_detail.tsx';

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
  {
    path: '/data',
    element: <DataPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/notice',
    element: <NoticePage />
  },
  {
    path: '/notice/:id',
    element: <NoticeDetailPage />
  }
]);
