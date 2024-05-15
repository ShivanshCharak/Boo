import { Outlet } from "react-router-dom";

import Sidebar from "../components/shared/Sidebar";

function RootLayout(){
    return(<>
    <div className="flex">
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
