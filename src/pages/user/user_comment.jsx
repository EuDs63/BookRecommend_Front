import {
    Typography,
    Card,
    CardBody,
    Button,
    ButtonGroup,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getCommentByUserId } from "@/utils/api";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
const PAGE_SIZE = 5;

export function UserComment() {
    const { user } = useUser(); // 使用useUser钩子来获取用户状态
    const user_id = user.user_id; // 获取路由参数

    if (user_id === undefined || user_id === null) {
        return null;
    }
    // size: 页数
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = getCommentByUserId(user_id,PAGE_SIZE);

    const issues = data ? [].concat(...data) : [];

    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    useEffect(() => {
        setSize(1);
    }, []);


    return (
        <div>
            <Typography variant="h4" color="blue-gray" className="mb-3">
                我的书评
            </Typography>
            <ul className="flex flex-col gap-1">
                <Card>
                    {issues.length > 0 ? (
                        issues.map((issue, index) => (
                            <div className="max-h-50 w-full overflow-y-auto">
                                <div key={index} className="mb-4">
                                    <CardBody
                                        key={index}
                                        className="overflow-hidden h-235 flex"
                                    >
                                        <div>
                                            <Link to={`/book/${issue.book_id}`}>
                                                <img
                                                    src={`https://images.weserv.nl/?url=${issue.cover_image_url}`}
                                                    className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"
                                                />
                                            </Link>
                                        </div>
                                        <div className="ml-20 flex-1">
                                            <div>
                                                <Typography
                                                    className="text-black text-22 font-bold"
                                                >
                                                    {issue.title}
                                                </Typography>
                                            </div>
                                            <div
                                                className="overflow-hidden line-clamp-3"
                                            >
                                                <Typography>{issue.content}</Typography>
                                            </div>
                                            <div className="flex justify-end">
                                                <Typography>{issue.create_time} 评</Typography>
                                            </div>
                                        </div>
                                    </CardBody>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            {/* 当 issues 为空时的内容 */}
                            <Typography className="font-mono text-2xl font-bold text-black">
                                墨薮书评多逸事,何妨挥翰与题辞
                            </Typography>
                        </div>
                    )}
                    {isEmpty ? null : (
                        <ButtonGroup variant="text" className="w-full" fullWidth>
                            <Button
                                disabled={isLoadingMore || isReachingEnd}
                                onClick={() => setSize(size + 1)}
                                size="sm"
                            >
                                {isLoadingMore
                                    ? "loading..."
                                    : isReachingEnd
                                        ? "无了"
                                        : "加载更多"}
                            </Button>
                            <Button disabled={!size} onClick={() => setSize(0)}
                                size="sm">
                                清空
                            </Button>
                        </ButtonGroup>
                    )}
                </Card>
            </ul>
        </div>
    );
}

export default UserComment;