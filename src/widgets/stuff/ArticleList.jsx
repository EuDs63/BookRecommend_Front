/**
 * 个人主页的侧边栏：我的评论记录
 */
import {
    Typography,
    Card,
    CardBody,
    Avatar,
    Button,
    ButtonGroup,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { getArticleRecordByBookId } from "@/utils/api";
import { Link } from "react-router-dom";
import { BookArticleCard } from "@/widgets/cards";

const PAGE_SIZE = 5;


export function ArticleList({ book_id }) {
    if (book_id === undefined) {
        return null;
    }
    if (book_id === null) {
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
    } = getArticleRecordByBookId(book_id, PAGE_SIZE);

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
                长评
            </Typography>
            <Card className="w-auto mt-8 ml-5 ">
                <div>

                    {isEmpty ? (<Typography variant="h4" color="blue-gray" className="mb-3">
                        暂无评论，期待您的
                        <Link className="text-cyan-500" to={`/book/article_review/${book_id}`}>点评
                        </Link>
                    </Typography>) : null}
                    <ul className="flex flex-col gap-10">
                        {issues.map((props, index) => (
                            <div className="max-h-50 w-full overflow-y-auto">
                                <div key={props.comment_id} className="mb-4">
                                    <BookArticleCard {...props} />
                                    {index < issues.length - 1 && (
                                        <hr className="mt-4 border-t border-gray-300" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>

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

ArticleList.displayName = "@/widgets/stuff/commentTimeLine.jsx";

export default ArticleList;