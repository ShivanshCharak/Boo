import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
// import Bottombar from "@/components/shared/Bottombar";
// import LeftSidebar from "@/components/shared/LeftSidebar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Toaster/>
      <Topbar />
      <LeftSideBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;