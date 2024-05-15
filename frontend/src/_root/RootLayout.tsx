import { Outlet } from "react-router-dom";

import Sidebar from "../components/shared/Sidebar";

function RootLayout(){
    return(<>
    <div className="flex w-screen h-screen bg-dark-1">
        <div>
        <Sidebar/>

        </div>
        <div>
            <Outlet/>
        </div>
    </div>
    </>)
}
export default RootLayout
