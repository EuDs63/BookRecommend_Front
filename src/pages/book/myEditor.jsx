import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { addArticle } from '@/utils/api'
import { useUser } from "@/context/UserContext";
import {
    Avatar,
    Textarea,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function MyEditor() {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('<p>hello</p>')
    const [statusMessage, setStatusMessage] = useState(""); // 用于显示状态消息

    const { isLoggedIn, user } = useUser(); // 使用useUser钩子来获取用户状态
    const avatar_url = import.meta.env.VITE_BASE_URL + '/' + user.avatar_path;
    const user_id = user.user_id; // 获取路由参数

    const book_id = 1;

    const article_title = "test";

    const handleArticleSubmit = () => {
        addArticle(book_id, user_id, editor.getHtml(), article_title).then((resp) => {
            var code = resp.data["code"].toString();
            if (code === "0") {
                setStatusMessage("提交成功");
            } else {
                setStatusMessage("提交失败");
            }
        });
    }

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello&nbsp;<strong>world</strong>.</p>\n<p><br></p>')
        }, 1500)
    }, [])

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
        <div className="flex flex-col">
            <Typography variant="h4" color="blue-gray" className="mb-3">
                我的长评
            </Typography>
            <div className="border border-gray-300 z-10 mt-4">
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    className="h-80"
                />
            </div>
            {isLoggedIn ? (
                <div className="flex w-full justify-between py-1.5">
                    <Avatar src={avatar_url} size="sm"></Avatar>
                    <div className="flex gap-2">
                        {/* <Button size="md" color="red" className="rounded-md" onClick={handleArticleCancel}>
                            算了
                        </Button> */}
                        <Button size="md" color="green" className="rounded-md" onClick={handleArticleSubmit}>
                            好了
                        </Button>
                    </div>
                    {statusMessage && (
                        <div className="mt-2 text-green-500">{statusMessage}</div>
                    )}
                </div>
            ) : (
                <Typography variant="small" className="mt-6 flex justify-center mb-2">
                    <Link to="/auth/sign-in">
                        <Typography
                            as="span"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            登录
                        </Typography>
                    </Link>
                    以发表长评
                </Typography>
            )}
        </div>
        </>
    )
}

export default MyEditor
