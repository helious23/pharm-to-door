import { auth } from "fb";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    auth.signOut();
    history.push(routes.home);
  };

  return (
    <>
      <div className="bg-slate-200">
        <div className="container">
          <div>Profile</div>
          <button onClick={onLogOutClick}>Log Out</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
