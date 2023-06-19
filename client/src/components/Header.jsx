import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as AccountIcon } from "../assets/account.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <header className="xl:px-20 px-10 flex justify-between bg-third">
      <Link to="/" className="flex items-center gap-2">
        <Logo className="w-20 fill-primary" />
        <span className="font-bold text-xl">
          Away<span className="text-primary">Stay</span>
        </span>
      </Link>
      <div
        className="flex border border-gray-400 items-center rounded-full my-3 mr-24 px-4 gap-2
        shadow-md shadow-second"
      >
        <div>Away to?</div>
        <div className="border-l border-gray-400 h-8"></div>
        <div>Staying for?</div>
        <div className="border-l border-gray-400 h-8"></div>
        <div>Number of guests?</div>
        <button className="bg-primary p-2 rounded-full text-black">
          <SearchIcon className="w-5 stroke-2" />
        </button>
      </div>
      <div className="flex border border-gray-400 items-center justify-center rounded-full h-12 w-12 my-auto hover:shadow-md hover:shadow-second">
        <Link to={"/login"}>
          <AccountIcon className="w-9 stroke-primary stroke-2 rounded-full" />
          {!!user && 
          <div>{user.fname}</div>
          }
        </Link>
      </div>
    </header>
  );
};

export default Header;
