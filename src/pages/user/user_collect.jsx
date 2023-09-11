import {
  Typography,
  Card,
  CardBody,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getCollectByUserId } from "@/utils/api";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
const PAGE_SIZE = 5;

export function UserCollect() {
  const { user } = useUser(); // 使用useUser钩子来获取用户状态
  const user_id = user.user_id; // 获取路由参数

  if (user_id === undefined || user_id === null) {
    return null;
  }
  // size: 页数
  const { data, mutate, size, setSize, isValidating, isLoading } =
    getCollectByUserId(user_id, PAGE_SIZE);
  const issues = data ? [].concat(...data) : [];
  const bookDatas = [];
  issues.map((issue) => {
    const author = issue.book.author;
    const description = issue.book.description;
    const book_id = issue.book.book_id;
    const cover_image_url = issue.book.cover_image_url;
    const rating_avg = issue.book.rating_avg;
    const title = issue.book.title;
    const collect_time = issue.collect_time;
    const collect_type = issue.collect_type;
    const bookObj = {
      author,
      description,
      book_id,
      cover_image_url,
      rating_avg,
      title,
      collect_time,
      collect_type,
    };
    bookDatas.push(bookObj);
  });
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
        我的读书记录
      </Typography>
      <ul className="flex flex-col gap-1">
        <Card>
          {bookDatas.length > 0 ? (
            bookDatas.map((bookData, index) => (
              <div className="max-h-50 w-full overflow-y-auto">
                <div key={index} className="mb-4">
                  <CardBody
                    key={bookData.book_id}
                    className="h-235 flex overflow-hidden"
                  >
                    <div>
                      <Link to={`/book/${bookData.book_id}`}>
                        <img
                          src={`https://images.weserv.nl/?url=${bookData.cover_image_url}`}
                          className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"
                        />
                      </Link>
                    </div>
                    <div className="ml-20 flex-1">
                      <div>
                        <Typography className="text-22 font-bold text-black">
                          {bookData.title}{" "}
                          <span className="line-clamp-3 overflow-hidden">
                            {bookData.rating_avg} 分
                          </span>
                        </Typography>
                      </div>
                      <div>
                        <Typography style={{ color: "blue" }}>
                          {bookData.author}
                        </Typography>
                      </div>
                      <div className="line-clamp-3 overflow-hidden">
                        <Typography>{bookData.description}</Typography>
                      </div>
                      <div className="flex justify-end">
                        <Typography>
                          在 {bookData.collect_time} 我加入了
                        </Typography>
                        <Typography>
                          {bookData.collect_type === 1
                            ? "想读"
                            : bookData.collect_type === 2
                            ? "在读"
                            : bookData.collect_type === 3
                            ? "读过"
                            : ""}
                          清单
                        </Typography>
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
              <Button disabled={!size} onClick={() => setSize(0)} size="sm">
                清空
              </Button>
            </ButtonGroup>
          )}
        </Card>
      </ul>
    </div>
  );
}

export default UserCollect;
