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
      <div className="mt-0  mb-8 flex flex-col gap-2" style={{ marginLeft: "35px" }}>
            <Typography variant="h6" color="black">
               搜索结果
            </Typography>
        <Card style={{ overflow: "hidden", marginRight: "35px"}}>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 grid grid-cols-2 gap-4" style={{ overflow: "hidden", height: "210px", }}>
            <div style={{ overflow: "hidden"}}>
              <img src={`https://images.weserv.nl/?url=${bookInfoData.bookimage}`} className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40" style={{ marginLeft: "10px", marginTop: "8px" }}/>
            </div>
            <div style={{ marginTop: "10px"}}>
              <Typography>书名：{bookInfoData.bookname}</Typography>
              <Typography>作者：{bookInfoData.bookauthor}</Typography>
              <Typography>评分：{bookInfoData.bookrate}</Typography>
              <Typography>{bookInfoData.bookdes}{bookInfoData.bookdes}</Typography> 
            </div>
          </CardBody>

          <hr style={{ borderTop: "1px solid #ccc" }} /> {/* 分割横线 */}

<CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
  <div className="flex items-center">
    <div>
      <img src={`https://images.weserv.nl/?url=${bookInfoData.bookimage}`} className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40" style={{ flexShrink: 0, width: 200, marginLeft: "10px", marginTop: "8px"}}/>
    </div>
    <div className="ml-4"> {/* 使用ml-4来添加左边距 */}
      <Typography>书名：{bookInfoData.bookname}</Typography>
      <Typography>作者：{bookInfoData.bookauthor}</Typography>
      <Typography>评分：{bookInfoData.bookrate}</Typography>
      <Typography>{bookInfoData.bookdes}</Typography>
    </div>
  </div>
</CardBody>


        </Card>
      </div>
    );
  }
  
  export default Search;
  