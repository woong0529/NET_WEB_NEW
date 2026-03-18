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
    <div className="min-h-screen relative overflow-hidden">
      {/* 배경 - 검은색 베이스 + 테크 느낌 */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: '#000000',
        }}
      >
        {/* 그리드 패턴 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
        
        {/* 밝은 파란색 원형 글로우 효과 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* 통통 튀는 작은 사각형들 */}
        <div className="absolute top-20 left-1/3 w-3 h-3 bg-blue-400 rounded-sm animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-cyan-300 rounded-sm animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-1/2 w-3 h-3 bg-blue-500 rounded-sm animate-bounce" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 rounded-sm animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        {/* 대각선 라인 효과 */}
        <div 
          className="absolute -top-1/2 -right-1/2 w-full h-full opacity-10"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.5) 50%, transparent 60%)',
            transform: 'rotate(-15deg)',
          }}
        ></div>
      </div>
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">NET 홈페이지</h1>
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">컴퓨터공학과 동아리 NET 홈페이지에 오신 것을 환영합니다!</h2>
          <p className="text-gray-600">
            이곳은 컴퓨터공학과 동아리 NET의 공식 홈페이지입니다. 동아리 활동, 공지사항, 프로젝트 소개 등 다양한 정보를 제공하고 있습니다. 회원 여러분의 활발한 참여와 관심 부탁드립니다!
          </p>
        </div>
      </main>
    </div>
  );
}
