
export type TRoute = {
    path: string,
    name: string,
    element: React.ReactElement | React.LazyExoticComponent<React.ComponentType>,
    moduleName ?: []
}