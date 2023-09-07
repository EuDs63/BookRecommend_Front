import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Profile, UserMainPage, UserProfile } from "@/pages/profile";
import { DashBoard, Tables, Notifications, Search, Category, TagSearch} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Setting } from "./pages/user";
import WillReadPage from "./pages/profile/willReadPage";
import ReadingPage from "./pages/profile/readingPage";
import HaveReadPage from "./pages/profile/haveReadPage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "homepage",
        path: "/home",
        element: <Profile />,
      },
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
      {
        icon: <UserPlusIcon {...icon} />,
        name: "user profile",
        path: "/:userid",
        element: <UserProfile />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "WillReadPage",
        path: "/:userid/will-read",
        element: <WillReadPage />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "ReadingPage",
        path: "/:userid/currently-reading",
        element: <ReadingPage />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "HaveReadPage",
        path: "/:userid/have-read",
        element: <HaveReadPage />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "search",
        path: "/search",
        element: <Search />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "userMainPage",
        path: "/main/:userid",
        element: <UserMainPage />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "category",
        path: "/category",
        element: <Category />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "tagsearch",
        path: "/tagsearch",
        element: <TagSearch />,
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
        path: "/main/:userid",
        element: <UserMainPage />,
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
        path: "/main/:userid",
        element: <UserMainPage />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "用户设置",
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
];

export default routes;
