import {
    Collapse,
    Button,
    Input,
    Card,
    CardBody,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function SearchBar() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const handleInputChange = (e) => {
        setOpen(true);
        setSearchText(e.target.value);
    };

    const handleSearchClick = () => {
        navigate(`/book/search?query=${searchText}`);
    };

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <div className="mr-auto md:mr-0 md:w-56 flex-col">

                <Menu className="flex-grow">
                    <MenuHandler>
                        <Input
                            label="书名、作者"
                            onChange={handleInputChange}
                            value={searchText}
                        />
                    </MenuHandler>
                    <MenuList className="max-h-36">
                        <MenuItem>Menu Item 1</MenuItem>
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