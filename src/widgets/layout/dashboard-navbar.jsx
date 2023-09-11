/**
 * 导航栏组件
 */

import { Link, useNavigate } from "react-router-dom";
import React, {
  Avatar,
  Navbar,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";
import { useUser } from "@/context/UserContext";
import logoImage from "/img/logo-一本好书.png";
import { SearchBar } from "@/widgets/stuff";

export function DashboardNavbar() {
  const [controller] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { isLoggedIn, setIsLoggedIn, user, logout } = useUser(); // 使用useUser钩子来获取用户状态
  const avatar_url = import.meta.env.VITE_BASE_URL + "/" + user.avatar_path;
  const handleLogout = () => {
    // 在用户点击登出按钮时更新用户状态
    setIsLoggedIn(false);
    navigate(`/tourist/main`);

    logout();
  };

  const navigate = useNavigate();

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <img src={logoImage} alt="一本好书" className="h-16" />
        </div>
        <div className="flex items-center">
          <SearchBar />
          {isLoggedIn ? (
            <Link to="/user/setting">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"
              >
                <Avatar src={avatar_url} alt="avatar" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth/sign-in">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Sign In
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </Link>
          )}
          {isLoggedIn ? (
            <IconButton variant="text" color="blue-gray" onClick={handleLogout}>
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
