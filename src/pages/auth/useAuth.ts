import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = (): [string, React.MouseEventHandler<HTMLButtonElement>] => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flipCardClass, setFlipCardClass] = useState("");

  useEffect(() => {
    if (location.pathname === "/register") {
      setFlipCardClass("flip-card");
    } else {
      setFlipCardClass("");
    }
  }, [location]);

  const handleFlipCard: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (flipCardClass === "flip-card") {
      setFlipCardClass("");
      navigate("/login");
    } else {
      setFlipCardClass("flip-card");
      navigate("/register");
    }
  };

  return [flipCardClass, handleFlipCard];
};

export default useAuth;
