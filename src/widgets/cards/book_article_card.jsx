import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function BookArticleCard({
  avatar_path,
  username,
  article_id,
  article_title,
  user_id,
  create_time,
  action,
}) {
  const avatar_url = import.meta.env.VITE_BASE_URL + '/' + avatar_path;
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/user/${user_id}`}>
          <Avatar
            src={avatar_url}
            alt={username}
            className="h-12 w-12 rounded-full shadow-lg"
          />
        </Link>
        <Link to={`/user/article/${article_id}`}>
        <div>
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
            <Typography className="text-base font-normal text-cyan-500 ">
              《{article_title}》
            </Typography>
          </div>
        </div>
        </Link>
      </div>
      {action}
    </div>
  );
}


// BookArticleCard.defaultProps = {
//   action: null,
// };

// BookArticleCard.propTypes = {
//   avatar_path: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired,
//   content: PropTypes.node.isRequired,
//   action: PropTypes.node,
// };


export default BookArticleCard;
