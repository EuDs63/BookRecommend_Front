import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Rating,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export function CollectBoxCard({
    user_id,
    book_id,
}) {
    const [rated, setRated] = useState(4);

    // 将 rated 的值映射到相应的评级文本
    const getRatingText = () => {
        switch (rated) {
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
        <Card>
            <CardBody className="p-4 text-right">
                <Typography variant="h5" className="font-normal blue-gray mb-2">
                    收藏盒
                </Typography>
                <Tabs value="app" className="mt-5">
                    <TabsHeader>
                        <Tab value="app">
                            想看
                        </Tab>
                        <Tab value="message">
                            在看
                        </Tab>
                        <Tab value="settings">
                            看过
                        </Tab>
                    </TabsHeader>
                </Tabs>
                <div className="flex items-center gap-2 mt-5">
                    <Rating value={4} onChange={(value) => setRated(value)} />
                    <Typography color="blue-gray" className="font-medium">
                        {getRatingText()}
                    </Typography>
                </div>
            </CardBody>

        </Card>
    );
}

CollectBoxCard.defaultProps = {
    action: null,
};

CollectBoxCard.propTypes = {
    user_id: PropTypes.isRequired,
    book_id: PropTypes.isRequired,
    action: PropTypes.node,
};

CollectBoxCard.displayName = "/src/widgets/cards/collect_box_card.jsx";
