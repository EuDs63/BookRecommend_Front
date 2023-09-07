import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";

export function UserCommentsCard({
  user_avatar,
  user_name,
  content,
  book_id,
  comment_id,
  create_time,
  action,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <Avatar
          src={user_avatar}
          alt={user_name}
          className="h-12 w-12 rounded-full shadow-lg"
        />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            <span className="text-blue-600">{user_name}</span>
            <span className="ml-2 text-xs text-blue-gray-400">
              {create_time}
            </span>
          </Typography>
          <div className="overflow-hidden">
            <Typography className="text-sm font-normal text-black">
              {content}
            </Typography>
          </div>
        </div>
      </div>
      {action}
    </div>
  );
}


UserCommentsCard.defaultProps = {
  action: null,
};

UserCommentsCard.propTypes = {
  user_avatar: PropTypes.string.isRequired,
  user_name: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  action: PropTypes.node,
};

UserCommentsCard.displayName = "/src/widgets/cards/user-comments-card.jsx";

export default UserCommentsCard;
