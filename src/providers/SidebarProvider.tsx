import { useState } from "react";
import SidebarContext from "../context/SidebarContext";
import { IChildrenProps } from "../interfaces/interfaces";

const SidebarProvider = ({children}:IChildrenProps) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <SidebarContext.Provider value={{ isVisible, setVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
