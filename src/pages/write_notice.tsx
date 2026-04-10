import { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

export default function NoticeWriteDialog({ onSave }: { onSave: () => void }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return alert("제목과 내용을 모두 입력해주세요.");

        setLoading(true);
        try {
            await addDoc(collection(db, "notices"), {
                title,
                content,
                isImportant,
                author: auth.currentUser?.email?.split('@')[0] || "관리자", // 이메일 앞부분을 작성자로 사용
                createdAt: serverTimestamp(),
            });

            alert("공지사항이 등록되었습니다.");
            setOpen(false); // 모달 닫기
            setTitle(''); // 초기화
            setContent('');
            setIsImportant(false);
            onSave(); // 목록 새로고침을 위한 콜백
        } catch (error) {
            console.error(error);
            alert("등록 실패!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    새 공지사항 작성
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-slate-900 text-white border-white/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">📢 새 공지사항 등록</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">제목</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="공지 제목을 입력하세요"
                            className="bg-white/5 border-white/20 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">내용</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                            className="min-h-[200px] bg-white/5 border-white/20 text-white"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="important"
                            checked={isImportant}
                            onCheckedChange={(checked: boolean | 'indeterminate') => setIsImportant(!!checked)}
                        />
                        <Label htmlFor="important" className="text-sm font-medium leading-none">
                            필독 공지로 설정 (상단 노출)
                        </Label>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            취소
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                            {loading ? "등록 중..." : "등록하기"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}