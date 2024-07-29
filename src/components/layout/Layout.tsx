import { Suspense} from "react";
import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RouteProvider from "../../routes/Index";
import Sidebar from "./sidebar/Sidebar";
import Loader from "../common/Loader";
import SidebarProvider from "../../providers/SidebarProvider";

const Layout = () => {
  return (
    <>
      <main className="flex h-screen">
        <Suspense fallback={<Loader/>}>
          <AuthenticationProvider>
            <SidebarProvider>
              <Sidebar/>
              <RouteProvider />
            </SidebarProvider>
          </AuthenticationProvider>
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
