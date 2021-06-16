import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  searchByUsername,
  removeFromRecent,
  addToRecent,
  setStatusIdle,
} from "features/searchSlice";
import { Spinner } from "components/Spinner";
import { UserCard } from "components/UserCard";
import { debounce } from "utils";
import { User } from "types";
import { useNavigate } from "react-router";
export const Search = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const { users, status, recents } = useAppSelector((state) => state.explore);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search) {
      appDispatch(searchByUsername({ search: e.target.value }));
    } else {
      appDispatch(setStatusIdle());
    }
  };
  const betterHandleSearch = debounce(handleSearch, 500);

  const handleRemove = (username: string) => {
    appDispatch(removeFromRecent({ username }));
  };

  const handleNavigate = (user: User) => {
    appDispatch(addToRecent({ newUser: user }));
    navigate(`/${user.username}`);
    appDispatch(setStatusIdle());
  };

  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Search</h2>
        </div>
        <div className="w12 padding-8">
          <input
            type="text"
            className="w12 border-rounded"
            onChange={betterHandleSearch}
            placeholder="Username"
          />
        </div>
        {status === "PENDING" && <Spinner />}
        {status === "FULFILLED" &&
          users.map((user) => (
            <UserCard
              user={user}
              key={user._id}
              handleNavigate={handleNavigate}
            />
          ))}
        {status === "IDLE" && !!recents.length && (
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
        )}
        {status === "ERROR" && (
          <div className="text-center margin-t-64">
            <h2 className="bold">No user Found</h2>
          </div>
        )}
      </section>
    </>
  );
};
