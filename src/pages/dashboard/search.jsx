import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { useLocation } from "react-router-dom";
  import { bookInfo } from "@/utils/api";
  import { useEffect, useState } from "react";
  
  
  export function Search() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get("query");  
    const [bookInfoData, setBookInfoData] = useState("");
    useEffect(() => {
        // 在组件加载后执行的代码
        getBookInfo();
    }, [query]); 
    function getBookInfo()
    {
        bookInfo(query,0).then((resp) => 
        {
            var code = resp.data['code'].toString();
            if (code === '0') {
                console.log("success");
                const book = resp.data['book'];
                const bookauthor = book.author
                const bookname = book.title
                const bookimage = book.cover_image_url
                const bookrate = book.rating_avg
                const bookdes = book.description
                const book_info = {
                    bookauthor,
                    bookname,
                    bookimage,
                    bookrate,
                    bookdes,
                }
                console.log(book_info)
                setBookInfoData(book_info);
            }
            else{
                console.log("fail");
            }
        })
    }

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              搜索结果
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div>
              <img src={`https://images.weserv.nl/?url=${bookInfoData.bookimage}`} className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"/>
              <Typography>作者：{bookInfoData.bookauthor}</Typography>
              <Typography>书名：{bookInfoData.bookname}</Typography>
              <Typography>评分：{bookInfoData.bookrate}</Typography>
              <Typography>{bookInfoData.bookdes}</Typography>
            </div>
          </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default Search;
  