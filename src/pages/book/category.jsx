import {
    Card,
    Typography,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { gettagbookInfo} from "@/utils/api";

export function Category() {
    const [recordsArray, setRecordsArray] = useState([]);

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
          const code = resp.data['code'].toString();
          if (code === '0') {
            const records = resp.data['total_records'];
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
          <div style={{ width: '20%', padding: '8px' }}>
            <Link to={`/book/tagsearch?tag_id=${tagId}&page=1`} style={{ textDecoration: 'none' }}>
                <span style={{ color: '#0074e4' }}>{label}</span>
                ({recordsArray[tagId - 1]})
            </Link>
          </div>
        );
      }      

    return(
        <div>
            <Card>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "10px",
            }}>
                文学
            </Typography>
            <Typography style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <LinkContainer tagId={14} label="中国文学" />
                <LinkContainer tagId={15} label="余华" />
                <LinkContainer tagId={16} label="儿童文学" />
                <LinkContainer tagId={17} label="古典文学" />
                <LinkContainer tagId={18} label="名著" />
                <LinkContainer tagId={19} label="外国名著" />
                <LinkContainer tagId={20} label="外国文学" />
                <LinkContainer tagId={21} label="小说" />
                <LinkContainer tagId={22} label="张爱玲" />
                <LinkContainer tagId={23} label="当代文学" />
                <LinkContainer tagId={24} label="散文" />
                <LinkContainer tagId={25} label="杂文" />
                <LinkContainer tagId={26} label="村上春树" />
                <LinkContainer tagId={27} label="杜拉斯" />
                <LinkContainer tagId={28} label="港台" />
                <LinkContainer tagId={29} label="童话" />
                <LinkContainer tagId={30} label="米兰·昆德拉" />
                <LinkContainer tagId={31} label="茨威格" />
                <LinkContainer tagId={32} label="诗歌" />
                <LinkContainer tagId={33} label="诗词" />
                <LinkContainer tagId={34} label="钱钟书" />
                <LinkContainer tagId={35} label="随笔" />
                <LinkContainer tagId={36} label="鲁迅" />
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "10px",
            }}>
                流行
            </Typography>
            <Typography style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <LinkContainer tagId={37} label="奇幻" />
                <LinkContainer tagId={38} label="悬疑" />
                <LinkContainer tagId={39} label="推理" />
                <LinkContainer tagId={40} label="武侠" />
                <LinkContainer tagId={41} label="科幻" />
                <LinkContainer tagId={42} label="绘本" />
                <LinkContainer tagId={43} label="青春" />
                <LinkContainer tagId={44} label="魔幻" />
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "10px",
            }}>
                文化
            </Typography>
            <Typography style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <LinkContainer tagId={1} label="人物传记" />
                <LinkContainer tagId={2} label="传记" />
                <LinkContainer tagId={3} label="军事" />
                <LinkContainer tagId={4} label="历史" />
                <LinkContainer tagId={5} label="哲学" />
                <LinkContainer tagId={6} label="建筑" />
                <LinkContainer tagId={7} label="心理学" />
                <LinkContainer tagId={8} label="戏剧" />
                <LinkContainer tagId={9} label="政治学" />
                <LinkContainer tagId={10} label="社会" />
                <LinkContainer tagId={11} label="绘画" />
                <LinkContainer tagId={12} label="艺术" />
                <LinkContainer tagId={13} label="设计" />
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "10px",
            }}>
                生活
            </Typography>
            <Typography style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <LinkContainer tagId={45} label="健康" />
                <LinkContainer tagId={46} label="励志" />
                <LinkContainer tagId={47} label="心理" />
                <LinkContainer tagId={48} label="成长" />
                <LinkContainer tagId={49} label="教育" />
                <LinkContainer tagId={50} label="游记" />
                <LinkContainer tagId={51} label="爱情" />
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "10px",
            }}>
                经管
            </Typography>
            <Typography style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <LinkContainer tagId={56} label="商业" />
                <LinkContainer tagId={57} label="管理" />
                <LinkContainer tagId={58} label="经济学" />
                <LinkContainer tagId={59} label="金融" />
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "10px",
            }}>
                科技
            </Typography>
            <Typography style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <LinkContainer tagId={52} label="科普" />
                <LinkContainer tagId={53} label="程序" />
                <LinkContainer tagId={54} label="编程" />
                <LinkContainer tagId={55} label="通信" />
            </Typography>

            </Card>
        </div>
    )
}
export default Category;