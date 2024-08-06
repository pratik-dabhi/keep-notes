import { IIconsProps } from "../../interfaces/interfaces";
import Menu from "./Menu";
import Google from "./Google";
import Search from "./Search";
import Logout from "./Logout";
import Profile from "./Profile";
import DoubleAccount from "./DoubleAccount";
import Pen from "./Pen";
import True from "./True";
import Arrow from "./Arrow";
import Dots from "./Dots";
import Label from "./Label";
import Image from "./Image";
import Delete from "./Delete";
import Upload from "./Upload";

const Icons = ({ name , className }: IIconsProps) => {
  const icons: { [key: string]: JSX.Element } = {
    MENU: <Menu />,
    GOOGLE: <Google />,
    SEARCH: <Search />,
    LOGOUT: <Logout />,
    PROFILE: <Profile />,
    DOUBLE_ACCOUNT: <DoubleAccount />,
    PEN: <Pen variant={1} />,
    EDIT_PEN: <Pen variant={2} />,
    TRUE: <True />,
    ARROW: <Arrow className={className} />,
    DOTS: <Dots />,
    LABEL: <Label />,
    IMAGE: <Image />,
    DELETE: <Delete className={className} />,
    UPLOAD : <Upload />
  };

  return <> {icons[name] || <div>Icon not found</div>} </>;
};

export default Icons;
