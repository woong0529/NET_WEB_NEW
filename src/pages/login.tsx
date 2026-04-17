import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { auth } from '../firebase'; // 위에서 만든 파일
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase'; // firebase.ts에서 getFirestore(app) 내보내기 필요
import { doc, setDoc, getDoc} from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [message, setMessage] = useState('');
  
  // 회원가입 폼 상태
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  const [signupName, setSignupName] = useState('');
  const [loading, setLoading] = useState(false);

// 2. 로그인 상태 감시 (기존 onAuthStateChanged)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("로그인 상태:", user.email);
                // 리액트에서는 alert 대신 보통 조용히 메인으로 보내거나 토스트를 띄웁니다.
                // navigate('/main'); 
            }
        });
        return () => unsubscribe(); // 컴포넌트 종료 시 감시 중단
    }, []);

// 3. 로그인 함수 (기존 클릭 이벤트 리스너)
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
              const userData = userDoc.data();
              if (userData.isApproved) {
                alert(`환영합니다, ${userData.name}님!`);
                navigate('/main');
              } else {
                // 승인되지 않은 경우 즉시 로그아웃 처리
                await auth.signOut();
                alert("아직 승인되지 않은 계정입니다. 관리자 승인을 기다려주세요.");
              }
          }
        } catch (error: any) {
            setMessage("에러: " + error.message);
        }
    };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    // 회원가입 로직
    if (signupPassword !== signupPasswordConfirm) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    if (signupPassword.length < 6) {
      return alert("비밀번호는 최소 6자 이상이어야 합니다.");
    }
    if (!signupName) return alert("이름을 입력해주세요.");

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
      auth,
      signupEmail,
      signupPassword
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: signupName,
        email: signupEmail,
        isAdmin: false,    // 기본값
        isApproved: false, // 기본값
        createdAt: new Date()
      });

      alert(`회원가입 신청이 완료되었습니다! 관리자 승인을 기다려주세요.`);
      await auth.signOut(); // 신청 직후엔 로그아웃 상태 유지
      setShowSignupDialog(false); // 다이얼로그 닫기
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupPasswordConfirm("");
    }
    catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else {
        alert("회원가입 실패: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const emailInput = prompt("비밀번호 재설정 링크를 보낼 이메일을 입력하세요:");

    if (!emailInput) return;

    try {
      await sendPasswordResetEmail(auth, emailInput);
      alert("이메일로 비밀번호 재설정 링크를 보냈습니다! 스팸 메일함도 확인해 보세요.");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("해당 이메일로 가입된 유저가 없습니다.");
      } else {
        alert("에러 발생: " + error.message);
      }
    }
  };


// 웹페이지 디자인 코드 부분  
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
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
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-6 mb-8">
            {/* 헤더 */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">NET 로그인</h1>
              <p className="text-white">계정에 로그인하세요</p>
            </div>

            {/* 로그인 폼 */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                로그인
              </Button>
              <div>{/* 에러 메시지 표시 */}
                {message && <p id="message" className="text-red-500">{message}</p>}
              </div>
            </form>

          <Button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-white hover:underline mt-2"
          >
            비밀번호를 잊으셨나요?
          </Button>


            {/* 구분선 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500"></span>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => setShowSignupDialog(true)}
            >
              회원가입
            </Button>
          </div>
        </div>

        {/* 회원가입 다이얼로그 */}
        <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>회원가입</DialogTitle>
              <DialogDescription>
                새 계정을 만들어 동아리에 가입하세요
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-black">
                  이름
                </Label>
                <Input
                  id="signup-name"
                  placeholder="최웅철"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-black">
                  이메일
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="example@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-black">
                  비밀번호
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password-confirm" className="text-black">
                  비밀번호 확인
                </Label>
                <Input
                  id="signup-password-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={signupPasswordConfirm}
                  onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin">🌀</span> 처리 중...
                    </div>
                  ) : (
                    "가입하기"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowSignupDialog(false)}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
}
