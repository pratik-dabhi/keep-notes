import LazyRoutes from "./LazyRoutes.ts";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "./AuthGuard.tsx";

const Index = () => {
  return (
    <>
    <Routes>
      {LazyRoutes.map((route) => (
        <Route
          key={route.path} 
          path={route.path}
          element={
            <AuthGuard>
              <route.element/>
            </AuthGuard>
          }
        />
      ))}
    </Routes>
    </>
  );
};

export default Index;
