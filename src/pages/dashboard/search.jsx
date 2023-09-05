import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { useLocation } from "react-router-dom";
  import { getcategorybookInfo } from "@/utils/api";
  import { useEffect, useState } from "react";
  
  
  export function Search() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get("query");  
    const [bookInfoData, setBookInfoData] = useState([]);
    const [currentPage, setCurrentPage] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [totalRecords, setTotalRecords] = useState("");
    useEffect(() => {
        // 在组件加载后执行的代码
        getCategoryBookInfo();
    }, [query]); 
   
    function getCategoryBookInfo()
    {
        getcategorybookInfo(1,1,10).then((resp)=>
            {
                var code = resp.data['code'].toString();
                if (code === '0') {
                    console.log("success!");
                    const books = resp.data['books'];
                    const totalPages = resp.data['total_pages'];
                    const totalRecords = resp.data['total_records']
                    const bookData = [];
                    books.forEach(book => {
                        const author = book.author
                        const book_id = book.book_id
                        const image = book.cover_image_url
                        const des = book.description
                        const rate = book.rating_avg
                        const name = book.title
                        const bookObj = {
                            author,
                            book_id,
                            image,
                            des,
                            rate,
                            name,
                        }
                        bookData.push(bookObj)
                    });
                    console.log(bookData)
                    console.log(totalPages)
                    console.log(totalRecords)
                    setBookInfoData(bookData)
                    setTotalPages(totalPages)
                    setTotalRecords(totalRecords)
                }
                else{
                    console.log("fail!");
                }
            }
        )
    }
    return (
      <div>
        <Typography variant="h6" color="black">
            搜索结果
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
        </Card>
      </div>
    );
  }
  
  export default Search;
  