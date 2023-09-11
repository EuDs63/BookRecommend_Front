import {
    Button,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { connect } from 'react-redux';
// import { addToSearchHistory, clearSearchHistory } from '@/Redux/actions';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchHistory } from "@/context/SearchHistoryContext"


export function SearchBar() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const { searchHistory, addToHistory, clearHistory } = useSearchHistory(); // 使用自定义 Hook

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchClick = () => {
        addToHistory(searchText);
        navigate(`/book/search?query=${searchText}`);
    };

    
    function handleClick() {
        addToHistory(searchText);
        navigate(`/book/search?query=${searchText}`);
    }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         //event.preventDefault(); // 阻止默认的 Enter 键行为
    //         handleClick(); // 调用搜索点击处理函数
    //     }
    // };

    return (
        <>
            <div className="mr-auto md:mr-0 md:w-56 flex-col">

                <Menu className="flex-grow">
                    <MenuHandler>
                        <Input
                            label="书名、作者"
                            onChange={handleInputChange}
                            value={searchText}
                        // onKeyDown={handleKeyDown}
                        />
                    </MenuHandler>
                    <MenuList className="max-h-36">
                        {searchHistory.map((item, index) => (
                            <MenuItem key={index} onClick={() => { setSearchText(item) }}>{item}</MenuItem>
                        ))}
                        {
                            searchHistory.length == 0 ? (<MenuItem>暂无搜索历史</MenuItem>) : 
                            (<MenuItem onClick={clearHistory} className=" text-red-500">清空搜索历史</MenuItem>)
                        }

                    </MenuList>
                </Menu>
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