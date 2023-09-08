import { useParams } from "react-router-dom";
import { getBookInfomation } from "@/utils/api";

export function BookTest() {
    const { book_id } = useParams();
    const { data,isLoading,isError } = getBookInfomation(book_id,1);
    console.log(data);
}

export default BookTest;

