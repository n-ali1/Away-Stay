import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {
  const [toHome, setToHome] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  const logout = async () => {
    await axios.post("/login/logout");
    setToHome("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading...";
  } else if (ready && !user && !toHome) {
    return <Navigate to="/login" />;
  }

  if (toHome) {
    return <Navigate to={toHome} />;
  }

  return (
    <div className="xl:px-20 px-10 mt-4">
      <AccountNav />
      <div className="text-center">
        Logged in as {user.fname} ({user.email})
        <br />
        <button
          onClick={logout}
          className="py-2 px-4 ml-2 mt-2 bg-red-900 font-semibold rounded-full "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
