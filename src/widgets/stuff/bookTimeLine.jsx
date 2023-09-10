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
import { useState, useEffect } from "react";
import { getCollectByBookId } from "@/utils/api";

const PAGE_SIZE = 5;

export function BookTimeline() {
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = getCollectByBookId(1);
    if (data) {
        console.log(data);
    }

    const issues = data ? [].concat(...data) : [];

    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    useEffect(() => {
        setSize(1);
    }, []);

    console.log(issues)
    return (
        // <Card className="w-[25rem]">
        //     <CardBody>
        //         <Typography variant="h5" color="blue-gray" className="mb-2">
        //             谁看这本书
        //         </Typography>
        //         <div className="w-auto">
        //             <Timeline>
        //                 <TimelineItem className="h-28">
        //                     <TimelineConnector className="!w-[78px]" />
        //                     <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 border-none">
        //                         <TimelineIcon className="p-0" variant="ghost">
        //                             <Avatar size="sm" src="/img/team-1.jpeg" alt="user 1" />
        //                         </TimelineIcon>
        //                         <div className="flex flex-col gap-1">
        //                             <Typography variant="h6" color="blue-gray">
        //                                 Eric 在看
        //                             </Typography>
        //                             <Typography variant="small" color="gray" className="font-normal">
        //                                 22 DEC 7:20 PM
        //                             </Typography>
        //                         </div>
        //                     </TimelineHeader>
        //                 </TimelineItem>
        //             </Timeline>
        //         </div>
        //     </CardBody>
        // </Card>
        <div>
            <p>
                showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
                issue(s){" "}
                <button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                >
                    {isLoadingMore
                        ? "loading..."
                        : isReachingEnd
                            ? "no more issues"
                            : "load more"}
                </button>
                <button disabled={!size} onClick={() => setSize(0)}>
                    clear
                </button>
            </p>
            {isEmpty ? <p>Yay, no issues found.</p> : null}
            {issues.map((issue) => {
                return (
                    <p key={issue.collect_time} style={{ margin: "6px 0" }}>
                        - {issue.username} : {issue.collect_time}
                    </p>
                );
            })}
        </div>
    );
}

BookTimeline.displayName = "@/widgets/stuff/bookTimeLine.jsx";

export default BookTimeline;