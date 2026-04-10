import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

interface Notice {
    id: string;
    title: string;
    author: string;
    createdAt: any;
    isImportant: boolean;
}

export default function NoticePage() {
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
        const fetchNotices = async () => {
            // 최신순으로 정렬해서 가져오기
            const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Notice[];
            setNotices(data);
        };
        fetchNotices();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">📢 공지사항</h1>

                <div className="divide-y divide-white/10 border-t border-b border-white/10">
                    {notices.map((notice) => (
                        <div key={notice.id} className="py-4 flex justify-between items-center hover:bg-white/5 px-2 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                                {notice.isImportant && (
                                    <span className="bg-red-500 text-xs px-2 py-1 rounded-full text-white font-bold">필독</span>
                                )}
                                <span className="text-lg">{notice.title}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                <span>{notice.author}</span>
                                <span className="ml-4">{notice.createdAt?.toDate().toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}