import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ProfileInfoCard, BookCommentsCard,CollectBoxCard } from "@/widgets/cards";
import { Comment } from "@/widgets/stuff";
import { recommendedBooksData } from "@/data";
import { getBookInfomation, getAction } from "@/utils/api";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

//点击一个“详情”页面将给出Info_type=1,bookId=X;
//经过推荐系统将返回四个bookId,Info_type=0;
//需要在userEffect函数里fetch评论
//useEffect函数需要四个操作:1. fetch一个详细信息 2. 推荐算法 3. fetch四个推荐信息 4. fectch评论

export function BookDetail({book_id}) {
  const { isLoggedIn, user } = useUser(); // 使用useUser钩子来获取用户状态
  const { data, isLoading, isError } = getBookInfomation(book_id, 1);

  // 获取该书籍下的已有评论
  const [userComments, setUserComments] = useState([]);

  function getCommentInfo(book_id) {
    getAction(2, 1, book_id, 0).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        setUserComments(resp.data["content"]);
      } else {
        console.log("fail!");
      }
    });
  }
  // 组件挂载时，获取该书籍下的已有评论
  useEffect(() => {
    getCommentInfo(book_id);
  }, []);


  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />;
  }
  if (isError) {
    console.log(isError);
    return <div>error</div>;
  }
  if (data) {
    if (data.code == -1) {
      return <div>还没有这么多书</div>;
    }


    const book = data.book;
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
                {book && (
                  <ProfileInfoCard
                    details={{
                      出版社: book.publisher,
                      ISBN: book.isbn,
                      出版日期: book.publish_date,
                      类别: book.category,
                      页数: book.page_num,
                      标签: book.tag,
                    }}
                  />
                )}
              </div>
              <div className="">
                {isLoggedIn && (<CollectBoxCard user_id={user.user_id} book_id={book_id} />)}
              </div>

            </div>

            <div className="px-4 pb-4 mt-12">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                同类别推荐
              </Typography>
              <hr className="border-t border-gray-300" />
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
                          <Link to={`/book/${book_id}`}>
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
            <div className="my-12"></div>
            <div>
              <Typography variant="h4" color="blue-gray" className="mb-3">
                短评
              </Typography>
              {userComments.length > 0 ?
                (
                  <ul className="flex flex-col gap-10">
                    {userComments.map((props, index) => (
                      <div className="max-h-50 w-full overflow-y-auto">
                        <div key={props.comment_id} className="mb-4">
                          <BookCommentsCard {...props} />
                          {index < userComments.length - 1 && (
                            <hr className="mt-4 border-t border-gray-300" />
                          )}
                        </div>
                      </div>
                    ))}
                  </ul>
                )
                :
                (
                  <Typography variant="h4" color="blue-gray" className="mb-3">
                    暂无评论，期待您的点评
                  </Typography>
                )
              }
            </div>
          </CardBody>
          <CardFooter>
            <Comment book_id ={book_id}/>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default BookDetail;
