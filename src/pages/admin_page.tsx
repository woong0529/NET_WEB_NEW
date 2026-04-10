import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


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

    if (loading) return <div className="p-8 text-white">로딩 중...</div>;

    return (
        <div className="min-h-screen bg-slate-900 p-8 pt-24 text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-blue-400">관리자 승인 대기 명단</h1>

                {pendingUsers.length === 0 ? (
                    <p className="text-gray-400">현재 승인 대기 중인 인원이 없습니다.</p>
                ) : (
                    <div className="space-y-4">
                        {pendingUsers.map((user) => (
                            <div key={user.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-gray-400">{user.email}</p>
                                    <p className="text-xs text-gray-500">가입일: {user.createdAt?.toDate().toLocaleDateString()}</p>
                                </div>
                                <Button
                                    onClick={() => handleApprove(user.id)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white"
                                >
                                    승인하기
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}