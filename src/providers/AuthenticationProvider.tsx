import React, { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import { IChildrenProps, IUserDetails } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { getItem, parse, removeItem, setItem, stringify } from "../lib/helper";

const AuthenticationProvider: React.FC<IChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<IUserDetails | null>(null);

  useEffect(() => {
    const cachedUser = getItem("user");
    if (cachedUser) {
      setLoggedUser(parse(cachedUser));
    } else {
      console.log("No user logged in");
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      setItem("user", stringify(loggedUser));
      navigate("/notes", { replace: true });
    }
  }, [loggedUser, navigate]);

  const Login = (userDetails: IUserDetails) => {
    try {
      setLoggedUser(userDetails);
      console.log("User logged in:", userDetails);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const Logout = () => {
    removeItem("user");
    setLoggedUser(null);
    navigate("/login", { replace: true });
    console.log("User logged out");
  };

  return (
    <AuthenticationContext.Provider value={{ Login, Logout, loggedUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
