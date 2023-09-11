import { getAction } from "@/utils/api";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useUser } from "@/context/UserContext";

export function HaveRead() {
  const { isLoggedIn, user, logout, change_avatar } = useUser(); // 使用useUser钩子来获取用户状态
  const userid = user.user_id;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  //   const query = queryParams.get("query");
  const [bookInfoData, setBookInfoData] = useState([]);
  const [bookCollectedTimeData, setBookCollectedTimeData] = useState([]);
  const currentPageParam = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    currentPageParam ? parseInt(currentPageParam) : 1
  );
  //   const [totalPages, setTotalPages] = useState("");
  //   const [totalRecords, setTotalRecords] = useState("");
  useEffect(() => {
    // 在组件加载后执行的代码
    getReadingPageInfo();
    setCurrentPage(1);
  }, [userid]);

  function getReadingPageInfo() {
    getAction(1, 2, 0, userid).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        const contents = resp.data["content"];
        const collect_type = contents.map((content) => content.collect_type);
        const indices = [];
        collect_type.forEach((value, index) => {
          if (value === 3) {
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
        setBookInfoData(bookData);
        setBookCollectedTimeData(collect_time);
      } else {
        console.log("fail!");
      }
    });
  }

  const intro = () => {
    if (bookInfoData.length > 30) {
      return "读书谓已多，抚事知不足";
    } else if (bookInfoData.length >= 10 && bookInfoData.length <= 30) {
      return "欲穷千里目，更上一层楼";
    } else {
      return "玉不琢不成器，人不学不知理";
    }
  }

  return (
    <div>
      <Typography
        variant="h6"
        color="black"
        className="text-black text-22 font-bold"
      >
        我曾读过
      </Typography>
      <div>
        <Typography className="text-black text-22 mb-5">
          {intro()}
        </Typography>
      </div>
      <Card>
        {bookInfoData.map((book, index) => (
          <CardBody
            key={index}
            className="overflow-hidden h-235 flex"
          >
            <div>
              <img
                src={`https://images.weserv.nl/?url=${book.image}`}
                className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
            </div>
            <div className="ml-20 flex-1">
              <div>
                <Typography
                  className="text-black text-22 font-bold"
                >
                  {book.name}
                </Typography>
                <Typography>{book.publisher}</Typography>
              </div>
              <div>
                <Typography style={{ color: "blue" }}>{book.author}</Typography>
              </div>
              <div
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                <Typography>{book.des}</Typography>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography>收藏于 {bookCollectedTimeData[index]}</Typography>
              </div>
            </div>
          </CardBody>
        ))}
      </Card>

    </div>
  );
}
export default HaveRead;
