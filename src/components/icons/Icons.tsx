import React from "react";
import { IImageProps } from "../../interfaces/interfaces";
import Menu from "./Menu";
import Google from "./Google";
import Search from "./Search";

const Icons = ({ name }: IImageProps) => {
  const icons: { [key: string]: JSX.Element } = {
    MENU: <Menu />,
    GOOGLE: <Google />,
    SEARCH: <Search />,
  };

  return <> {icons[name] || <div>Icon not found</div>} </>;
};

export default Icons;
