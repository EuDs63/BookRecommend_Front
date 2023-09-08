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
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams, useLocation } from "react-router-dom";
import { ProfileInfoCard, BookCommentsCard } from "@/widgets/cards";
import { recommendedBooksData, bookCommentsData } from "@/data";
import { commentInfo, getBookInfomation } from "@/utils/api";



//点击一个“详情”页面将给出Info_type=1,bookId=X;
//经过推荐系统将返回四个bookId,Info_type=0;
//需要在userEffect函数里fetch评论
//useEffect函数需要四个操作:1. fetch一个详细信息 2. 推荐算法 3. fetch四个推荐信息 4. fectch评论

export function BookDetail() {

  const { book_id } = useParams();
  const { data, isLoading, isError } = getBookInfomation(book_id, 1);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  if (data) {
    const book = data.book;
    console.log(book);

  return (
    <div>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 ">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div key={book.book_id} className="flex items-center">
                <>
                  <img
                    src={`https://images.weserv.nl/?url=${book.cover_image_url}`}
                    alt={book.title}
                    className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div className="ml-10">
                    <Typography variant="h3" color="blue-gray" className="mb-1">
                      {book.title}
                    </Typography>
                    <Typography
                      variant="lead"
                      className="font-normal text-blue-gray-600"
                    >
                      {book.author}
                    </Typography>
                    <Typography
                      variant="lead"
                      className="font-normal text-blue-gray-600"
                    >
                      {book.rating_avg} / 10.0分{" "}
                      {book.rating_num}人评分{" "}
                      {book.comment_count}
                      个评论
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className="font-normal text-blue-gray-600"
                    >
                      "{book.description}"
                    </Typography>
                  </div>
                </>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              {book.length > 0 && (
                <ProfileInfoCard
                  details={{
                    出版社: book.publisher,
                    ISBN: book.isbn,
                    出版日期: book.publish_date,
                    类别: book.category,
                    页数: book.page_num,
                    标签: book.tag,
                  }}
                  action={
                    <Tooltip content="Edit Profile">
                      <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                    </Tooltip>
                  }
                />
              )}
            </div>
            <div className="">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    想看
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    在看
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    看过
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="my-12"></div>{" "}
          {/* 使用 my-12 类来添加垂直间距，也可以根据需要调整数字部分 */}
          <div className="px-4 pb-4 ">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              您可能会感兴趣
            </Typography>
            <hr className="border-t border-gray-300" /> {/* 分隔线 */}
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {recommendedBooksData.map(
                ({
                  author,
                  book_id,
                  cover_image,
                  title,
                  description,
                  rating_avg,
                  route,
                  members,
                }) => (
                  <Card key={book_id} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="relative mx-0 mt-0 mb-4 h-48 w-36 overflow-hidden"
                    >
                      <img
                        src={`https://images.weserv.nl/?url=${cover_image}`}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {rating_avg}分 {author}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-blue-gray-500overflow-hidden font-normal "
                        style={{ textOverflow: "ellipsis" }}
                      >
                        {description.length > 50
                          ? description.substring(0, 50) + "..."
                          : description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <div className="flex items-center justify-between">
                        <Link to={route}>
                          <Button variant="outlined" size="sm">
                            查看详情
                          </Button>
                        </Link>
                        <div>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                  }`}
                              />
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
          <div className="my-12"></div>{" "}
          {/* 使用 my-12 类来添加垂直间距，也可以根据需要调整数字部分 */}
          <div>
            <Typography variant="h4" color="blue-gray" className="mb-3">
              热门评论
            </Typography>
            <ul className="flex flex-col gap-10">
              {bookCommentsData.map((props, index) => (
                <div className="max-h-50 w-full overflow-y-auto">
                  <div key={props.comment_id} className="mb-4">
                    <BookCommentsCard {...props} />
                    {index < bookCommentsData.length - 1 && (
                      <hr className="mt-4 border-t border-gray-300" />
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
}

export default BookDetail;
