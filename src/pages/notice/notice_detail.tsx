import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '../../components/ui/button';

export default function NoticeDetailPage() {
    const { id } = useParams(); // URL에서 id 파라미터 추출
    const navigate = useNavigate();
    const [notice, setNotice] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "notices", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setNotice(docSnap.data());
                } else {
                    alert("존재하지 않는 공지사항입니다.");
                    navigate('/notice');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id, navigate]);

    if (loading) return <div className="min-h-screen bg-black text-white p-24 text-center">로딩 중...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-gray-400">
                    ← 뒤로가기
                </Button>

                <div className="border-b border-white/10 pb-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        {notice.isImportant && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">필독</span>
                        )}
                        <h1 className="text-3xl font-bold">{notice.title}</h1>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>작성자: {notice.author}</span>
                        <span>작성일: {notice.createdAt?.toDate().toLocaleDateString()}</span>
                    </div>
                </div>

                {/* 공지 내용 (줄바꿈 보존을 위해 whitespace-pre-wrap 사용) */}
                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap min-h-[300px]">
                    {notice.content}
                </div>
            </div>
        </div>
    );
}