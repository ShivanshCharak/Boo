import { Outlet } from "react-router-dom";

import Sidebar from "../components/shared/Sidebar";

function RootLayout() {
  return (
    <>
      <div className="grid overflow-scroll w-screen h-screen bg-dark-1 grid-cols-12">
        <div className="col-span-2 grid grid-cols-2">
          <Sidebar />
        </div>
        <div className="col-span-10 grid grid-cols-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default RootLayout;
