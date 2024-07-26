import { Suspense } from "react";
import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RouteProvider from "../../routes/Index";
import Sidebar from "./sidebar/Sidebar";
import Loader from "../common/Loader";

const Layout = () => {
  return (
    <>
      <main className="flex h-screen">
        <Suspense fallback={<Loader/>}>
          <AuthenticationProvider>
            <Sidebar/>
            <RouteProvider />
          </AuthenticationProvider>
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
