# 🚀 NET_WEB

배포 주소: [https://net-web-eight.vercel.app/]

## 🛠️ 시작하기 (Getting Started)

아래 순서대로 세팅해 주세요.

0. Node.js 설치하기


1. **저장소 가져오기**
   ```bash
   git clone [레포지토리 주소]
   cd [폴더 이름]

2. npm install
>> 위의 명령어를 터미널(작업 폴더)에 입력하여 필요한 모듈 설치  

<기본설정>
firebase.ts - 서버 api키 등(수정 딱히 필요 x)
package-lock.json / package.json - 호스팅 시 필요한 설정
.gitignore - 깃허브에 올라가면 안되는 파일들 설정

<스타일>
src/assets & components &styles - 디자인에 필요한 부품들

<페이지>
index.html - 첫화면 참조
routes.tsx - 페이지 이동 시 참조하는 페이지
pages/login.tsx - 로그인 페이지
pages/main.tsx - 메인 페이지



**페이지 디자인 시 페이지 코드 하단의 return 안에 코드 작성하면 됨

!중요: 커밋시 반드시 커밋 의도를 메시지로 작성 해주세용