import { getAction } from "@/utils/api";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Reading() {
  const { userid } = useParams(); // 获取路由参数
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
    console.log(userid);
    getReadingPageInfo();
    setCurrentPage(1);
  }, [userid]);
  function getReadingPageInfo() {
    getAction(1, 2, 0, userid).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        console.log("success!");
        const contents = resp.data["content"];
        const collect_type = contents.map((content) => content.collect_type);
        const indices = [];
        collect_type.forEach((value, index) => {
          if (value === 2) {
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
        // setTotalPages(totalPages);
        // setTotalRecords(totalRecords);
      } else {
        console.log("fail!");
      }
    });
  }
  return (
    <div>
      <Typography
        variant="h6"
        color="black"
        style={{
          color: "black",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        我的在读榜单
      </Typography>
      <Card>
        {bookInfoData.map((book, index) => (
          <CardBody
            key={index}
            style={{ overflow: "hidden", height: "235px", display: "flex" }}
          >
            <div>
              <img
                src={`https://images.weserv.nl/?url=${book.image}`}
                className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
            </div>
            <div style={{ marginLeft: "20px", flex: 1 }}>
              <div>
                <Typography
                  style={{
                    color: "black",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
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
export default Reading;
