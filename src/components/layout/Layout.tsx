import { Suspense} from "react";
import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RouteProvider from "../../routes/Index";
import Sidebar from "./sidebar/Sidebar";
import Loader from "../common/Loader";
import SidebarProvider from "../../providers/SidebarProvider";
import LoaderProvider from "../../providers/LoaderProvider";

const Layout = () => {
  return (
    <>
      <main className="flex h-screen">
        <Suspense fallback={<Loader/>}>
          <LoaderProvider >
          <AuthenticationProvider>
            <SidebarProvider>
              <Sidebar/>
              <RouteProvider />
            </SidebarProvider>
          </AuthenticationProvider>
          </LoaderProvider>
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
