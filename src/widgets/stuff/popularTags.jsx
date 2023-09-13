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
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCollectByBookId } from "@/utils/api";
import { Link, useParams } from "react-router-dom";
import { gettagbookInfo } from "@/utils/api";
import { Category } from "@/pages/dashboard";

export function PopularTags({ book_id }) {
  const [recordsArray, setRecordsArray] = useState([]);
//   const [recordsNumber, setRecordsNumber] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    const tagIds = Array.from({ length: 59 }, (_, i) => i + 1);
    const recordsPromises = tagIds.map((tag_id) => getRecords(tag_id));

    try {
      const recordsData = await Promise.all(recordsPromises);
      setRecordsArray(recordsData.filter((data) => data !== null));
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  async function getRecords(tag_id) {
    try {
      const resp = await gettagbookInfo(tag_id, 1, 10);
      const code = resp.data["code"].toString();
      if (code === "0") {
        const records = resp.data["total_records"];
        return records;
      } else {
        console.log("fail!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching records for tag_id:", tag_id, error);
      return null;
    }
  }

  function LinkContainer({ tagId, label }) {
    return (
      <div style={{ width: "20%", padding: "8px" }}>
        <Link
          to={`/book/tagsearch?tag_id=${tagId}&page=1`}
          style={{ textDecoration: "none" }}
        >
          <span style={{ color: "#0074e4" }}>{label}</span>(
          {recordsArray[tagId - 1]})
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Card className="mt-0 ml-5 w-auto ">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            热门标签
          </Typography>
          <div>
            <Typography
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <LinkContainer tagId={15} label="余华" />
              <LinkContainer tagId={27} label="杜拉斯" />
              <LinkContainer tagId={30} label="米兰·昆德拉" />
              <LinkContainer tagId={32} label="诗歌" />
              <LinkContainer tagId={37} label="奇幻" />
              <LinkContainer tagId={38} label="悬疑" />
              <LinkContainer tagId={40} label="武侠" />
              <LinkContainer tagId={43} label="青春" />
              <LinkContainer tagId={11} label="绘画" />
              <LinkContainer tagId={12} label="艺术" />
              <LinkContainer tagId={45} label="健康" />
              <LinkContainer tagId={49} label="教育" />
              <LinkContainer tagId={50} label="游记" />
              <LinkContainer tagId={58} label="经济学" />
              <LinkContainer tagId={52} label="科普" />
            </Typography>

            <Typography
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            ></Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

PopularTags.displayName = "@/widgets/stuff/popularTags.jsx";

export default PopularTags;
