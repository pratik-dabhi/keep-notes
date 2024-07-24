import React from "react";
import { TRoute } from "../interfaces/types";

export const LazyRoutes : TRoute[] = 
    [
        {
            path: '/',
            name: 'Home',
            element: React.lazy(() => import("../pages/notes/Notes")),
        },
        {
            path: '/notes',
            name: 'Notes',
            element: React.lazy(() => import("../pages/notes/Notes")),
        }
    ];
  
export default LazyRoutes;
