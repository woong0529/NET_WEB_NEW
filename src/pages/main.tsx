import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // 혹은 'react-router'
import { router } from '../routes.tsx' // 방금 고친 그 파일
import '../styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 이게 핵심입니다! App 대신 RouterProvider가 들어가야 해요 */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

export default function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">동아리 메인</h1>
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">환영합니다!</h2>
          <p className="text-gray-600">
            동아리 메인 페이지입니다. 여기에 원하는 컨텐츠를 추가할 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  );
}
