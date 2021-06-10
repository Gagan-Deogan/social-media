import "./post.css";
import { Post as PostProps } from "types";
import { Avatar } from "components/Avatar";
import { LikedIcon, LikeIcon } from "assests/icons";
import { useAppDispatch } from "app/hooks";
import { likePost } from "features/postsSlice";

export const Post = ({ post }: { post: PostProps }) => {
  const { _id, title, image, createBy, likes } = post;
  const appDispatch = useAppDispatch();
  return (
    <article className="column align-start border bor-rad-8 padding-16 margin-16">
      <div className="row align-center cursor-pointer">
        <Avatar
          image={createBy.userImage}
          name={`${createBy.userImage} image`}
        />
        <div className="margin-l-8">
          <h5 className="bold">{createBy.name}</h5>
          <h6 className="bold grey-color">{createBy.username}</h6>
        </div>
      </div>
      <p>{title}</p>
      <div className="post-image-container w12 bor-rad-8 margin-t-8 margin-b-8">
        <img className="bor-rad-12" src={image} alt="post" />
      </div>
      <button
        className="btn-link border-rounded pink-color"
        onClick={() => appDispatch(likePost({ postId: _id }))}>
        <LikeIcon />
        {/* <LikedIcon />  */}
        <span>{likes}</span>
      </button>
    </article>
  );
};
