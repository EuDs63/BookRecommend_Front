/**
 * 书籍详情页的侧边栏：谁看这本书
 */
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
    Card,
    CardBody,
    Avatar,
} from "@material-tailwind/react";
import {
    BellIcon,
    ArchiveBoxIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export function BookTimeline() {
    return (
        <Card className="w-[25rem]">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    谁看这本书
                </Typography>
                <div className="w-auto">
                    <Timeline>
                        <TimelineItem className="h-28">
                            <TimelineConnector className="!w-[78px]" />
                            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 border-none">
                                <TimelineIcon className="p-0" variant="ghost">
                                    <Avatar size="sm" src="/img/team-1.jpeg" alt="user 1"  />
                                </TimelineIcon>
                                <div className="flex flex-col gap-1">
                                    <Typography variant="h6" color="blue-gray">
                                        Eric 在看
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        22 DEC 7:20 PM
                                    </Typography>
                                </div>
                            </TimelineHeader>
                        </TimelineItem>
                        <TimelineItem className="h-28">
                            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                                <TimelineIcon className="p-3" variant="ghost" color="green">
                                    <CurrencyDollarIcon className="h-5 w-5" />
                                </TimelineIcon>
                                <div className="flex flex-col gap-1">
                                    <Typography variant="h6" color="blue-gray">
                                        Payment completed for order #4395133
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        20 DEC 2:20 AM
                                    </Typography>
                                </div>
                            </TimelineHeader>
                        </TimelineItem>
                    </Timeline>
                </div>
            </CardBody>
        </Card>
    );
}

BookTimeline.displayName = "@/widgets/stuff/bookTimeLine.jsx";

export default BookTimeline;