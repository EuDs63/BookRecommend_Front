import { UserProfile } from "@/pages/user";
import { CollectTimeline,CommentTimeline,RatingTimeline } from "@/widgets/stuff";
import { useUser } from "@/context/UserContext";

// 导出包裹后的组件
export function UserProfileWrapper() {
    const { user } = useUser(); // 使用useUser钩子来获取用户状态

    return (
        <div className="flex flex-row">
            <div className="w-2/3">
                <UserProfile />
            </div>
            <div className="w-1/3">
                <CollectTimeline user_id={user.user_id}/>
                <CommentTimeline user_id={user.user_id}/>
                <RatingTimeline user_id={user.user_id}/>
            </div>
        </div>
    );
}

UserProfileWrapper.defaultName = "@/pages/user/user_profile_wrapper.jsx";

export default UserProfileWrapper;


