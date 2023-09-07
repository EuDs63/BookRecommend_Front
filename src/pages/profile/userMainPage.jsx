import React from "react";
import { Typography } from "@material-tailwind/react";
import { Carousel, IconButton,Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import {
  willReadBookData,
  readingBookData,
  haveReadBookData,
  bookCommentsData,
  recommendedBooksData,
} from "@/data";
import { ProfileInfoCard, BookCommentsCard } from "@/widgets/cards";
import { useState, useEffect } from "react";
import { getcategorybookInfo } from "@/utils/api";
export function UserMainPage() {
  useEffect(() => {
    getCategoryBookInfo(1, setnewLiteratureData);
    getCategoryBookInfo(2, setnewPopularityData);
    getCategoryBookInfo(3, setnewCultureData);
    getCategoryBookInfo(4, setnewLifeData);
    getCategoryBookInfo(5, setnewManagementData);
    getCategoryBookInfo(6, setnewTechnologyData);
    // 继续添加其他范围和对应的数据更新函数
  }, []);
  function getCategoryBookInfo(range, setDataFunction) {
    getcategorybookInfo(range, 1, 30, 1).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        console.log("success!");
        setDataFunction(resp.data["books"]);
        console.log(resp.data["books"]);
      } else {
        console.log("fail!");
      }
    });
  }

  function generateContent(selectedTab) {
    const tabs = [
      "culture",
      "literature",
      "life",
      "popularity",
      "technology",
      "management",
    ];
    const dataSets = [
      { data: newCultureData, setter: setnewCultureData },
      { data: newLiteratureData, setter: setnewLiteratureData },
      { data: newLifeData, setter: setnewLifeData },
      { data: newPopularityData, setter: setnewPopularityData },
      { data: newTechnologyData, setter: setnewTechnologyData },
      { data: newManagementData, setter: setnewManagementData },
    ];
    const index = tabs.indexOf(selectedTab);
    if (index !== -1) {
      const { data, setter } = dataSets[index];
      return (
          Array.from({ length: 5 }, (_, i) => (
            <div key={i}>
              <BookList books={data.slice(i * 6, (i + 1) * 6)} />
            </div>
          ))
      );
    }
    return null;
  }

  function CarouselDefault({ selectedTab }) {
    const content = generateContent(selectedTab);
    return (
      <Carousel
        className="rounded-xl"

        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="gray"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 text-blue-500" // 按钮的颜色为深蓝色
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="gray"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 text-blue-500" // 按钮的颜色为深蓝色
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        {content}
      </Carousel>
    );
  }

  const [newCultureData, setnewCultureData] = useState([]);
  const [newLiteratureData, setnewLiteratureData] = useState([]);
  const [newLifeData, setnewLifeData] = useState([]);
  const [newPopularityData, setnewPopularityData] = useState([]);
  const [newTechnologyData, setnewTechnologyData] = useState([]);
  const [newManagementData, setnewManagementData] = useState([]);
  const [concernCultureData, setConcernCultureData] = useState([]);
  const [concernLiteratureData, setConcernLiteratureData] = useState([]);
  const [concernLifeData, setConcernLifeData] = useState([]);
  const [concernPopularityData, setConcernPopularityData] = useState([]);
  const [concernTechnologyData, setConcernTechnologyData] = useState([]);
  const [concernManagementData, setConcernManagementData] = useState([]);
  function BookList({ books }) {
    return (
      <div className="flex justify-between space-x-4">
        {books.map((book, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={`/dashboard/home?query=${book.book_id}`}>
              <img
                src={`https://images.weserv.nl/?url=${book.cover_image_url}`}
                alt={book.title}
                className="h-40 w-32 rounded-md"
              />
            </Link>
            <Typography variant="h5" color="gray-500" className="mt-1 mb-2">
              <span
                className="max-w-xs overflow-hidden truncate whitespace-nowrap"
                title={book.title} // 鼠标悬浮时显示完整文本
              >
                {book.title.length > 5
                  ? book.title.substr(0, 5) + "..."
                  : book.title}
              </span>
            </Typography>
            <Typography
              variant="small"
              color="gray-500"
              className="mt-1 mb-2 font-[YourChosenFont]"
            >
              <span
                className="max-w-xs overflow-hidden truncate whitespace-nowrap"
                title={book.author} // 鼠标悬浮时显示完整文本
              >
                {book.author.length > 10
                  ? book.author.substr(0, 5) + "..."
                  : book.author}
              </span>
            </Typography>
          </div>
        ))}
      </div>
    );
  }
  function MyTab({ tab, onTabClick }) {
    return (
      <div className="flex">
        <div
          className={`cursor-pointer ${
            tab === "culture" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("culture")}
        >
          文化
        </div>
        <div className="mx-1"></div>
        <div
          className={`cursor-pointer ${
            tab === "literature" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("literature")}
        >
          文学
        </div>
        <div className="mx-1"></div>
        <div
          className={`cursor-pointer ${
            tab === "life" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("life")}
        >
          生活
        </div>
        <div className="mx-1"></div>
        <div
          className={`cursor-pointer ${
            tab === "popularity" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("popularity")}
        >
          流行
        </div>
        <div className="mx-1"></div>
        <div
          className={`cursor-pointer ${
            tab === "technology" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("technology")}
        >
          科技
        </div>
        <div className="mx-1"></div>
        <div
          className={`cursor-pointer ${
            tab === "management" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("management")}
        >
          经管
        </div>
      </div>
    );
  }

  const [selectedTab, setSelectedTab] = useState("culture"); // 初始选中的标签为文化
  const [recommendTab, setRecommendTab] = useState("culture"); // 初始选中的标签为文化

  return (
    <div>
      <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4 shadow-md">
        <div className="flex items-center">
          <Typography
            variant="h4"
            className="mb-2 font-bold text-blue-gray-300"
          >
            新书速递
          </Typography>
          <div className="mx-1">
            {/* 中间的空格 */}
            {/* 使用 mx-1 来添加水平间距 */}
          </div>
          <MyTab tab={selectedTab} onTabClick={setSelectedTab} />
        </div>
        <div className="my-3"></div>{" "}
        {/* 使用 my-12 类来添加垂直间距，也可以根据需要调整数字部分 */}
        {/* 根据选中的标签显示不同的内容 */}
        <CarouselDefault selectedTab={selectedTab} />
        {/* 添加其他标签对应的内容 */}
      </div>
      <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4 shadow-md">
        <div className="flex items-center">
          <Typography
            variant="h4"
            className="mb-2 font-bold text-blue-gray-300"
          >
            最受关注的图书榜
          </Typography>
          <div className="mx-1">
            {/* 中间的空格 */}
            {/* 使用 mx-1 来添加水平间距 */}
          </div>
          <MyTab tab={recommendTab} onTabClick={setRecommendTab} />
        </div>
        <div className="my-3"></div>{" "}
        {/* 使用 my-12 类来添加垂直间距，也可以根据需要调整数字部分 */}
        <BookList books={recommendedBooksData.slice(0, 6)} />
      </div>
      <div className="p-4 shadow-md">
        <Typography variant="h4" className="mb-2 font-bold text-blue-gray-300">
          猜你想看
        </Typography>
        <BookList books={recommendedBooksData.slice(0, 6)} />
      </div>
      <div className="my-12"></div>{" "}
      {/* 使用 my-12 类来添加垂直间距，也可以根据需要调整数字部分 */}
      <div>
        <Typography variant="h4" color="blue-gray" className="mb-3">
          热门评论
        </Typography>
        <ul className="flex flex-col gap-1">
          {bookCommentsData.map((props, index) => (
            <div className="max-h-50 w-full overflow-y-auto">
              <div key={props.comment_id} className="mb-4">
                <BookCommentsCard {...props} />
                {/* {index < bookCommentsData.length - 1 && (
                  <hr className="mt-4 border-t border-gray-300" />
                )} */}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserMainPage;
