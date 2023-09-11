import 
{
    Button,
    Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function SearchBar() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchClick = () => {
        navigate(`/book/search?query=${searchText}`);
    };

    return (
        <>
            <div className="mr-auto md:mr-0 md:w-56">
                <Input
                    label="书名、作者"
                    onChange={handleInputChange}
                    value={searchText}
                />
            </div>
            <Button
                variant="filled"
                color="blue-gray"
                className="ml-2 hidden md:flex"
                onClick={handleSearchClick}
            >
                搜索
            </Button>
        </>
    );

}

export default SearchBar;