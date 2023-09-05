import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  DashboardNavbar,
  Configurator,
  Footer,
  Navbar,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Tourist() {
  const [dispatch] = useMaterialTailwindController();

  const navbarRoutes = [
    {
      name: "首页",
      path: "/tourist/main",
      icon: ChartPieIcon,
    },
    {
      name: "图书详情页",
      path: "/dashboard/home",
      icon: UserIcon,
    },
    {
      name: "个人主页",
      path: "/dashboard/:userid",
      icon: UserPlusIcon,
    },
    {
      name: "想读",
      path: "/dashboard/:userid/will-read",
      icon: UserPlusIcon,
    },
  ];


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4 xl:mr-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div className="container relative z-40 mx-auto p-4">
          <Navbar routes={navbarRoutes} />
        </div>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "tourist" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Tourist.displayName = "/src/layout/tourist.jsx";

export default Tourist;