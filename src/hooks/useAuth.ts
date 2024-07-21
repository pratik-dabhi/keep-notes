import { useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";

const useAuth = () => {
    return useContext(AuthenticationContext);
};

export default useAuth;