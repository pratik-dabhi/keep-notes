import { createContext } from "react";
import { ISidebarContext } from "../interfaces/interfaces";

const SidebarContext = createContext<ISidebarContext>({
  isVisible: false,
  setVisible: () => {},
  isCollapsed: false,
  setCollapsed: () => {},
});

export default SidebarContext;
