import React from "react";
import { TRoute } from "../interfaces/types";

export const LazyRoutes : TRoute[] = 
    [
        {
            path: '/test',
            name: 'Login',
            element: React.lazy(() => import("../pages/login/Login")),
        }
    ];
  
export default LazyRoutes;
