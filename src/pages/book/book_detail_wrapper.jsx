import { useParams } from "react-router-dom";
import { BookDetail } from "@/pages/book";
import { BookTimeline } from "@/widgets/stuff";


// 导出包裹后的组件
export function BookDetailWrapper() {
    const { book_id } = useParams(); // 获取URL中的book_id参数

    return (
        <>
            <div className="w-2/3">
                <BookDetail book_id={book_id}/>
            </div>
            <div className="w-1/3">
                <BookTimeline book_id={book_id}/>
            </div>
        </>
    );
}

BookDetailWrapper.defaultName = "@/pages/book/book_detail_wrapper.jsx";

export default BookDetailWrapper;


