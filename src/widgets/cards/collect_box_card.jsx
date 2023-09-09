import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Rating,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getCollect, getRating,addRating } from "@/utils/api";
import { CollectStatus,CollectSelect } from "@/widgets/stuff";

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

export function CollectBoxCard({
    user_id,
    book_id,
}) {
    const [rated, setRated] = useState(0);

    // 将 rated 的值映射到相应的评级文本
    const getRatingText = () => {
        switch (rated) {
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

    const handleRateChange = (value) => {
        console.log(value)
        setRated(value)
        let add_rating = value * 2;
        // 数据库中数据类型被定义为 db.DECIMAL(2, 1)，范围为-9.9 到 9.9，前端显示为0-5，所以需要乘以2
        if (value === 5) {
            add_rating = 9.9;
        }
        addRating(book_id,user_id,add_rating).then((response) => {
            console.log(response.data);
        });
    }

    // 获取收藏数据
    const { collectRecord, isLoading, isError } = getCollect(3, book_id, user_id);
    const { ratingRecord, isLoading1, isError1 } = getRating(3, book_id, user_id);

    const [collect_time, setCollect_time] = useState("");
    const [collect_type, setCollect_type] = useState(0);
    const [rating_time, setRating_time] = useState("");

    if (isError) {
        console.log(isError)
    }
    if(isError1){
        console.log(isError1)
    }
    useEffect(() => {
        if (collectRecord) {
            const length = collectRecord.content.length
            if (length > 0) {
                const collect = collectRecord.content[length - 1];
                setCollect_time(collect.collect_time);
                setCollect_type(collect.collect_type);
            }
        }

    }, [collectRecord]);

    useEffect(() => {
        if (ratingRecord) {
            const length = ratingRecord.content.length;
            if (length > 0) {
                const rating = ratingRecord.content[length - 1];
                setRated(mapRatingToInteger(rating.rating));
                setRating_time(rating.rating_time)
            }
        }
    }, [ratingRecord]);


    // 将collect_type的值映射到相应的收藏文本
    const getCollectText = () => {
        switch (collect_type) {
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

    return (
        <Card>
            <CardBody className="p-4 text-right">
                <Typography variant="h4" color="blue-gray" className="font-normal mb-2">
                    收藏盒
                </Typography>
                <hr />
                {
                    collect_type > 0 ? (
                        <>
                            < CollectStatus collect_type={collect_type} collect_time={collect_time} user_id={user_id} book_id={book_id}/>
                            {/* <Typography variant="h6" className="font-normal blue-gray mb-2">
                                {getCollectText()}
                            </Typography> */}
                        </>
                    ) : (
                        <CollectSelect user_id={user_id} book_id={book_id} collect_type={collect_type}/>
                    )
                }
                {
                    rating_time ? (
                        <>
                            <Typography variant="h6" className="font-normal blue-gray mt-5 text-left">
                                我的评分
                            </Typography>
                            <div className="flex items-center gap-2 mt-5">
                                <Rating value={rated} onChange={handleRateChange} />
                                <Typography color="blue-gray" className="font-medium">
                                    {getRatingText()}
                                </Typography>
                            </div>
                        </>

                    ) : (
                        <>
                            <div className="flex items-center gap-2 mt-5">
                                <Rating value={rated} onChange={handleRateChange} />
                                <Typography color="blue-gray" className="font-medium">
                                    {getRatingText()}
                                </Typography>
                            </div>
                        </>
                    )
                }

            </CardBody>

        </Card>
    );
}

// 属性验证
CollectBoxCard.propTypes = {
    user_id: PropTypes.number.isRequired,
    book_id: PropTypes.string.isRequired,
};

CollectBoxCard.displayName = "/src/widgets/cards/collect_box_card.jsx";
