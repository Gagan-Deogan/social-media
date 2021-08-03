import { User } from "types";
import { UserItem } from "./UserItem";
export const Following = ({ following }: { following: User[] }) => {
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Following</h2>
        </div>
        {following.map((follow) => (
          <UserItem user={follow} />
        ))}
        {!following.length && (
          <div className="row justify-center">
            <h2 className="margin-t-64 bold">No Following Found!</h2>
          </div>
        )}
      </section>
    </>
  );
};
