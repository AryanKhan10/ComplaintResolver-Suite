
import React from 'react'
import Sidebar from './Sidebar'
import Headers from './DashboardHeader'
import { Outlet } from 'react-router-dom'
function Admin() {
  return (
    <div>
            

            <Sidebar/>
            {/* <Headers/> */}
            <Outlet />
        </div>
  )
}

export default Admin

