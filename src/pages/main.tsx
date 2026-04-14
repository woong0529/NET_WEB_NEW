import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // 혹은 'react-router'
import { router } from '../routes.tsx' // 방금 고친 그 파일
import '../styles/index.css'
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import logoImg from '../assets/NET_logo.png';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 이게 핵심입니다! App 대신 RouterProvider가 들어가야 해요 */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

interface Notice { 
  id: string;
  title: string;
  createdAt: any;
  isImportant: boolean;
}



export default function MainPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    // 1. 현재 로그인한 유저 상태 감시
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 2. 로그인된 유저가 있다면 Firestore에서 isAdmin 필드 확인
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().isAdmin) {
          setIsAdmin(true);
        }
      }
    });

    return () => unsubscribe(); // 클린업 함수
  }, []);

  useEffect(() => {
    const fetchLatestNotices = async () => {
      try {
        // 최신순 정렬 후 딱 3개만 가져오기 (전공자의 쿼리 최적화!)
        const q = query(
          collection(db, "notices"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Notice[];
        setNotices(data);
      } catch (error) {
        console.error("공지 로딩 실패:", error);
      }
    };

    fetchLatestNotices();
  }, []);

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
      <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* 1. 로고 영역 (좌측) */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src={logoImg}
                alt="NET 동아리 로고" // 웹 접근성: 필수!
                className="
                h-8        /* 모바일: 높이 2rem(32px) 고정 */
                md:h-15     /* 태블릿 이상: 높이 2.5rem(40px) */
                w-auto      /* 비율 유지 */
                object-contain /* 이미지 비율 보존 */
                transition-transform group-hover:scale-105 /* 호버 시 살짝 커지는 효과 */
                "
              />
            </div>

            {isAdmin && (
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="text-yellow-400 hover:text-yellow-300 font-bold"
              >
                승인 관리
              </Button>
            )}

            {/* 2. 네비게이션 & 버튼 영역 (우측) */}
            <div className="flex items-center space-x-4">
              {/* 자료실 메뉴 */}
              <button
                onClick={() => navigate('/data')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-white text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">자료실</span>
              </button>

              {/* 사진 드라이브 메뉴 */}
              <button
                onClick={() => window.open('https://drive.google.com/drive/folders/1O0o5lsXt9R9nPgXLd-VKsGmZ3w2Cno6N', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-white text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">사진 드라이브</span>
              </button>

              <button
                onClick={() => navigate('/about')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-white text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">넷 소개</span>
              </button>

              {/* 구분선 (선택사항: 메뉴와 로그아웃 버튼 사이) */}
              <div className="w-px h-6 bg-white/20 mx-2"></div>

              {/* 로그아웃 버튼 */}
              <Button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-lg hover:bg-white/20 hover:border-white/40 transition-all">
                로그아웃
              </Button>
            </div>

          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* 헤더 높이만큼 패딩 */}

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">소프트웨어융합대학 동아리 NET 홈페이지에 오신 것을 환영합니다!</h2>
          <p className="text-gray-200">
            이곳은 소프트웨어융합대학 동아리 NET의 공식 홈페이지입니다. 동아리 활동, 공지사항, 프로젝트 소개 등 다양한 정보를 제공하고 있습니다. <br />
            회원 여러분의 활발한 참여와 관심 부탁드립니다!
          </p>
        </div>

        {/* 공지 리스트 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4 text-white">📢 최신 공지사항</h2>
          {notices.length === 0 ? (
            <p className="text-center text-gray-500 py-4">등록된 공지사항이 없습니다.</p>
          ) : (
            notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => navigate(`/notice/${notice.id}`)}
                className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {notice.isImportant && (
                    <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/50">
                      필독
                    </span>
                  )}
                  <span className="text-gray-200 group-hover:text-white font-medium line-clamp-1">
                    {notice.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {notice.createdAt?.toDate().toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>

        <Button
          onClick={() => navigate('/notice')}
          className="mt-6 w-full md:w-auto px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-sm rounded-lg hover:bg-blue-500/30 hover:border-blue-400/60 transition-all">
          공지사항 더보기
        </Button>

        <div className="w-full max-w-5xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-white mb-6">📅 동아리 일정</h2>

          {/* 달력 컨테이너: 다크 모드 배경과 조화를 위해 테두리 처리 */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white">
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FSeoul&showPrint=0&title=NET%20%EC%BA%98%EB%A6%B0%EB%8D%94&src=Y3djMDUyOUBraHUuYWMua3I&src=a28uc291dGhfa29yZWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%230b8043" 
            style={{ border: 'solid 1px #777' }} 
            className="w-full h-[600px]"
            frameBorder="0" 
            scrolling="no"
            ></iframe>
          </div>

          <p className="mt-4 text-gray-400 text-sm text-center">
            * 일정을 클릭하면 상세 정보를 확인할 수 있습니다.
          </p>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          
          {/* 동아리 설명 영역 */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-3">NET</h2>
            <p className="text-sm leading-relaxed">
              웹과 인공지능의 경계를 허무는 개발 동아리입니다. <br />
              함께 성장하고 새로운 가치를 만들어갑니다.
            </p>
          </div>

          {/* 위치 및 연락처 영역 */}
          <div className="md:w-1/2 flex flex-col items-center md:items-end text-sm gap-2">
            <div className="flex items-center gap-2">
              <span>📍 위치:</span>
              <p>경희대학교 국제캠퍼스 ㅇㅇ관 ㅇㅇ호</p>
            </div>
            <div className="flex items-center gap-2">
              <span>📸 인스타그램:</span>
              <a 
                href="https://instagram.com/실제주소" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @net_khu_official
              </a>
            </div>
          </div>

        </div>

        {/* 저작권 표시 */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} NET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
