import { createContext } from 'react';
import {ISidebarContext} from '../interfaces/interfaces';

const SidebarContext = createContext<ISidebarContext>({
  isVisible: false,
  setVisible: ()=> {},
});

export default SidebarContext;
