import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import NoticeWriteDialog from './notice/write_notice';



interface UserData {
    id: string;
    name: string;
    email: string;
    isApproved: boolean;
    createdAt: any;
}



export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const [pendingUsers, setPendingUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);


    // 1. 승인 대기 유저 불러오기 함수
    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "users"), where("isApproved", "==", false));
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserData[];

            setPendingUsers(users);
        } catch (error) {
            console.error("데이터 로딩 에러:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/main');
    };

    useEffect(() => {
        const checkAuth = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigate('/login');
                return;
            }
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const data = userDoc.data();

            if (data?.isAdmin) {
                setIsAdmin(true);
            } else {
                alert("권한이 없습니다.");
                navigate('/main');
            }
        };
        checkAuth();
        fetchPendingUsers();
    }, [navigate]);

    if (!isAdmin) { return null; } // 권한 없으면 아무것도 렌더링하지 않음

    // 2. 승인 처리 함수
    const handleApprove = async (userId: string) => {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                isApproved: true
            });
            alert("성공적으로 승인되었습니다!");
            // 목록에서 제거 (새로고침 없이 상태 반영)
            setPendingUsers(prev => prev.filter(user => user.id !== userId));
        } catch (error) {
            alert("승인 중 오류 발생: " + error);
        }
    };

    //3. 삭제 처리 함수
    const handleDelete = async (uid: string, name: string) => {
        if (!window.confirm(`${name} 님의 가입 요청을 거절하고 삭제하시겠습니까?`)) {
            return;
        }

        try {
            await deleteDoc(doc(db, "users", uid));
            alert("가입 요청이 삭제되었습니다.");
            // 리스트 갱신 로직 (예: setUsers(users.filter(u => u.id !== uid)))
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };


    if (loading) return <div className="p-8 text-white">로딩 중...</div>;

    return (
        <div className="min-h-screen bg-slate-900 p-8 pt-24 text-white">
            <div className="max-w-4xl mx-auto space-y-12">

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


                {/* 1. 공지사항 관리 섹션 */}
                <section className="bg-white/5 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-blue-400">📢 공지사항 관리</h2>
                            <p className="text-sm text-gray-400 mt-1">부원들에게 알릴 새로운 소식을 등록하세요.</p>
                        </div>
                        {/* 아까 만든 공지 작성 다이얼로그 컴포넌트 */}
                        <NoticeWriteDialog onSave={fetchPendingUsers} />
                    </div>

                    {/* 간단한 안내 문구 (나중에 여기에 최근 공지 목록을 넣어도 됩니다) */}
                    <div className="text-xs text-gray-500 border-t border-white/10 pt-4">
                        * 작성된 공지는 메인 페이지와 공지사항 탭에 즉시 노출됩니다.
                    </div>
                </section>

                <hr className="border-white/10" />

                {/* 2. 승인 대기 명단 섹션 (기존 코드) */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 text-blue-400">👤 관리자 승인 대기 명단</h2>

                    {pendingUsers.length === 0 ? (
                        <div className="bg-white/5 border border-dashed border-white/20 p-10 rounded-xl text-center">
                            <p className="text-gray-400">현재 승인 대기 중인 인원이 없습니다.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl flex justify-between items-center transition-all hover:bg-white/15"
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold">{user.name}</h2>
                                        <p className="text-gray-400 text-sm">{user.email}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            가입일: {user.createdAt?.toDate().toLocaleDateString()}
                                        </p>
                                    </div>
                                    
                                    
                                    <div className="flex items-center gap-2">
                                    
                                        <Button
                                            onClick={() => handleApprove(user.id)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 shadow-lg shadow-blue-900/20"
                                        >
                                            승인하기
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            variant="destructive" // shadcn/ui 기본 빨간색 스타일
                                            className="h-8 w-8 p-0" // 아이콘만 들어가는 작은 버튼
                                            title="거절 및 삭제"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}