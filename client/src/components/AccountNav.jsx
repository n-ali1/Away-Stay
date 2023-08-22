import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../assets/profile.svg";
import { ReactComponent as BookingIcon } from "../assets/booking.svg";
import { ReactComponent as PlaceIcon } from "../assets/place.svg";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")[2];

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

  return (
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
  );
};

export default AccountNav;
