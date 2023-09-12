import { UserProfile,UserMainPage } from "@/pages/user";
import { CollectTimeline,CommentTimeline,RatingTimeline,PopularTags } from "@/widgets/stuff";
import { useUser } from "@/context/UserContext";

// 导出包裹后的组件
export function UserMainpageWrapper() {
    const { user } = useUser(); // 使用useUser钩子来获取用户状态

    return (
        <div className="flex flex-row">
            <div className="w-2/3">
                <UserMainPage />
            </div>
            <div className="w-1/3">
                < PopularTags />
                <CollectTimeline user_id={user.user_id}/>
            </div>
        </div>
    );
}

UserMainpageWrapper.defaultName = "@/pages/user/user_profile_wrapper.jsx";

export default UserMainpageWrapper;


