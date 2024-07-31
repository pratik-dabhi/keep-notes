
export type TRoute = {
    path: string,
    name: string,
    element: React.ReactElement | React.LazyExoticComponent<React.ComponentType>,
    moduleName ?: []
}

export type TNote = {
    id:number,
    title : string,
    description: string,
    status: boolean,
    user_id:number | string,
    createdAt : Date,
    updatedAt : Date,
}