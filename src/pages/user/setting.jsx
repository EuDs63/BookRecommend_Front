import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Button,
    Input,
    Tooltip,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { changePassword, changeAvatar } from "@/utils/api";
import { useNavigate } from 'react-router-dom';
import { ActionTimeline,BookTimeline } from "@/widgets/stuff";

export function Setting() {
    const { isLoggedIn, user, logout, change_avatar } = useUser(); // 使用useUser钩子来获取用户状态
    const avatar_url = import.meta.env.VITE_BASE_URL + '/' + user.avatar_path;
    const [origin_password, setOrigin_password] = useState(""); // 用于保存用户输入的原始密码
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const navigateTo = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUpload = () => {
        if (selectedFile) {
            console.log(selectedFile);

            changeAvatar(selectedFile, user).then((resp) => {
                var code = resp.data['code'].toString();
                var avatar_path = resp.data['avatar_path'];
                if (code === '0') {
                    setUploadStatus('修改成功');
                    change_avatar(avatar_path);
                }
            }).catch((error) => {
                setUploadStatus('修改失败，请重试');
            });
        } else {
            console.log('请选择图片');
            setUploadStatus('请选择图片');
        }
    };

    const handleOrigin_passwordChange = (e) => {
        setOrigin_password(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePassword_confirmationChange = (e) => {
        setPassword_confirmation(e.target.value);
    }

    function handleChangePassword() {
        // 验证两次密码输入是否一致
        if (password !== password_confirmation) {
            alert("两次密码输入不一致");
            return;
        }
        // 两次密码输入一致，准备发送更改密码请求
        changePassword(origin_password, password).then((resp) => {
            var code = resp.data['code'].toString();
            var message = resp.data['msg'];
            if (code === '0') {
                alert(message);
                navigateTo('/auth/sign-in');
            } else {
                alert(message);
            }
        });
    }

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={avatar_url}
                                alt="bruce-mars"
                                size="xl"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    {user.username}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {user.register_time} 加入
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                        <div className="flex gap-3">
                            <Typography variant="h4" color="blue-gray">
                                修改密码
                            </Typography>

                            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input type="password" size="lg" label="旧密码" onChange={handleOrigin_passwordChange} />
                                    <Input type="password" label="新密码" size="lg" onChange={handlePasswordChange} />
                                    <Input type="password" label="再次确认" size="lg" onChange={handlePassword_confirmationChange} />

                                </div>
                                <Button className="mt-6" fullWidth onClick={handleChangePassword}>
                                    保存并重新登录
                                </Button>
                            </form>

                        </div>
                        <div>
                            <div className="flex gap-3">
                                <Typography variant="h4" color="blue-gray">
                                    更换头像
                                </Typography>
                                <Tooltip
                                    placement="right-end"
                                    className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                    content={
                                        <div className="w-auto">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-80"
                                            >
                                                <p>建议大小400 * 400像素</p>
                                                <p>支持JPG、PNG等格式</p>
                                            </Typography>
                                        </div>
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                        />
                                    </svg>
                                </Tooltip>

                            </div>

                            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex items-center space-x-6 flex-col">
                                <div className="flex items-center gap-4">
                                    {avatarPreview ? (
                                        <>
                                            <Avatar src={avatarPreview} alt="avatar" />
                                            <div>
                                                <Typography variant="h6">预览头像</Typography>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Avatar src={avatar_url} alt="avatar" />
                                            <div>
                                                <Typography variant="h6">原始头像</Typography>
                                            </div>
                                        </>

                                    )
                                    }

                                </div>

                                <label className="block mt-4 items-center">

                                    <input type="file" name="avatar"
                                        className="block w-full text-sm text-slate-500
                                                   file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                   file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700
                                                   hover:file:bg-violet-100"
                                        onChange={handleFileChange}
                                    />

                                </label>
                                <Button onClick={handleUpload} className="m-auto my-5">上传头像</Button>
                                {uploadStatus && <div>{uploadStatus}</div>}
                            </form>
                        </div>

                    </div>
                </CardBody>
            </Card>
            <ActionTimeline />

            <BookTimeline />
        </>
    );
}

export default Setting;