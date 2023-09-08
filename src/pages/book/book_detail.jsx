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
import { Link, useParams, useLocation } from "react-router-dom";
import { ProfileInfoCard, BookCommentsCard } from "@/widgets/cards";
import { recommendedBooksData, bookCommentsData } from "@/data";
import { commentInfo, getBookInfomation } from "@/utils/api";
import React, { useState, useEffect } from "react";


//点击一个“详情”页面将给出Info_type=1,bookId=X;
//经过推荐系统将返回四个bookId,Info_type=0;
//需要在userEffect函数里fetch评论
//useEffect函数需要四个操作:1. fetch一个详细信息 2. 推荐算法 3. fetch四个推荐信息 4. fectch评论

export function BookDetail() {
  //const [bookDetailsData, setBookDetailsData] = useState([]);

  const { book_id } = useParams();
  const { data, isLoading, isError } = getBookInfomation(book_id, 1);
  console.log(data.book);


  function getDetailBookInfo() {
    if (data) {
      const book = data.book;
      setBookDetailsData(book);
    }
  }
  return (
    <div>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>

    </div>
  );
}

export default BookDetail;
