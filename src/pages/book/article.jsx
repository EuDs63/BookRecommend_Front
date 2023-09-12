import { getArticle } from "@/utils/api";
import { useParams } from "react-router-dom";
import {
    Avatar,
    Textarea,
    Button,
    Typography,
    Spinner,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";

export function Article() {
    const { article_id } = useParams(); // 获取URL中的book_id参数
    const { data, isLoading, isError } = getArticle(article_id);
    
    if (isLoading) {
        return <Spinner className="h-16 w-16 text-gray-900/50" />;
    }
    if (isError) {
        console.log(isError);
        return <div>error</div>;
    }
    const avatar_url = import.meta.env.VITE_BASE_URL + '/' + data.avatar_path;
    const username = data.username;
    const create_time = data.create_time;

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
                                    {username}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {create_time} 发表
                                </Typography>
                            </div>
                        </div>

                    </div>
                    <div className="mb-12 grid gap-12 px-4 ">
                        <div className="flex gap-3 flex-col">
                            <Typography variant="h1" color="blue-gray" className="text-center">
                                {data.article_title}
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: data.content }} />
                        </div>


                    </div>

                </CardBody>
            </Card>

        </>
    );
}

export default Article;