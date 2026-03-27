import { createContext } from "react";
import { IAuthContext } from "../interfaces/interfaces";

const AuthenticationContext = createContext<IAuthContext>({
  Logout: () => {},
  loggedUser: null,
  setLoggedUser: () => {},
});

export default AuthenticationContext;
