import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import '../styles/index.css'




export default function DataPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/main');
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
          <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-2xl font-bold text-white">NET 자료실</h1>
                <Button
                  onClick={handleBack}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-lg hover:bg-white/20 hover:border-white/40 transition-all">
                  뒤로가기
                </Button>
              </div>
            </div>
          </header>
    
          {/* 메인 컨텐츠 */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">이곳은 NET 자료실입니다!</h2>
              <p className="text-gray-200">
                동아리에서 공유하는 학습 자료와 문서를 확인할 수 있습니다. 아래 버튼을 클릭하여 구글 드라이브에 저장된 자료실로 이동하세요.
              </p>
            </div>

            


            {/* 메뉴 버튼들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 신입생 교육 자료실 버튼 */}
              <button
                onClick={() => window.open('https://drive.google.com/drive/folders/11ERmd1dKu1VHTuS9kM5ccxfcNDDvpVEe?usp=sharing', '_blank')}
                className="group relative bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-8 hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">신입생 교육 자료실</h3>
                  <p className="text-gray-300 text-center">신입생 교육 자료를 확인할 수 있습니다.</p>
                </div>
              </button>
    
              {/* 족보 저장 버튼 */}
              <button
                onClick={() => window.open('https://drive.google.com/drive/folders/1O0o5lsXt9R9nPgXLd-VKsGmZ3w2Cno6N', '_blank')}
                className="group relative bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-8 hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">족보 드라이브</h3>
                  <p className="text-gray-300 text-center">가지고 있는 족보를 공유하고 원하는 과목의 족보를 찾아보세요!</p>
                </div>
              </button>
            </div>
          </main>
        </div>
      );
    
    
}