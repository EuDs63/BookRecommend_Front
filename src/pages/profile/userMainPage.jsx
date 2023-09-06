import React from "react";
import { Typography } from "@material-tailwind/react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
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
    getCategoryBookInfo(1, setnewCultureData);
    getCategoryBookInfo(2, setnewLiteratureData);
    getCategoryBookInfo(3, setnewPopularScienceData);
    getCategoryBookInfo(4, setnewPopularityData);
    getCategoryBookInfo(5, setnewTechnologyData);
    getCategoryBookInfo(6, setnewManagementData);
    // 继续添加其他范围和对应的数据更新函数
  }, []);
  function getCategoryBookInfo(range, setDataFunction) {
    getcategorybookInfo(1, range, 30, 1).then((resp) => {
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
      "popular science",
      "popularity",
      "technology",
      "management",
    ];
    const dataSets = [
      { data: newCultureData, setter: setnewCultureData },
      { data: newLiteratureData, setter: setnewLiteratureData },
      { data: newPopularScienceData, setter: setnewPopularScienceData },
      { data: newPopularityData, setter: setnewPopularityData },
      { data: newTechnologyData, setter: setnewTechnologyData },
      { data: newManagementData, setter: setnewManagementData },
    ];
    const index = tabs.indexOf(selectedTab);
    if (index !== -1) {
      const { data, setter } = dataSets[index];
      return (
        <div>
          {Array.from({ length: 5 }, (_, i) => (
            <BookList key={i} books={data.slice(i * 6, (i + 1) * 6)} />
          ))}
        </div>
      );
    }
    return null;
  }

    function CarouselDefault({ selectedTab }) {
    const content = generateContent(selectedTab);
    return <Carousel className="rounded-xl">{content}</Carousel>;
  }

  const [newCultureData, setnewCultureData] = useState([]);
  const [newLiteratureData, setnewLiteratureData] = useState([]);
  const [newPopularScienceData, setnewPopularScienceData] = useState([]);
  const [newPopularityData, setnewPopularityData] = useState([]);
  const [newTechnologyData, setnewTechnologyData] = useState([]);
  const [newManagementData, setnewManagementData] = useState([]);
  const [concernCultureData, setConcernCultureData] = useState([]);
  const [concernLiteratureData, setConcernLiteratureData] = useState([]);
  const [concernPopularScienceData, setConcernPopularScienceData] = useState(
    []
  );
  const [concernPopularityData, setConcernPopularityData] = useState([]);
  const [concernTechnologyData, setConcernTechnologyData] = useState([]);
  const [concernManagementData, setConcernManagementData] = useState([]);
  function BookList({ books }) {
    return (
      <div className="flex justify-between space-x-4">
        {" "}
        {/* 添加 justify-between 类 */}
        {books.map((book, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={`/dashboard/home?query=${book.id}`}>
              <img
                src={`https://images.weserv.nl/?url=${book.cover_image}`}
                alt={book.title}
                className="h-40 w-32 rounded-md"
              />
            </Link>
            <Typography variant="h5" color="gray-500" className="mt-1 mb-2">
              {book.title}
            </Typography>
            <Typography
              variant="small"
              color="gray-500"
              className="mt-1 mb-2 font-[YourChosenFont]"
            >
              {book.author}
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
            tab === "popular science" ? "font-bold text-black" : "text-gray-500"
          }`}
          onClick={() => onTabClick("popular science")}
        >
          科普
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
