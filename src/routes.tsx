import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.tsx';
import MainPage from './pages/main.tsx';
import DataPage from './pages/data_page.tsx';
import AdminPage from './pages/admin_page.tsx';
import AboutPage from './pages/about_page.tsx';
import NoticePage from './pages/notice/notice_page.tsx';
import NoticeDetailPage from './pages/notice/notice_detail.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

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
    element: (<ProtectedRoute><MainPage /></ProtectedRoute>),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/data',
    element: (<ProtectedRoute><DataPage /></ProtectedRoute>),
  },
  {
    path: "/admin",
    element: (<ProtectedRoute><AdminPage /></ProtectedRoute>)
  },
  {
    path: '/about',
    element: (<ProtectedRoute><AboutPage /></ProtectedRoute>)
  },
  {
    path: '/notice',
    element: (<ProtectedRoute><NoticePage /></ProtectedRoute>)
  },
  {
    path: '/notice/:id',
    element: (<ProtectedRoute><NoticeDetailPage /></ProtectedRoute>)
  }
]);
