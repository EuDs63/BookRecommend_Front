import { getAction } from "@/utils/api";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
export function WillReadPage({ willReadBookData }) {
  const { userid } = useParams(); // 获取路由参数
  const { willRead } = useLocation();
  const queryParams = new URLSearchParams(willRead);
  //   const query = queryParams.get("query");
  const [bookInfoData, setBookInfoData] = useState([]);
  const currentPageParam = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    currentPageParam ? parseInt(currentPageParam) : 1
  );
  //   const [totalPages, setTotalPages] = useState("");
  //   const [totalRecords, setTotalRecords] = useState("");
  useEffect(() => {
    // 在组件加载后执行的代码
    console.log(userid);
    getWillReadPageInfo();
    setCurrentPage(1);
  }, [userid]);
  function getWillReadPageInfo() {
    getAction(1, 2, 0, userid).then((resp) => {
      var code = resp.data["code"].toString();
      if (code === "0") {
        console.log("success!");
        console.log(resp.data);
        const contents = resp.data["content"];
        console.log(contents)
        const books = contents.map((content) => content["book"]);
        const collect_time = contents.map(
          (content) => content.collect_time
        );
        const collect_type = contents.map(
          (content) => content.collect_type
        );
        const bookData = [];
        if (Array.isArray(books)) {
          console.log("books 是一个数组");
        } else {
          console.log("books 不是一个数组");
        }
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
        console.log(bookData);
        console.log(collect_time);
        const collectText =
          collect_type === 1
            ? "想读"
            : collect_type === 2
            ? "在读"
            : collect_type === 3
            ? "读过"
            : "其他情况";
        console.log(collectText);
        setBookInfoData(bookData);
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
        我的想读榜单
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
                <Typography>
                  年:{book.date}&nbsp;&nbsp;&nbsp;&nbsp;评分:{book.rate}/10.00
                </Typography>
              </div>
            </div>
          </CardBody>
        ))}

        {/* <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div class="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing&nbsp;
                <span class="font-medium">{10 * (currentPage - 1) + 1}</span>
                &nbsp;to&nbsp;
                <span class="font-medium">
                  {10 * currentPage <= totalRecords
                    ? 10 * currentPage
                    : totalRecords}
                </span>
                &nbsp;of&nbsp;
                <span class="font-medium">{totalRecords}</span>
                &nbsp;results&nbsp;
              </p>
            </div>
            <div>
              <nav
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href={`search?query=${query}&page=${currentPage - 1}`}
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>

                {Array.from({ length: totalPages }, (_, index) => {
                  // 计算当前页码与当前循环的页码的距离
                  const distance = Math.abs(currentPage - (index + 1));
                  // 如果是第一页、第二页、倒数第一页、倒数第二页、或者在当前页前两个或后两个，则显示页码
                  if (
                    index === 0 ||
                    index === 1 ||
                    index === totalPages - 1 ||
                    index === totalPages - 2 ||
                    index === totalPages - 3 ||
                    distance <= 2
                  ) {
                    return (
                      <a
                        key={index}
                        href={`search?query=${query}&page=${index + 1}`} // 这里需要根据实际情况生成正确的链接
                        className={`relative inline-flex items-center ${
                          currentPage === index + 1
                            ? "bg-indigo-600 text-white"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </a>
                    );
                  }
                  // 显示省略号
                  if (distance === 3) {
                    return (
                      <span
                        key={index}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                      >
                        ...
                      </span>
                    );
                  }
                  // 隐藏其他页码
                  return null;
                })}
                <a
                  href={`search?query=${query}&page=${currentPage + 1}`}
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div> */}
      </Card>
    </div>
  );
}
export default WillReadPage;
