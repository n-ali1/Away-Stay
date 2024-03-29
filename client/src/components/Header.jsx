import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as AccountIcon } from "../assets/account.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <header className="xl:px-20 px-10 grid grid-cols-3 bg-third">
      <Link to="/" className="flex items-center gap-2 mr-auto">
        <Logo className="w-20 fill-primary" />
        <span className="font-bold text-xl">
          Away<span className="text-primary">Stay</span>
        </span>
      </Link>
      
      <div
        className="flex border border-gray-600 items-center m-auto rounded-full px-4 py-2 gap-2
        shadow-md shadow-gray-900 whitespace-nowrap"
      >
        <div>Away to?</div>
        <div className="border-l border-gray-500 h-8"></div>
        <div>Staying for?</div>
        <div className="border-l border-gray-500 h-8"></div>
        <div>Number of guests?</div>
        <button className="bg-primary p-2 rounded-full text-black">
          <SearchIcon className="w-5 stroke-2" />
        </button>
      </div>
      <div className="border border-gray-600 rounded-full px-2 py-1 ml-auto my-auto hover:shadow-md hover:shadow-gray-900">
        <Link to={user ? "/account" : "/login"} className="flex items-center justify-center gap-2">
        {!!user && 
          <div>{user.fname} {user.lname}</div>
          }
          <AccountIcon className="w-9 stroke-primary stroke-2 rounded-full" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
