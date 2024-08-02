import React from "react";

export const LazyRoutes = 
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
        },
    ];
  
export default LazyRoutes;
