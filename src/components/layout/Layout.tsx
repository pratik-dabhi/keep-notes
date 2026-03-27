import { Suspense } from "react";
import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RouteProvider from "../../routes/Index";
import Sidebar from "./sidebar/Sidebar";
import Loader from "../common/Loader";
import SidebarProvider from "../../providers/SidebarProvider";
import LoaderProvider from "../../providers/LoaderProvider";

import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<Loader />}>
        <LoaderProvider>
          <AuthenticationProvider>
            <SidebarProvider>
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-white">
                  <RouteProvider />
                </main>
              </div>
            </SidebarProvider>
          </AuthenticationProvider>
        </LoaderProvider>
      </Suspense>
    </div>
  );
};

export default Layout;
