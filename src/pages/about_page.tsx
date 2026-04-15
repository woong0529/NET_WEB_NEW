
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import '../styles/index.css'
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import gangmin_img from '../assets/gangmin_intro_img.jpg';
import hyemin_img from '../assets/hyemin_intro_img.jpg';
import group_img from '../assets/our_img.jpg';
import logo_img from '../assets/NET_logo.png';


const executives = [
  {
    id: 1,
    name: '정인선',
    position: '회장',
    message: '안녕하세요 정인선입니다',
    image: logo_img
  },
  {
    id: 2,
    name: '송동현',
    position: '부회장',
    message: '안녕하세요 송동현입니다',
    image: logo_img
  },
  {
    id: 3,
    name: '강성윤',
    position: '총무',
    message: '안녕하세요 강성윤입니다',
    image: logo_img
  },
  {
    id: 4,
    name: '최웅철',
    position: '교육부장',
    message: '안녕하세요 최웅철입니다',
    image: logo_img
  },
  {
    id: 5,
    name: '박혜민',
    position: '홍보부장',
    message: '넷에 핑크력 추가~!',
    image: hyemin_img
  },
  {
    id: 6,
    name: '고강민',
    position: '기획부장',
    message: '넷츠기릿넷츠기릿넷츠기릿',
    image: gangmin_img
  }
];


export default function AboutPage() {
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
                        <h1 className="text-2xl font-bold text-white">NET 소개</h1>
                        <Button
                            onClick={handleBack}
                            className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-lg hover:bg-white/20 hover:border-white/40 transition-all">
                            뒤로가기
                        </Button>
                    </div>
                </div>
            </header>



            <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">임원진 소개</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {executives.map((executive) => (
                    <div
                        key={executive.id}
                        className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-6 hover:bg-white/15 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {/* 프로필 사진 */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400/30 hover:border-blue-400/60 transition-colors">
                                    <ImageWithFallback
                                        src={executive.image}
                                        alt={executive.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* 글로우 효과 */}
                                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
                            </div>

                            {/* 이름 */}
                            <h3 className="text-xl font-bold text-white">{executive.name}</h3>

                            {/* 직책 */}
                            <div className="px-4 py-1 bg-blue-500/20 rounded-full border border-blue-400/40">
                                <p className="text-sm text-blue-300 font-semibold">{executive.position}</p>
                            </div>

                            {/* 한마디 */}
                            <p className="text-gray-300 text-center text-sm italic">
                                {executive.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            {/* ✨ 여기서부터 추가할 단체 사진 영역 ✨ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">N.E.T 단체 사진</h2>
                
                {/* 사진 컨테이너 (테두리, 그림자, 마우스 호버 효과) */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                    <img
                        src={group_img} 
                        alt="NET 단체 사진"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* 사진 위에 살짝 어두운 그라데이션을 주어 고급스러운 느낌 추가 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
            </div>
            {/* ✨ 단체 사진 영역 끝 ✨ */}
        </div>
    );
}