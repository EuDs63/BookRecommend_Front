import React from "react";
import {
    Typography,
    Radio,
} from "@material-tailwind/react";
import { useState } from "react";
import { addCollect } from "@/utils/api";

export function CollectSelect({ user_id, book_id, collect_type }) {
    const [selectedValue, setSelectedValue] = useState(collect_type);

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        addCollect(book_id, user_id, value);
    };

    return (
        <div className="flex gap-10">
            <Radio
                value={1}
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
                value={3}
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
    );
}
CollectSelect.displayName = "/src/widgets/stuff/collectSelect.jsx";

export default CollectSelect;