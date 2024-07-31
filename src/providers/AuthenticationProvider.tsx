import React, { useEffect, useState } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import { IChildrenProps, IUserDetails } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { getItem, parse, removeItem } from "../lib/helper";
import Loader from "../components/common/Loader";

const AuthenticationProvider: React.FC<IChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = getItem("user");
    if (cachedUser) {
      setLoggedUser(parse(cachedUser));
    }else{
      navigate("/login", { replace: true });
    }
    setLoading(false);
  }, [navigate]);

  const Logout = () => {
    removeItem("user");
    setLoggedUser(null);
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <Loader />
  }

  return (
    <AuthenticationContext.Provider value={{ Logout, loggedUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
