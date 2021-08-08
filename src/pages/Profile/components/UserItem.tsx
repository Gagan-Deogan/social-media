import { User } from "types";
import { Avatar } from "common-components/Avatar";
export const UserItem = ({ user }: { user: User }) => {
  const { imageURL, fullname, username } = user;
  return (
    <li className="row align-center cursor-pointer border-bottom padding-8 justify-between">
      <div className="row">
        <Avatar image={imageURL} name={`${fullname}`} />
        <div className="margin-l-8">
          <h5 className="bold">{fullname}</h5>
          <h6 className="bold grey-color">{username}</h6>
        </div>
      </div>
    </li>
  );
};
