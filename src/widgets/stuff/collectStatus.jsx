import React from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Typography,
    Radio,
} from "@material-tailwind/react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-full w-full scale-105"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

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
                        name="type"
                        ripple={false}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                            <Typography color="blue-gray" className="font-normal">
                                想看
                            </Typography>
                        }
                    />
                    <Radio
                        name="type"
                        defaultChecked
                        ripple={false}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                            <Typography color="blue-gray" className="font-normal">
                                在看
                            </Typography>
                        }
                    />
                                        <Radio
                        name="type"
                        defaultChecked
                        ripple={false}
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