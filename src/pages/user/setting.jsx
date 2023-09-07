import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Button,
    Input,
    avatar,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "../../context/UserContext";

export function Setting() {
    const { isLoggedIn, user, logout } = useUser(); // 使用useUser钩子来获取用户状态
    const avatar_url = import.meta.env.VITE_BASE_URL+'/'+user.avatar_path;


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
                        <div className="w-96">
                            <Tabs value="app">
                                <TabsHeader>
                                    <Tab value="app">
                                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        App
                                    </Tab>
                                    <Tab value="message">
                                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                        Message
                                    </Tab>
                                    <Tab value="settings">
                                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        Settings
                                    </Tab>
                                </TabsHeader>
                            </Tabs>
                        </div>
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
                        <div>
                            <Typography variant="h4" color="blue-gray">
                                修改密码
                            </Typography>

                            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input type="password" size="lg" label="旧密码" />
                                    <Input type="password" size="lg" label="新密码" />
                                    <Input type="password" size="lg" label="再次确认" />
                                </div>
                                <Button className="mt-6" fullWidth>
                                    保存并重新登录
                                </Button>
                            </form>

                        </div>
                        <div>
                            <Typography variant="h4" color="blue-gray">
                                更换头像
                            </Typography>

                            <Typography
                                variant="small"
                                className="font-normal text-blue-gray-600 mt-2"
                            >
                                请选择图片上传：大小400 * 400像素支持JPG、PNG等格式，图片需小于2M
                            </Typography>

                            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex items-center space-x-6 flex-col">
                                <div className="flex items-center gap-4">
                                    <Avatar src={avatar_url} alt="avatar" />
                                    <div>
                                        <Typography variant="h6">原始头像</Typography>
                                    </div>
                                </div>

                                <label className="block mt-4 items-center">

                                    <input type="file" className="block w-full text-sm text-slate-500
                                                                file:mr-4 file:py-2 file:px-4
                                                                file:rounded-full file:border-0
                                                                file:text-sm file:font-semibold
                                                                file:bg-violet-50 file:text-violet-700
                                                                hover:file:bg-violet-100
                                                                "/>
                                </label>
                            </form>
                        </div>

                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Setting;