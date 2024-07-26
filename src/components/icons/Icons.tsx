import React from "react";
import { IImageProps } from "../../interfaces/interfaces";
import Menu from "./Menu";
import Google from "./Google";
import Search from "./Search";
import Logout from "./Logout";
import Profile from "./Profile";
import DoubleAccount from "./DoubleAccount";
import Pen from "./Pen";
import True from "./True";
import Arrow from "./Arrow";

const Icons = ({ name }: IImageProps) => {
  const icons: { [key: string]: JSX.Element } = {
    MENU: <Menu />,
    GOOGLE: <Google />,
    SEARCH: <Search />,
    LOGOUT: <Logout />,
    PROFILE: <Profile />,
    DOUBLE_ACCOUNT: <DoubleAccount />,
    PEN: <Pen />,
    TRUE: <True />,
    ARROW: <Arrow />,
  };

  return <> {icons[name] || <div>Icon not found</div>} </>;
};

export default Icons;
