import axios from "axios";

// 创建一个专用于文件上传的 Axios 实例
const fileService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 根据您的需要配置基础URL
  timeout: 3000,
  headers: {
    "Content-Type": "multipart/form-data", // 设置为multipart/form-data
  },
});

export default fileService;
