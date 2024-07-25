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

export interface IImageProps{
    name : 'MENU' | 'GOOGLE' | 'SEARCH' | 'LOGOUT' | 'PROFILE' | 'DOUBLE_ACCOUNT';
}

export interface IChildrenProps {
    children : string | JSX.Element | JSX.Element[] 
}

export interface IUserDetails {
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

export interface IFirebaseUser extends Omit<IUserDetails, 'username'> {
    id: string,
    name: string,
    createdAt : Date
    updatedAt:Date,
}

export interface IFilterOpt{
    key : string,
    opt :  "<" | "<=" | "==" | "<" | "<=" | "!=",
    value:string
}

export interface ISearchProps{
    placeholder : string,
}

export interface ISearchProps{
    placeholder : string,
}