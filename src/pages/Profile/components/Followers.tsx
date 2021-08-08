import { User } from "types";
import { UserCard } from "common-components/UserCard";
import { GenericSection } from "common-components/GenericSection";
import { useNavigate } from "react-router-dom";
export const Followers = ({ followers }: { followers: User[] }) => {
  const navigate = useNavigate();
  const handleNavigate = (user: User) => {
    navigate(`/${user.username}`);
  };
  return (
    <>
      <GenericSection title="Followers">
        <ul>
          {followers.map((follower) => (
            <UserCard user={follower} handleNavigate={handleNavigate} />
          ))}
        </ul>
        {!followers.length && (
          <div className="row justify-center">
            <h2 className="margin-t-64 bold">No Followers Found!</h2>
          </div>
        )}
      </GenericSection>
    </>
  );
};
