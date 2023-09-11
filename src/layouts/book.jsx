import { Routes, Route } from "react-router-dom";
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
import { useUser } from "@/context/UserContext";

export function Book() {
    const { isLoggedIn } = useUser(); // 使用useUser钩子来获取用户状态
    // const { book_id } = useParams(); // 尝试获取URL中的book_id参数
    // console.log(book_id); //获取不到

    const userNavbarRoutes = [
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
            path: "/book/category",
            icon: TagIcon,
        },
        {
            name: "设置",
            path: "/user/setting",
            icon: UserPlusIcon,
        },
    ];

    const visitorNavbarRoutes = [
        {
            name: "首页",
            path: "/tourist/main",
            icon: ChartPieIcon,
        },
        {
            name: "分类浏览",
            path: "/book/category",
            icon: TagIcon,
        },
    ];


    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <div className="p-4 ">
                <DashboardNavbar />

                <div className="container relative z-40 mx-auto p-4">
                    <Navbar routes={isLoggedIn ? userNavbarRoutes : visitorNavbarRoutes} />
                </div>
                <div className="flex">
                        <Routes>
                            {routes.map(
                                ({ layout, pages }) =>
                                    layout === "book" &&
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

Book.displayName = "/src/layout/book.jsx";

export default Book;
