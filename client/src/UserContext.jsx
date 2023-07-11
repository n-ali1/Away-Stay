/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fetchUser = async() => {
      if (!user) {
        const res = await axios.get("/login/profile");
        setUser(res.data);
        setReady(true)
      }
    }
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
};