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
import React, { useState, useEffect } from "react";
import {
  Link,
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import WillReadPage from "./willReadPage.jsx";
import ReadingPage from "./readingPage.jsx";
import HaveReadPage from "./haveReadPage.jsx";
import { userProfileData } from "@/data";
import { getAction } from "@/utils/api";
function BookFilter({
  userid,
  willReadBookNum,
  readingBookNum,
  haveReadBookNum,
}) {
  return (
    <div className="space-x-4">
      <Link to={`/dashboard/${userid}/will-read`}>
        <button className="rounded-md bg-blue-500 py-2 px-4 text-white">
          <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
          想读 ({willReadBookNum} 本)
        </button>
      </Link>
      <Link to={`/dashboard/${userid}/currently-reading`}>
        <button className="rounded-md bg-green-500 py-2 px-4 text-white">
          <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
          在读 ({readingBookNum} 本)
        </button>
      </Link>
      <Link to={`/dashboard/${userid}/have-read`}>
        <button className="rounded-md bg-yellow-500 py-2 px-4 text-white">
          <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
          读过 ({haveReadBookNum} 本)
        </button>
      </Link>
    </div>
  );
}

function BookList({ books }) {
  if (books.length === 0) {
    return <div className="text-4xl text-gray-300">这里空空的...</div>;
  }

  const bookElements = books.map((book, index) => (
    <div key={index} className="flex flex-col items-center">
      <Link to={`/dashboard/home?query=${book.book_id}`}>
        <img
          src={`https://images.weserv.nl/?url=${book.cover_image_url}`}
          alt={book.title}
          className="h-40 w-32 rounded-md"
        />
      </Link>
      <Typography variant="h5" color="gray-500" className="mt-1 mb-2">
        {book.title}
      </Typography>
    </div>
  ));

  // 计算需要添加的空白元素数量
  const emptyElementsCount = Math.max(0, 5 - books.length);

  // 生成空白元素
  const emptyElements = Array.from(
    { length: emptyElementsCount },
    (_, index) => <div key={`empty-${index}`} className="h-40 w-32" />
  );

  return (
    <div className="flex space-x-4">
      {bookElements}
      {emptyElements}
    </div>
  );
}

export function UserProfile() {
  const { userid } = useParams(); // 获取路由参数
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  //   const query = queryParams.get("query");
  const [willReadBookData, setWillReadBookData] = useState([]);
  const [readingBookData, setReadingBookData] = useState([]);
  const [haveReadBookData, setHaveReadBookData] = useState([]);
  const currentPageParam = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    currentPageParam ? parseInt(currentPageParam) : 1
  );
  //   const [totalPages, setTotalPages] = useState("");
  //   const [totalRecords, setTotalRecords] = useState("");
  useEffect(() => {
    // 在组件加载后执行的代码
    console.log(userid);
    getPageInfo(1, setWillReadBookData);
    getPageInfo(2, setReadingBookData);
    getPageInfo(3, setHaveReadBookData);
    setCurrentPage(1);
  }, [userid]);

  function getPageInfo(type, setFuction) {
    //type=1:想读，type=2：在读,type=3:读过
    getAction(1, 2, 0, userid).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        console.log("success!");
        const contents = resp.data["content"];
        const collect_type = contents.map((content) => content.collect_type);
        const indices = [];
        collect_type.forEach((value, index) => {
          if (value === type) {
            indices.push(index);
          }
        });
        const books = indices.map((index) => contents[index].book);
        const collect_time = indices.map(
          (index) => contents[index].collect_time
        );
        const bookData = [];
        books.forEach((book) => {
          const author = book.author;
          const book_id = book.book_id;
          const image = book.cover_image_url;
          const des = book.description;
          const rate = book.rating_avg;
          const name = book.title;
          const publisher = book.publisher;
          const date = book.publish_date;
          const bookObj = {
            author,
            book_id,
            image,
            des,
            rate,
            name,
            publisher,
            date,
          };
          bookData.push(bookObj);
        });
        setFuction(bookData);
        // setTotalPages(totalPages);
        // setTotalRecords(totalRecords);
      } else {
        console.log("fail!");
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
              {userProfileData.map(
                (
                  {
                    user_img,
                    user_id,
                    username,
                    password,
                    register_time,
                    is_admin,
                  },
                  index // 添加索引参数
                ) => (
                  <div key={user_id} className="flex items-center">
                    {index === 0 && ( // 仅在索引为0（即第一个对象）时渲染
                      <>
                        <img
                          src={user_img}
                          alt={username}
                          className="h-20 w-20 rounded-lg shadow-lg shadow-blue-gray-500/40"
                        />
                        <div className="ml-10">
                          <Typography
                            variant="h3"
                            color="blue-gray"
                            className="mb-1"
                          >
                            {username}
                          </Typography>
                          {/* <Typography
                            variant="lead"
                            className="font-normal text-blue-gray-600"
                          >
                            {author}
                          </Typography> */}
                          {/* <Typography
                            variant="lead"
                            className="font-normal text-blue-gray-600"
                          >
                            {rating_avg} / 10.0分 {rating_num}人评分{" "}
                            {comment_count}个评论
                          </Typography> */}
                          <Typography
                            variant="paragraph"
                            className="font-normal text-blue-gray-600"
                          >
                            "{register_time}加入"
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <BookFilter
              userid={userid}
              willReadBookNum={willReadBookData.length}
              readingBookNum={readingBookData.length}
              haveReadBookNum={haveReadBookData.length}
            />
          </div>
          <div>
            <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4">
              <Typography variant="h4" className="mb-2 text-blue-gray-300">
                想读
              </Typography>
              <BookList books={willReadBookData.slice(0, 6)} />
            </div>

            <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4">
              <Typography variant="h4" className="mb-2 text-blue-gray-300">
                在读
              </Typography>
              <BookList books={readingBookData.slice(0, 6)} />
            </div>

            <div className="p-4">
              <Typography variant="h4" className="mb-2 text-blue-gray-300">
                已读
              </Typography>
              <BookList books={haveReadBookData.slice(0, 6)} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default UserProfile;
