import {
  HomeIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { DashBoard, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Setting,UserProfileWrapper,WillRead,Reading,HaveRead,UserMainPage,UserComment, UserRating} from "@/pages/user";
import { Category, Search, TagSearch,BookDetailWrapper } from "@/pages/book";
import { TouristMainPage } from "@/pages/tourist";
import UserCollect from "./pages/user/user_collect";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    title: "tourist pages",
    layout: "tourist",
    pages: [
      {
        icon: <BellIcon {...icon} />,
        name: "游客首页",
        path: "/main",
        element: <TouristMainPage />,
      },
    ],
  },
  {
    title: "user pages",
    layout: "user",
    pages: [
      {
        icon: <BellIcon {...icon} />,
        name: "用户首页",
        path: "/main",
        element: <UserMainPage />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "个人主页",
        path: "/profile",
        element: <UserProfileWrapper />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "想读",
        path: "/wish",
        element: <WillRead />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "在读",
        path: "/do",
        element: <Reading />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "读过",
        path: "/collect",
        element: <HaveRead />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "用户设置",
        path: "/setting",
        element: <Setting />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "用户评论",
        path: "/comment",
        element: <UserComment />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "用户评分",
        path: "/userRating",
        element: <UserRating />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "用户阅读",
        path: "/userCollect",
        element: <UserCollect />,
      },
    ],
  },
  {
    title: "book pages",
    layout: "book",
    pages: [
      {
        icon: <TagIcon {...icon} />,
        name: "分类浏览",
        path: "/category",
        element: <Category />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "搜索",
        path: "/search",
        element: <Search />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "tagsearch",
        path: "/tagsearch",
        element: <TagSearch />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "书籍详情",
        path: ":book_id",
        element: <BookDetailWrapper />,
      },
    ],
  },
];

export default routes;
