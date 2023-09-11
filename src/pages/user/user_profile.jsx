import {
  Card,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";

import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import {Link,useLocation} from "react-router-dom";
import { getAction } from "@/utils/api";
import { useUser } from "@/context/UserContext";

// 三个按钮
function BookFilter({
  willReadBookNum,
  readingBookNum,
  haveReadBookNum,}) 
{
  return (
    <div className="space-x-4">
      <Link to={`/user/wish`}>
        <button className="rounded-md bg-blue-500 py-2 px-4 text-white">
          <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
          想读 ({willReadBookNum} 本)
        </button>
      </Link>
      <Link to={`/user/do`}>
        <button className="rounded-md bg-green-500 py-2 px-4 text-white">
          <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
          在读 ({readingBookNum} 本)
        </button>
      </Link>
      <Link to={`/user/collect`}>
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
      <Link to={`/book/${book.book_id}`}>
        <img
          src={`https://images.weserv.nl/?url=${book.image}`}
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
  const { user } = useUser(); // 使用useUser钩子来获取用户状态
  const avatar_url = import.meta.env.VITE_BASE_URL + '/' + user.avatar_path;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [willReadBookData, setWillReadBookData] = useState([]);
  const [readingBookData, setReadingBookData] = useState([]);
  const [haveReadBookData, setHaveReadBookData] = useState([]);
  const currentPageParam = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    currentPageParam ? parseInt(currentPageParam) : 1
  );

  useEffect(() => {
    // 在组件加载后执行的代码
    getPageInfo(1, setWillReadBookData);
    getPageInfo(2, setReadingBookData);
    getPageInfo(3, setHaveReadBookData);
    setCurrentPage(1);
  }, []);

  function getPageInfo(type, setFuction) {
    //type=1:想读，type=2：在读,type=3:读过
    getAction(1, 2, 0, user.user_id).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
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
              <Avatar src={avatar_url} alt="user.username" variant="square" className="h-20 w-20 rounded-lg shadow-lg shadow-blue-gray-500/40" />
              <div className="ml-10">
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-1"
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="paragraph"
                  className="font-normal text-blue-gray-600"
                >
                  "{user.register_time}加入"
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <BookFilter
              userid={user.user_id}
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
