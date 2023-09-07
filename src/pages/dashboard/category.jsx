import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    alert,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

      const linkStyle = {
        textDecoration: 'none',
        color: '#0074e4',
        marginRight: '10px', // 控制链接之间的间距
      };
    
      const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
      };
    
      const columnStyle = {
        flex: '1', // 平均分配宽度
      };

    return(
        <div>
            <Card>
                
            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
            }}>
                文学
            </Typography>
            <Typography>
                <Link to="/dashboard/tagsearch?tag_id=21&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>小说({recordsArray[21-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=14&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>中国文学({recordsArray[14-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=15&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>余华({recordsArray[15-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=16&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>儿童文学({recordsArray[16-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=17&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>古典文学({recordsArray[17-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=18&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>名著({recordsArray[18-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=19&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>外国名著({recordsArray[19-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=20&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>外国文学({recordsArray[20-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=21&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>张爱玲({recordsArray[21-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=22&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>当代文学({recordsArray[22-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=23&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>散文({recordsArray[23-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=24&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>杂文({recordsArray[24-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=25&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>村上春树({recordsArray[25-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=26&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>杜拉斯({recordsArray[26-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=27&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>港台({recordsArray[27-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=28&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>童话({recordsArray[28-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=29&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>外国名著({recordsArray[29-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=30&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>米兰·昆德拉({recordsArray[30-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=31&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>茨威格({recordsArray[31-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=32&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>诗歌({recordsArray[32-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=33&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>诗词({recordsArray[33-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=34&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>钱钟书({recordsArray[34-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=35&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>随笔({recordsArray[35-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=36&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>鲁迅({recordsArray[36-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
            }}>
                流行
            </Typography>
            <Typography>
                <Link to="/dashboard/tagsearch?tag_id=39&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>推理({recordsArray[39-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=37&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>奇幻({recordsArray[37-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=38&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>悬疑{recordsArray[38-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=40&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>武侠({recordsArray[40-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=41&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>科幻({recordsArray[41-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=42&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>绘本({recordsArray[42-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=43&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>青春({recordsArray[43-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=44&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>魔幻({recordsArray[44-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
            }}>
                文化
            </Typography>
            <Typography>
                <Link to="/dashboard/tagsearch?tag_id=1&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>人物传记({recordsArray[1-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=2&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>传记({recordsArray[2-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=3&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>军事({recordsArray[3-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=4&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>历史({recordsArray[4-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=5&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>哲学({recordsArray[5-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=6&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>建筑({recordsArray[6-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=7&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>心理学({recordsArray[7-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=8&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>戏剧({recordsArray[8-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=9&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>政治学({recordsArray[9-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=10&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>社会({recordsArray[10-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=11&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>绘画({recordsArray[11-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=12&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>艺术({recordsArray[12-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=13&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>设计({recordsArray[13-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
            }}>
                生活
            </Typography>
            <Typography>
                <Link to="/dashboard/tagsearch?tag_id=45&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>健康({recordsArray[45-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=46&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>励志({recordsArray[46-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=47&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>心理({recordsArray[47-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=48&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>成长({recordsArray[48-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=49&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>教育({recordsArray[49-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=50&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>游记({recordsArray[50-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=51&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>爱情({recordsArray[51-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
            }}>
                经管
            </Typography>
            <Typography>
                <Link to="/dashboard/tagsearch?tag_id=56&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>商业({recordsArray[56-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=57&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>管理({recordsArray[57-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=58&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>经济学({recordsArray[58-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=59&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>金融({recordsArray[59-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>   

            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
            }}>
                科技
            </Typography>
            <Typography>
                <Link to="/dashboard/tagsearch?tag_id=52&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>科普({recordsArray[52-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=53&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>程序({recordsArray[53-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=54&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>编程({recordsArray[54-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/tagsearch?tag_id=55&page=1" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#0074e4' }}>通信({recordsArray[55-1]})</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>

            </Card>
        </div>
    )
}
export default Category;