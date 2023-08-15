import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

import { ReactComponent as ProfileIcon } from "../assets/profile.svg";
import { ReactComponent as BookingIcon } from "../assets/booking.svg";
import { ReactComponent as PlaceIcon } from "../assets/place.svg";
import PlacesPage from "./PlacesPage";

const AccountPage = () => {
  const [toHome, setToHome] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

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

  if (subpage === undefined) {
    subpage = "account";
  }

  const linkClasses = (type) => {
    let classes = "py-2 px-4 inline-flex items-center gap-1 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-black font-medium";
    } else {
      classes += " bg-third text-white ";
    }
    return classes;
  };

  if (toHome) {
    return <Navigate to={toHome} />;
  }

  return (
    <div className="xl:px-20 px-10 mt-4">
      <nav className="flex gap-2 w-full justify-center mb-4">
        <Link className={linkClasses("account")} to="/account">
          <ProfileIcon className="w-6 stroke-2" /> My Account
        </Link>
        <Link className={linkClasses("bookings")} to="/account/bookings">
          <BookingIcon className="w-6 stroke-2" /> My Bookings
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          <PlaceIcon className="w-6 stroke-2" /> My Accomodations
        </Link>
      </nav>
      {/* <div className="bg-black grid grid-rows-6 grid-cols-6 w-full "> */}
        {subpage === "account" && (
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
        )}
        {subpage === "places" && (
          <PlacesPage/>
        )}
      {/* </div> */}
    </div>
  );
};

export default AccountPage;
