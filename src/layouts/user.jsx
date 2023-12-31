import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  ChartPieIcon,
  UserPlusIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import {
  DashboardNavbar,
  Footer,
  Navbar,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function User() {
  const [dispatch] = useMaterialTailwindController();

  const navbarRoutes = [
    {
      name: "首页",
      path: "/user/main",
      icon: ChartPieIcon,
    },
    {
      name: "个人主页",
      path: "/user/profile",
      icon: UserPlusIcon,
    },
    {
      name: "分类浏览",
      path: "/user/category",
      icon: TagIcon,
    },
    {
      name: "设置",
      path: "/user/setting",
      icon: UserPlusIcon,
    },
  ];


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <DashboardNavbar />
        <div className="container relative z-40 p-4" style={{ width: "1125px" }}>
          <Navbar routes={navbarRoutes} />
        </div>
        <div>
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "user" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
        </div>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

User.displayName = "/src/layout/user.jsx";

export default User;
