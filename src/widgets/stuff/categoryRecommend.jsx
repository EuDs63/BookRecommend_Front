/**
 * 同类别推荐
 */
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tooltip,
    Button,
    Spinner,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  import { Comment } from "@/widgets/stuff";
  //import { recommendedBooksData } from "@/data";
  import { getRecommendByBookId } from "@/utils/api";

export function CategoryRecommend({book_id}) {
    const { data, isLoading } = getRecommendByBookId(book_id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center mt-12">
                <Spinner color="blue" size="large" />
            </div>
        );
    }
    if (data){
        const recommendedBooksData = data.slice(0, 4);


    return (
        <div className="px-4 pb-4 mt-12">
            <Typography variant="h4" color="blue-gray" className="mb-2">
                同类别推荐
            </Typography>
            <hr className="border-t border-gray-300" />
            <div className="mt-6 grid grid-cols-2 gap-12 lg:grid-cols-3 xl:grid-cols-4">
                {recommendedBooksData.map(
                    ({
                        author,
                        book_id,
                        cover_image_url,
                        title,
                        description,
                        rating_avg,
                        members,
                    }) => (
                        <Card key={book_id} color="transparent" shadow={false}>
                            <CardHeader
                                floated={false}
                                color="gray"
                                className="relative mx-0 mt-0 mb-4 h-48 w-36 overflow-hidden"
                            >
                                <img
                                    src={`https://images.weserv.nl/?url=${cover_image_url}`}
                                    alt={title}
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody className="py-0 px-1">
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-500"
                                >
                                    {rating_avg}分 {author}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="blue-gray"
                                    className="mt-1 mb-2"
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="text-blue-gray-500overflow-hidden font-normal "
                                    style={{ textOverflow: "ellipsis" }}
                                >
                                    {description.length > 50
                                        ? description.substring(0, 50) + "..."
                                        : description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                                <div className="flex items-center justify-between">
                                    <Link to={`/book/${book_id}`}>
                                        <Button variant="outlined" size="sm">
                                            查看详情
                                        </Button>
                                    </Link>
                                    <div>
                                        {members.map(({ img, name }, key) => (
                                            <Tooltip key={name} content={name}>
                                                <Avatar
                                                    src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                                                    alt={name}
                                                    size="xs"
                                                    variant="circular"
                                                    className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                                        }`}
                                                />
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                )}
            </div>
        </div>
    );}

}

export default CategoryRecommend;