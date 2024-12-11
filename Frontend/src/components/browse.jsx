
import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Headers from "./DashboardHeader";


const Browse = ()=>{
    return(
        <div>
           
            <Sidebar/>
            <Headers/>
           
            <Outlet />
        </div>
    )
}

export default Browse