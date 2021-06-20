import { User } from "types";
import { UserItem } from "./UserItem";
export const Followers = ({ followers }: { followers: User[] }) => {
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Followers</h2>
        </div>
        <ul>
          {followers.map((follower) => (
            <UserItem user={follower} />
          ))}
        </ul>
        {!followers.length && (
          <div className="row justify-center">
            <h2 className="margin-t-64 bold">No Followers Found!</h2>
          </div>
        )}
      </section>
    </>
  );
};
