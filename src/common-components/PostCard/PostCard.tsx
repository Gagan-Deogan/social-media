import "./post.css";
import { Post as PostProps } from "types";
import { Avatar } from "common-components/Avatar";
import { LikedIcon, LikeIcon } from "assests/icons";
import { debounce } from "utils";
import { useNavigate } from "react-router";
export const PostCard = ({
  post,
  handleLike,
}: {
  post: PostProps;
  handleLike: Function;
}) => {
  const navigate = useNavigate();
  const { _id, title, imageURL, createdBy, likes, currentUserLike } = post;
  const betterhandleLike = debounce(handleLike, 500);
  const handleNavigate = () => {
    navigate(`/${createdBy.username}`);
  };
  return (
    <article className="column align-start border bor-rad-8 padding-16 margin-16">
      <div className="row align-center cursor-pointer" onClick={handleNavigate}>
        <Avatar image={createdBy.imageURL} name={`${createdBy.imageURL}`} />
        <div className="margin-l-8">
          <h5 className="bold">{createdBy.fullname}</h5>
          <h6 className="bold grey-color">{createdBy.username}</h6>
        </div>
      </div>
      <p>{title}</p>
      {imageURL && (
        <div className="post-image-container w12 bor-rad-8 margin-t-8 margin-b-8 bor-rad-12">
          <img src={imageURL} alt="post" />
        </div>
      )}
      <div className="row align-center">
        <button
          className="btn-link border-rounded pink-color"
          onClick={() => betterhandleLike(_id)}>
          {!currentUserLike && <LikeIcon />}
          {currentUserLike && <LikedIcon />}
        </button>
        <button className="btn-link">
          <h5 className="bold">{likes}</h5>
          <span>Likes</span>
        </button>
      </div>
    </article>
  );
};
