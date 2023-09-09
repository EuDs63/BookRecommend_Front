import React from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Typography,
    Radio,
} from "@material-tailwind/react";
import { CollectSelect } from "@/widgets/stuff";

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
                <Button className="w-full mt-5 border-solid text-base" color="blue-gray" ripple="false">{getCollectText(collect_type)}</Button>
            </PopoverHandler>
            <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 flex items-center gap-2 font-medium"
                >
                    最近记录： {collect_time}
                </Typography>
                <CollectSelect user_id={user_id} book_id={book_id} collect_type={collect_type} />
            </PopoverContent>
        </Popover>
    );
}

CollectStatus.displayName = "/src/widgets/stuff/collectStatus.jsx";

export default CollectStatus;