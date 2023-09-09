import React from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Typography,
    Radio,
} from "@material-tailwind/react";
import { useState } from "react";
import { addCollect } from "@/utils/api";
// 将collect_type的值映射到相应的收藏文本
const getCollectText = (type) => {
    switch (type) {
        case 1:
            return "我想看这本书 ";
        case 2:
            return "我在看这本书 ";
        case 3:
            return "我看过这本书";
        default:
            return "";
    }
};

export function CollectStatus({ user_id, book_id, collect_time, collect_type }) {
    const [selectedValue, setSelectedValue] = useState(collect_type);

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        addCollect(book_id, user_id, value);
      };

    const [openPopover, setOpenPopover] = React.useState(false);

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    return (
        <Popover open={openPopover} handler={setOpenPopover}>
            <PopoverHandler {...triggers}>
                <Button variant="text">{getCollectText(collect_type)}</Button>
            </PopoverHandler>
            <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 flex items-center gap-2 font-medium"
                >
                    最近记录： {collect_time}
                </Typography>
                <div className="flex gap-10">
                    <Radio
                        value= {1}
                        checked={selectedValue === 1}
                        onChange={handleRadioChange}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                            <Typography color="blue-gray" className="font-normal">
                                想看
                            </Typography>
                        }
                    />
                    <Radio
                        value={2}
                        checked={selectedValue === 2}
                        onChange={handleRadioChange}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                            <Typography color="blue-gray" className="font-normal">
                                在看
                            </Typography>
                        }
                    />
                    <Radio
                        value= {3}
                        checked={selectedValue === 3}
                        onChange={handleRadioChange}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                            <Typography color="blue-gray" className="font-normal">
                                看过
                            </Typography>
                        }
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}

CollectStatus.displayName = "/src/widgets/stuff/collectStatus.jsx";

export default CollectStatus;