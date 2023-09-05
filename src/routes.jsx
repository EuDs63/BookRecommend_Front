import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { DashBoard, Tables, Notifications } from "@/pages/dashboard";
import {Profile, UserProfile} from "@/pages/profile";
import { SignIn, SignUp } from "@/pages/auth";
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
  //   {
  //     title: "user pages",
  //     layout: "user",
  //     pages: [
  //       {
  //         icon: <UserPlusIcon {...icon} />,
  //         name: "user profile",
  //         path: "/user/:userid",
  //         element: <userProfile />,
  //       },
  //     ],
  //   },
];

export default routes;
