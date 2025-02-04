import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../lib/helper";

const useFlipHandler = (): [string, () => void] => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flipCardClass, setFlipCardClass] = useState("");

  useEffect(() => {
    if(getItem('user')){
      navigate('/notes');
    }
    if (location.pathname === "/register") {
      setFlipCardClass("flip-card");
    } else {
      setFlipCardClass("");
    }
  }, [location,navigate]);

  const handleFlipCard: () => void = () => {
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

export default useFlipHandler;
