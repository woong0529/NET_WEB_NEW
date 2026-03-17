// upload.js (임시 파일)
import { db } from "./src/firebase";
import { doc, setDoc } from "firebase/firestore";

const memberList = [
  {"학번": "20240001", "이름": "홍길동"},
  {"학번": "20240002", "이름": "김철수"},
  // 여기에 아까 복사한 JSON 내용을 붙여넣으세요.
];

async function uploadMembers() {
  for (const member of memberList) {
    // 학번을 문서 ID로 사용하여 중복 방지 및 빠른 조회 가능하게 설정
    await setDoc(doc(db, "allowed_members", member.학번), {
      name: member.이름,
      allowed: true
    });
  }
  console.log("명단 업로드 완료!");
}

uploadMembers();