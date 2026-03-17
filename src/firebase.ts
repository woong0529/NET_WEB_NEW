// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBRNJcRIChGLeaFdH7JShTM7_ZJnjP8R-w",
    authDomain: "net-login-7c68a.firebaseapp.com",
    projectId: "net-login-7c68a",
    storageBucket: "net-login-7c68a.firebasestorage.app",
    messagingSenderId: "53195102418",
    appId: "1:53195102418:web:513dcde61a59895047350b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 이제 다른 파일에서 이 'auth'를 불러다 쓸 거예요!