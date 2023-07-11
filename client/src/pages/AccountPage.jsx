import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const [toHome, setToHome] = useState(null)
  const {ready, user, setUser} = useContext(UserContext)
  let {subpage} =  useParams()

  const logout = async () => {
    await axios.post("/login/logout")
    setToHome("/")
    setUser(null)
  }

  if (!ready) {
    return "Loading..."
  } else if (ready && !user && !toHome) {
    return <Navigate to="/login" />
  } 

  if (subpage === undefined) {
    subpage = "account"
  }
  
  const linkClasses = (type) => {
    let classes = "py-2 px-4 mr-auto"
    if (type===subpage) {
      classes = "py-2 px-4 mr-auto bg-primary text-black font-semibold rounded-full"
    }
    return classes
  }

  if (toHome) {
    return <Navigate to={toHome} />
  }

  return (
      <div className="xl:px-20 px-10 flex gap-4 mt-4">
        <nav className="flex flex-col gap-2 w-56 border-r-2 border-r-slate-700 ">
          <Link className={linkClasses("account")}  to="/account">My Account</Link>
          <Link className={linkClasses("bookings")} to="/account/bookings">My Bookings</Link>
          <Link className={`${linkClasses("places")} whitespace-nowrap`} to="/account/places">My Accomodations</Link>
        </nav>
        {/* <div className="bg-black grid grid-rows-6 grid-cols-6 w-full "> */}
        <div className="w-full">
          {subpage ==="account" && (
            <div className="">
              Logged in as {user.fname} ({user.email}) 
              <button onClick={logout} className="py-2 px-4 ml-2 bg-red-900 font-semibold rounded-full">Logout</button>
            </div>
          )}
          </div>
        {/* </div> */}
      </div>
      )
  };
 
  export default AccountPage;