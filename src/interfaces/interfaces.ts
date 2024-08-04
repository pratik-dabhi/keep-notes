export interface IRouteElement {
    element: React.ReactElement | React.LazyExoticComponent<React.ComponentType>,
}

export interface ISeo {
    title : string;
    metaDescription : string;
}

export interface IImageComponent {
    src : string;
    alt : string;
    className : string;
}

export interface IIconsProps{
    name : 'MENU' | 'GOOGLE' | 'SEARCH' | 'LOGOUT' | 'PROFILE' | 'DOUBLE_ACCOUNT' | 'PEN' | 'TRUE'| 'ARROW' | 'EDIT_PEN' | 'DOTS' | 'LABEL' | 'IMAGE' | 'DELETE';
    className ? : string
}
export interface IClassNameProps{
    className ?: string
}

export interface IChildrenProps {
    children : string | JSX.Element | JSX.Element[] 
}

export interface IUserDetails {
    id : string | number;
    username : string,
    email : string,
    password : string,
}

export interface IUserCredentials extends Omit<IUserDetails, 'username'>{
    password : string
}

export interface IAuthContext {
    Logout: () => void;
    loggedUser: IUserDetails | null;
}
export interface ISidebarContext {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFirebaseUser extends Omit<IUserDetails, 'username'> {
    id: string,
    name: string,
    createdAt : Date
    updatedAt:Date,
}

export interface IFilterOpt{
    key : string,
    opt :  "<" | "<=" | "==" | "<" | "<=" | "!=",
    value: string | number
}
export interface IUpdateParams{
    id : string | number,
    data : object
}

export interface ISearchProps{
    placeholder : string,
    onSearchHandler : (slug:string) => void
}

export interface ISearchProps{
    placeholder : string,
}

export interface ILabel {
    id : number | string,
    name : string,
    isChecked ?: boolean,
    createdAt ?: Date,
    updatedAt ?: Date
}
export interface INoteLabels {
    id : number | string,
    user_id : string,
    note_id : string,
    label_id : string
}