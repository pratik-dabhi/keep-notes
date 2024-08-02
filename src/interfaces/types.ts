import { ILabel } from "./interfaces"

export type TRoute = {
    path: string,
    name: string,
    element: React.ReactElement | React.LazyExoticComponent<React.ComponentType>,
    moduleName ?: []
}

export type TNote = {
    id ?: number | string,
    title : string,
    description: string,
    status: boolean,
    user_id:number | string,
    labels: ILabel[] | [],
    createdAt : Date,
    updatedAt : Date,
}