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
import { Link } from "react-router-dom";
import { getRatingByUserId } from "@/utils/api";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { RatingStar } from "@/widgets/stuff";
const PAGE_SIZE = 5;

export function UserRating() {
  const { user } = useUser(); // 使用useUser钩子来获取用户状态
  const user_id = user.user_id; // 获取路由参数

  if (user_id === undefined || user_id === null) {
    return null;
  }
  // size: 页数
  const { data, mutate, size, setSize, isValidating, isLoading } =
    getRatingByUserId(user_id, PAGE_SIZE);

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
        我的评分记录
      </Typography>
      <ul className="flex flex-col gap-1">
        <Card>
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
                      <TimelineHeader className="relative rounded-xl border border-none border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                        <TimelineIcon className="p-0" variant="ghost">
                          <Avatar
                            size="sm"
                            src={`https://images.weserv.nl/?url=${issue.cover_image_url}`}
                            alt={issue.title}
                            variant="square"
                          />
                        </TimelineIcon>
                        <div className="flex flex-col gap-1">
                          <Typography variant="h6" color="blue-gray">
                            {`《${issue.title}》`}
                            <RatingStar rating={issue.rating} />
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            {issue.rating_time}
                          </Typography>
                        </div>
                      </TimelineHeader>
                    </Link>
                  </TimelineItem>
                );
              })}
            </Timeline>
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
              <Button disabled={!size} onClick={() => setSize(0)} size="sm">
                折叠
              </Button>
            </ButtonGroup>
          )}
        </Card>
      </ul>
    </div>
  );
}

export default UserRating;
