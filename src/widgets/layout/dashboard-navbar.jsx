import { useLocation, Link, useNavigate } from "react-router-dom";
import React, {
  Avatar,
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  UserCircleIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useUser } from "../../context/UserContext";
import logoImage from "/img/logo-一本好书.png";
export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { isLoggedIn, setIsLoggedIn, user, logout } = useUser(); // 使用useUser钩子来获取用户状态
  const avatar_url = import.meta.env.VITE_BASE_URL + "/" + user.avatar_path;
  const handleLogout = () => {
    // 在用户点击登出按钮时更新用户状态
    setIsLoggedIn(false);
    navigate(`/tourist/main`);

    logout();
  };

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchClick = () => {
    navigate(`/book/search?query=${searchText}`);
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
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
          <div className="mr-auto md:mr-0 md:w-56">
            <Input
              label="书名、作者"
              onChange={handleInputChange}
              value={searchText}
            />
          </div>
          <Button
            variant="filled"
            color="blue-gray"
            className="ml-2 hidden md:flex"
            onClick={handleSearchClick}
          >
            搜索
          </Button>

          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {isLoggedIn ? (
            <Link to="/user/setting">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"
              >
                <Avatar src={avatar_url} alt="avatar" />

                {/* {user.username} */}
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
