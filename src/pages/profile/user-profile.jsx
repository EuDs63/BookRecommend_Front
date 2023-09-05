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
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import WillReadPage from "./willReadPage.jsx";
import ReadingPage from "./readingPage.jsx";
import HaveReadPage from "./haveReadPage.jsx";
import {
  willReadBookData,
  readingBookData,
  haveReadBookData,
  userProfileData,
} from "@/data";

function BookFilter({ willReadBookNum, readingBookNum, haveReadBookNum }) {
  return (
    <div className="space-x-4">
      <Link to="/will-read">
        <button className="rounded-md bg-blue-500 py-2 px-4 text-white">
          <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
          想读 ({willReadBookNum} 本)
        </button>
      </Link>
      <Link to="/currently-reading">
        <button className="rounded-md bg-green-500 py-2 px-4 text-white">
          <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
          在读 ({readingBookNum} 本)
        </button>
      </Link>
      <Link to="/have-read">
        <button className="rounded-md bg-yellow-500 py-2 px-4 text-white">
          <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
          读过 ({haveReadBookNum} 本)
        </button>
      </Link>
    </div>
  );
}

function BookList({ books }) {
  return (
    <div className="flex justify-between space-x-4">
      {" "}
      {/* 添加 justify-between 类 */}
      {books.map((book, index) => (
        <div key={index} className="flex flex-col items-center">
          <Link to={`/book/${book.id}`}>
            <img
              src={`https://images.weserv.nl/?url=${book.cover_image}`}
              alt={book.title}
              className="h-40 w-32 rounded-md"
            />
          </Link>
          <Typography variant="h5" color="gray-500" className="mt-1 mb-2">
            {book.title}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function UserProfile() {
  const [willReadBookNum, setWillReadBookNum] = useState(0);
  const [readingBookNum, setReadingBookNum] = useState(0);
  const [haveReadBookNum, setHaveReadBookNum] = useState(0);

  //   // 假设这是从后端获取数据的逻辑
  //   useEffect(() => {
  //     // 获取 willReadBook 数据并计算数量
  //     // 获取 readingBook 数据并计算数量
  //     // 获取 haveReadBook 数据并计算数量
  //     // 更新相应的数量状态
  //     setWillReadBookNum(/* 计算数量的逻辑 */);
  //     setReadingBookNum(/* 计算数量的逻辑 */);
  //     setHaveReadBookNum(/* 计算数量的逻辑 */);
  //   }, []); // 确保只在组件加载时运行一次
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
              willReadBookNum={willReadBookNum}
              readingBookNum={readingBookNum}
              haveReadBookNum={haveReadBookNum}
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
