
import { Outlet } from "react-router-dom";
import { Sidebar } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
