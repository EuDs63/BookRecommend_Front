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
        bookInfo(query,1).then((resp) => 
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
                const bookpublisher = book.publisher
                const bookdate = book.publish_date
                const book_info = {
                    bookauthor,
                    bookname,
                    bookimage,
                    bookrate,
                    bookdes,
                    bookpublisher,
                    bookdate,
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
      <div>
            <Typography variant="h6" color="black">
               搜索结果
            </Typography>
        <Card>

          <CardBody style={{ overflow: "hidden", height: "235px", display: "flex"}}>
                <div>
                    <img src={`https://images.weserv.nl/?url=${bookInfoData.bookimage}`} className="h-48 w-36 rounded-lg shadow-lg shadow-blue-gray-500/40"/>
                </div>
              <div style={{ marginLeft: "20px", flex: 1}}>
                <div>
                    <Typography style={{ color: "black", fontSize: "22px", fontWeight: "bold"}}>{bookInfoData.bookname}</Typography>
                </div>
                <div>
                    <Typography>{bookInfoData.bookpublisher}</Typography>
                </div>
                <div>
                    <Typography style={{ color: "blue"}}>{bookInfoData.bookauthor}</Typography>
                </div>
                <div style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden' }}>
                    <Typography>
                    {bookInfoData.bookdes}
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: "0px"}}> 
                    <Typography>年:{bookInfoData.bookdate}&nbsp;&nbsp;&nbsp;&nbsp;评分:{bookInfoData.bookrate}/10.00</Typography>
                </div>
            </div>
          </CardBody>
          <hr style={{ borderTop: "1px solid #ccc" }} /> {/* 分割横线 */}

        </Card>
      </div>
    );
  }
  
  export default Search;
  