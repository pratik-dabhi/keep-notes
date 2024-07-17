import React, { Suspense } from "react";
import LazyRoutes from "./LazyRoutes.ts";
import { Route, Routes } from "react-router-dom";
import { IRouteElement } from "../interfaces/interfaces.ts";

const AuthGuard: React.FC<IRouteElement> = ({ element }) => {
  
  if (React.isValidElement(element)) {
    return element;
  }

  const LazyElement = element as React.LazyExoticComponent<React.ComponentType>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyElement />
    </Suspense>
  );
};

const Index = () => {
  return (
    <>
      <Routes>
        {LazyRoutes.map((route) => (
          <Route
            path={route.path}
            element={<AuthGuard element={route.element as React.LazyExoticComponent<React.ComponentType>}/>}
            key={route.name}
          />
        ))}
      </Routes>
    </>
  );
};

export default Index;
