import { Avatar } from "components/Avatar";
import { User } from "types";
import { CancelIcon } from "assests/icons";

export const ResultCard = ({
  user,
  handleRemove,
  handleNavigate,
}: {
  user: User;
  handleRemove?: Function;
  handleNavigate: Function;
}) => {
  const { imageURL, fullname, username } = user;

  return (
    <li className="row align-center cursor-pointer border-bottom padding-8 justify-between">
      <div className="row" onClick={() => handleNavigate(user)}>
        <Avatar image={imageURL} name={`${fullname}`} />
        <div className="margin-l-8">
          <h5 className="bold">{fullname}</h5>
          <h6 className="bold grey-color">{username}</h6>
        </div>
      </div>
      {handleRemove && (
        <button className="btn-link" onClick={() => handleRemove(username)}>
          <CancelIcon />
        </button>
      )}
    </li>
  );
};
