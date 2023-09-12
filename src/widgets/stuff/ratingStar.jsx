/**
 * 只读的评分组件
 */
import {
    Typography,
    Rating,
} from "@material-tailwind/react";

function mapRatingToInteger(rating) {
    // 将0到10范围内的评分映射到0到5的整数范围
    // 首先将评分缩放到0到5之间
    const scaledRating = (rating / 10) * 5;

    // 然后将其四舍五入为整数
    const integerRating = Math.round(scaledRating);

    // 确保结果在0到5之间
    if (integerRating < 0) {
        return 0;
    } else if (integerRating > 5) {
        return 5;
    } else {
        return integerRating;
    }
}

export function RatingStar({ rating }) {
    const rating_int = mapRatingToInteger(rating);

    // 将 rated 的值映射到相应的评级文本
    const getRatingText = () => {
        switch (rating_int) {
            case 0:
                return "未评分";
            case 1:
                return "很差";
            case 2:
                return "较差";
            case 3:
                return "还行";
            case 4:
                return "推荐";
            case 5:
                return "力荐";
            default:
                return "";
        }
    };

    return (
        <div className="flex items-center gap-2 ml-2">
            <Rating value={rating_int} readonly/>
            <Typography color="blue-gray" className="font-medium">
                {getRatingText()}
            </Typography>
        </div>
    );
}

RatingStar.defaultName = "@/widgets/stuff/ratingStar.jsx";

export default RatingStar;