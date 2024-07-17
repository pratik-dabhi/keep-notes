import React from "react";
import { TRoute } from "../interfaces/types";

export const LazyRoutes : TRoute[] = 
    [
        {
            path: '/notes',
            name: 'Notes',
            element: React.lazy(() => import("../pages/notes/Notes")),
        }
    ];
  
export default LazyRoutes;
