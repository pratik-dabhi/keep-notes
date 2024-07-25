import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RouteProvider from "../../routes/Index";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <main className="flex h-screen">
        <AuthenticationProvider>
          <Sidebar/>
          <RouteProvider />
        </AuthenticationProvider>
      </main>
    </>
  );
};

export default Layout;
