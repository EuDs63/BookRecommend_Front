import { useLocation, Link, useNavigate } from "react-router-dom";
import React, {
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
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { useUser } from "../../UserContext";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { isLoggedIn, setIsLoggedIn, user, logout } = useUser(); // 使用useUser钩子来获取用户状态

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
    navigate(`/dashboard/search?query=${searchText}`);
  };


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
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="paragraph" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">

          <div className="mr-auto md:mr-0 md:w-56">
            <Input label="书名、作者" onChange={handleInputChange} value={searchText} />
          </div>
          <Button
            variant="filled"
            color="blue-gray"
            className="hidden md:flex ml-2"
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
            <Link to="/dashboard/tables">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                {user.username}
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
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
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          ) : (
            <div>
            </div>
          )}


        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
