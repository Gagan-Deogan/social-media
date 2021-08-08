import { User } from "types";
import { UserItem } from "./UserItem";
import { GenericSection } from "common-components/GenericSection";

export const Following = ({ following }: { following: User[] }) => {
  return (
    <>
      <GenericSection title="Following">
        {following.map((follow) => (
          <UserItem user={follow} />
        ))}
        {!following.length && (
          <div className="row justify-center">
            <h2 className="margin-t-64 bold">No Following Found!</h2>
          </div>
        )}
      </GenericSection>
    </>
  );
};
