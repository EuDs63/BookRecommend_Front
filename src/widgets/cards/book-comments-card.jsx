import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function BookCommentsCard({
  avatar_path,
  username,
  content,
  user_id,
  create_time,
}) {
  const avatar_url = import.meta.env.VITE_BASE_URL + '/' + avatar_path;
  return (
    <div className="flex items-center  gap-5 rounded-lg bg-white p-4 shadow-md">
      <div className="flex gap-5">
        <Link to={`/user/${user_id}`}>
          <Avatar
            src={avatar_url}
            alt={username}
            className="h-12 w-12 shadow-lg overflow-visible"
          />
        </Link>
        <div className="ml-2">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            <span className="text-blue-600">{username}</span>
            <span className="ml-2 text-xs text-blue-gray-400">
              {create_time}
            </span>
          </Typography>
          <div className="overflow-hidden">
            <Typography className="text-base font-normal text-black ">
              {content}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}


BookCommentsCard.defaultProps = {
  action: null,
};

BookCommentsCard.propTypes = {
  avatar_path: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  action: PropTypes.node,
};

BookCommentsCard.displayName = "/src/widgets/cards/book-comments-card.jsx";

export default BookCommentsCard;
