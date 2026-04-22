import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "./firebase"; // 본인 경로에 맞게 수정
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isApproved, setIsApproved] = useState<boolean>(false);

    useEffect(() => {
        // 1. Auth 상태 감시
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // 2. Firestore에서 해당 유저의 승인 여부 가져오기
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setIsApproved(data.isApproved || false);
                    }
                } catch (error) {
                    console.error("인증 데이터 조회 실패:", error);
                    setIsApproved(false);
                }
            } else {
                setUser(null);
                setIsApproved(false);
            }
            setLoading(false); // 모든 체크가 끝나면 로딩 해제
        });

        return () => unsubscribe();
    }, []);

    // 로딩 중일 때는 빈 화면이나 스피너를 보여줌 (매우 중요!)
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-900 text-white">
                보안 확인 중...
            </div>
        );
    }

    // 로그인이 아예 안 된 경우 -> 로그인 페이지로
    if (!user) {
        alert("로그인이 필요한 서비스입니다.");
        return <Navigate to="/login" replace />;
    }

    // 로그인은 됐는데 승인이 안 된 경우 -> 대기 안내 페이지 또는 메인으로
    if (!isApproved) {
        alert("관리자의 승인이 필요한 서비스입니다.");
        return <Navigate to="/login" replace />;
        // 혹은 특정 대기 페이지(/waiting)가 있다면 거기로 보내세요.
    }

    // 모두 통과하면 실제 페이지(children) 보여주기
    return <>{children}</>;
}