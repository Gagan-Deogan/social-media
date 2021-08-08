import { UserCard } from "common-components/UserCard";
import { User } from "types";
export const Recents = ({
  recents,
  handleNavigate,
  handleRemove,
}: {
  recents: User[];
  handleNavigate: Function;
  handleRemove: Function;
}) => {
  return (
    <div>
      <h3 className="margin-8">Recent</h3>
      {recents.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          handleNavigate={handleNavigate}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};
