import RouteProvider from "../../routes/Index";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <main className="flex h-screen">
        <Sidebar/>
        <RouteProvider />
      </main>
    </>
  );
};

export default Layout;
