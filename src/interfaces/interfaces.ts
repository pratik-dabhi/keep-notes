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
    name : 'MENU' | 'GOOGLE';
}
