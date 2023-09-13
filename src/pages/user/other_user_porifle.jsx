/**
 * 他人的个人主页
 */
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Spinner,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAction, getUserInfomation } from "@/utils/api";
import { useUser } from "@/context/UserContext";
import { useParams } from "react-router-dom";



// 书籍列表
function BookList({ books }) {
    if (books.length === 0) {
        return <div className="text-4xl text-gray-300">这里空空的...</div>;
    }

    const bookElements = books.map((book, index) => (
        <div key={index} className="flex flex-col items-center">
            <Link to={`/book/${book.book_id}`}>
                <img
                    src={`https://images.weserv.nl/?url=${book.image}`}
                    alt={book.title}
                    className="h-40 w-32 rounded-md"
                />
            </Link>
            <Typography variant="h5" color="gray-500" className="mt-1 mb-2">
                {book.title}
            </Typography>
        </div>
    ));

    // 计算需要添加的空白元素数量
    const emptyElementsCount = Math.max(0, 5 - books.length);

    // 生成空白元素
    const emptyElements = Array.from(
        { length: emptyElementsCount },
        (_, index) => <div key={`empty-${index}`} className="h-40 w-32" />
    );

    return (
        <div className="flex space-x-4">
            {bookElements}
            {emptyElements}
        </div>
    );
}

function getPageInfo(user_id,type, setFuction) {
    //type=1:想读，type=2：在读,type=3:读过
    getAction(1, 2, 0, user_id).then((resp) => {
        var code = resp.data["code"].toString();
        if (code === "0") {
            const contents = resp.data["content"];
            const collect_type = contents.map((content) => content.collect_type);
            const indices = [];
            collect_type.forEach((value, index) => {
                if (value === type) {
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
            setFuction(bookData);
        } else {
            console.log("fail!");
        }
    });
}

export function OtherUserProfile() {
    const { user_id } = useParams(); // 获取URL中的book_id参数

    const [willReadBookData, setWillReadBookData] = useState([]);
    const [readingBookData, setReadingBookData] = useState([]);
    const [haveReadBookData, setHaveReadBookData] = useState([]);

    useEffect(() => {
        // 在组件加载后执行的代码
        getPageInfo(user_id,1, setWillReadBookData);
        getPageInfo(user_id,2, setReadingBookData);
        getPageInfo(user_id,3, setHaveReadBookData);
    }, []);

    // 获取用户信息
    const { data, isLoading, isError } = getUserInfomation(user_id);
    // 处理加载状态
    if (isLoading) {
        return <Spinner className="h-16 w-16 text-gray-900/50" />;
    }
    // //处理错误状态
    if (isError) {
        console.log(isError);
        return <div>error</div>;
    }
    if (data) {
        if (data.code == -1) {
            return <div>还没有这个用户</div>;
        }

        const other_user = data.user;
        const avatar_url = import.meta.env.VITE_BASE_URL + '/' + other_user.avatar_path;

        const { user } = useUser(); // 使用useUser钩子来获取用户状态

        if (user_id == user.user_id) {
            console.log("!!");
            // 重定向到自己的个人主页
            window.location.href = "/user/profile";
        }





        return (
            <>
                <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://i0.hippopx.com/photos/20/175/808/mt-fuji-japan-view-from-kitadake-fuji-red-fuji-da2aeb7e36f10303b4853d564100e1d9.jpg)] bg-cover	bg-center">
                    <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
                </div>
                <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                    <CardBody className="p-4">
                        <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar src={avatar_url} alt="user.username" variant="square" className="h-20 w-20 rounded-lg shadow-lg shadow-blue-gray-500/40" />
                            <div className="ml-10">
                                <Typography
                                    variant="h3"
                                    color="blue-gray"
                                    className="mb-1"
                                >
                                    {other_user.username}
                                </Typography>
                                <Typography
                                    variant="paragraph"
                                    className="font-normal text-blue-gray-600"
                                >
                                    "{other_user.register_time}加入"
                                </Typography>
                            </div>
                        </div>
                    </div>
                        <div>
                        <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4">
                            <Typography variant="h4" className="mb-2 text-blue-gray-300">
                                想读
                            </Typography>
                            <BookList books={willReadBookData.slice(0, 5)} />
                        </div>

                        <div className="mb-4 border-b border-blue-gray-200 p-4 pb-4">
                            <Typography variant="h4" className="mb-2 text-blue-gray-300">
                                在读
                            </Typography>
                            <BookList books={readingBookData.slice(0, 5)} />
                        </div>

                        <div className="p-4">
                            <Typography variant="h4" className="mb-2 text-blue-gray-300">
                                已读
                            </Typography>
                            <BookList books={haveReadBookData.slice(0, 5)} />
                        </div>
                    </div>
                    </CardBody>
                </Card>
            </>
        );

    }


}

export default OtherUserProfile;
