import {
    Avatar,
    Textarea,
    Button,
} from "@material-tailwind/react";
import { addComment } from "@/utils/api";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export function Comment({book_id}) 
{
    const { isLoggedIn, user } = useUser(); // 使用useUser钩子来获取用户状态
    const avatar_url = import.meta.env.VITE_BASE_URL + '/' + user.avatar_path;
    let savedCommentName = `${book_id}_${user.user_id}_draftData`;
    // 用户添加评论
    const [comment, setComment] = useState("");
    const [statusMessage, setStatusMessage] = useState(""); // 用于显示状态消息

    // 当用户登录状态发生变化时，重新获取评论
    useEffect(() => {
        const savedData = localStorage.getItem(savedCommentName);
        if (savedData) {
            setComment(savedData)
        }
    }, [user]);

    const handleCommentChange = (e) => {
        const value = e.target.value;
        if (value.length <= 500) {
            // 只有当输入长度不超过 500 时才更新状态
            setComment(value);
        } else {
            setStatusMessage("要不再精简一下?");
        }
    }

    const handleCommentCancel = () => {
        setComment("");
        localStorage.removeItem(savedCommentName);
        setStatusMessage("已取消评论"); // 设置状态消息为已取消评论
    }

    const handleCommentSave = () => {
        // 将当前表单数据保存到 localStorage
        localStorage.setItem(savedCommentName, comment);
        setTimeout(() => {
            setStatusMessage("评论已暂存"); // 设置状态消息为评论已暂存
        }, 1000);
    };

    const handleCommentSubmit = () => {
        addComment(book_id, user.user_id, comment).then((resp) => {
            var code = resp.data["code"].toString();
            if (code === "0") {
                setComment("");
                localStorage.removeItem(savedCommentName);
                setStatusMessage("评论提交成功"); // 设置状态消息为评论已提交
            } else {
                setStatusMessage("评论提交失败");
            }
        });
    }
    return (
        <div className="relative w-full">
            <Textarea variant="static" placeholder="墨薮书评多逸事,何妨挥翰与题辞" value={comment} onChange={handleCommentChange} rows={8} />
            <div className="flex w-full justify-between py-1.5">
                <Avatar src={avatar_url} size="sm"></Avatar>
                <div className="flex gap-2">
                    <Button size="md" color="red" className="rounded-md" onClick={handleCommentCancel}>
                        算了
                    </Button>
                    <Button size="md" color="blue" className="rounded-md" onClick={handleCommentSave}>
                        暂存
                    </Button>
                    <Button size="md" color="green" className="rounded-md" onClick={handleCommentSubmit}>
                        好了
                    </Button>
                </div>
                {statusMessage && (
                    <div className="mt-2 text-green-500">{statusMessage}</div>
                )}
            </div>
        </div>
    );
}

Comment.displayName = "/src/widgets/stuff/comment.jsx";

export default Comment;