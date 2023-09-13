import React from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAction,
  getcategorybookInfo,
  getRecommendByUserId,
} from "@/utils/api";
import { useUser } from "@/context/UserContext";
const recommendBooks = [];
export function UserMainPage() {
  const { user } = useUser();
  const userid = user.user_id;
  //console.log(userid);
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
  const [itemRecommendData, setItemRecommendData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("culture");
  const [recommendTab, setRecommendTab] = useState("culture");
  const [userComments, setUserComments] = useState([]);
  const { data, isLoading, isError } = getRecommendByUserId(userid);
  useEffect(() => {
    // Define a helper function to fetch category book info and update state
    const fetchCategoryBookInfo = (categoryId, setStateCallback, type) => {
      getCategoryBookInfo(
        categoryId,
        (data) => {
          setStateCallback(data);
        },
        type
      );
    };

    // Fetch category book info for various categories
    fetchCategoryBookInfo(1, setnewLiteratureData, 1);
    fetchCategoryBookInfo(2, setnewPopularityData, 1);
    fetchCategoryBookInfo(3, setnewCultureData, 1);
    fetchCategoryBookInfo(4, setnewLifeData, 1);
    fetchCategoryBookInfo(5, setnewManagementData, 1);
    fetchCategoryBookInfo(6, setnewTechnologyData, 1);
    fetchCategoryBookInfo(1, setConcernLiteratureData, 2);
    fetchCategoryBookInfo(2, setConcernPopularityData, 2);
    fetchCategoryBookInfo(3, setConcernCultureData, 2);
    fetchCategoryBookInfo(4, setConcernLifeData, 2);
    fetchCategoryBookInfo(5, setConcernManagementData, 2);
    fetchCategoryBookInfo(6, setConcernTechnologyData, 2);

    // Fetch user comments
    getCommentInfo(userid);
  }, [userid]);

  useEffect(() => {
    // Handle data fetching and processing here
    if (isLoading) {
      // Return loading indicator
    } else if (isError) {
      console.log(isError);
      // Return error message
    } else {
      // Process the data and update itemRecommendData
      recommendBooks.push(
        data.books.map((book) => {
          const author = book.author;
          const description = book.description;
          const book_id = book.book_id;
          const cover_image_url = book.cover_image_url;
          const rating_avg = book.rating_avg;
          const title = book.title;
          return {
            author,
            description,
            book_id,
            cover_image_url,
            rating_avg,
            title,
          };
        })
      );
      setItemRecommendData(recommendBooks);
    }
  }, [data, isLoading, isError]);


  function getCategoryBookInfo(range, setDataFunction, type) {
    //type=1:新书；type=2:最受关注图书
    getcategorybookInfo(range, 1, 30, type).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        setDataFunction(resp.data["books"]);
      } else {
        console.log("fail!");
      }
    });
  }
  function getRecommendBookInfo(user_id) {
    getrecommend(user_id).then((resp)=>{
        var code = resp.data["code"].toString();
        if (code === "0") {
            console.log(resp.data["book_id"]);
          } else {
            console.log("fail!");
          }
    })
  }
  function getCommentInfo(user_id) {
    getAction(2, 2, 0, user_id).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        setUserComments(resp.data["content"]);
      } else {
        console.log("fail!");
      }
    });
  }
  function generateContent(selectedTab, type) {
    const tabs = [
      "culture",
      "literature",
      "life",
      "popularity",
      "technology",
      "management",
    ];

    let dataSets = [];

    if (type === 1) {
      dataSets = [
        { data: newCultureData, setter: setnewCultureData },
        { data: newLiteratureData, setter: setnewLiteratureData },
        { data: newLifeData, setter: setnewLifeData },
        { data: newPopularityData, setter: setnewPopularityData },
        { data: newTechnologyData, setter: setnewTechnologyData },
        { data: newManagementData, setter: setnewManagementData },
      ];
    } else if (type === 2) {
      dataSets = [
        { data: concernCultureData, setter: setConcernCultureData },
        { data: concernLiteratureData, setter: setConcernLiteratureData },
        { data: concernLifeData, setter: setConcernLifeData },
        { data: concernPopularityData, setter: setConcernPopularityData },
        { data: concernTechnologyData, setter: setConcernTechnologyData },
        { data: concernManagementData, setter: setConcernManagementData },
      ];
    }

    const index = tabs.indexOf(selectedTab);

    if (index !== -1) {
      const { data } = dataSets[index];
      return Array.from({ length: 5 }, (_, i) => (
        <div key={i}>
          <BookList books={data.slice(i * 5, (i + 1) * 5)} />
        </div>
      ));
    }

    return null;
  }

  function CarouselDefault({ selectedTab, type }) {
    const content = generateContent(selectedTab, type);
    return (
      <Carousel
        className="rounded-xl "
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i
                    ? "w-8 bg-blue-gray-300 text-white"
                    : "w-4 bg-blue-gray-100 text-blue-gray-700"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="bg-blue-gray-300"
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


  function BookList({ books }) {
    if (!books || books.length === 0) {
      return <Spinner className="h-16 w-16 text-gray-900/50" />;
    } else {
      return (
        <div className="flex justify-between space-x-4">
          {books.map((book, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link to={`/book/${book.book_id}`}>
                <img
                  src={`https://images.weserv.nl/?url=${book.cover_image_url}`}
                  alt={book.title}
                  className="h-40 w-32 rounded-md"
                />
              </Link>
              <Typography variant="h5" color="gray-500" className="mt-1 mb-2">
                <span
                  className="max-w-xs overflow-hidden truncate whitespace-nowrap"
                  title={book.title}
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
                  title={book.author}
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

  return (
    <div>

      <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4 shadow-md ml-4">
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
        <CarouselDefault selectedTab={selectedTab} type={1} />
        {/* 添加其他标签对应的内容 */}

      </div>

      <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4 shadow-md ml-4">
        <div className="flex items-center">
          <Typography
            variant="h4"
            className="mb-2 font-bold text-blue-gray-300"
          >
            最受关注图书榜
          </Typography>
          <div className="mx-1">
            {/* 中间的空格 */}
            {/* 使用 mx-1 来添加水平间距 */}
          </div>
          <MyTab tab={recommendTab} onTabClick={setRecommendTab} />
        </div>
        <div className="my-3"></div>{" "}
        {/* 使用 my-12 类来添加垂直间距，也可以根据需要调整数字部分 */}
        {/* 根据选中的标签显示不同的内容 */}
        <CarouselDefault selectedTab={recommendTab} type={2} />
        {/* 添加其他标签对应的内容 */}
      </div>

      <div className="p-4 shadow-md ml-4">
        <Typography variant="h4" className="mb-2 font-bold text-blue-gray-300 ">
          猜你想看
        </Typography>
        <BookList books={recommendBooks[0]}/>
      </div>
      <div className="my-12"></div>{" "}
    </div>
  );
}

export default UserMainPage;
