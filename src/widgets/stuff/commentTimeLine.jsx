/**
 * 个人主页的侧边栏：我的评论记录
 */
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
    Card,
    CardBody,
    Avatar,
    Button,
    ButtonGroup,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { getCommentByUserId } from "@/utils/api";
import { Link } from "react-router-dom";

const PAGE_SIZE = 3;


export function CommentTimeline({ user_id }) {
    if (user_id === undefined) {
        return null;
    }
    if (user_id === null) {
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
    } = getCommentByUserId(user_id, PAGE_SIZE);

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
            <Card className="w-auto mt-8 ml-5 ">
                <CardBody>
                    <Link to={`/user/comment`}>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            我的评论记录
                        </Typography>
                    </Link>

                    {isEmpty ? <p>没有记录呢</p> : null}
                    <div className="w-auto">
                        <Timeline>
                            {issues.map((issue, index) => {
                                return (
                                    <TimelineItem className="h-28">
                                        {index !== issues.length - 1 && (
                                            <TimelineConnector className="!w-[78px]" />
                                        )}
                                        <Link to={`/book/${issue.book_id}`}>
                                            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 border-none">
                                                <TimelineIcon className="p-0" variant="ghost">
                                                    <Avatar size="sm" src={`https://images.weserv.nl/?url=${issue.cover_image_url}`} alt={issue.title} variant="square" />
                                                </TimelineIcon>
                                                <div className="flex flex-col gap-1">
                                                    <Typography variant="h6" color="blue-gray">
                                                        {issue.content.length > 20
                                                            ? issue.content.substring(0, 20) + "..."
                                                            : issue.content}
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                        {issue.create_time}
                                                    </Typography>
                                                </div>
                                            </TimelineHeader>
                                        </Link>

                                    </TimelineItem>
                                );
                            })}
                        </Timeline>
                    </div>
                </CardBody>
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

        </div>
    );
}

CommentTimeline.displayName = "@/widgets/stuff/commentTimeLine.jsx";

export default CommentTimeline;