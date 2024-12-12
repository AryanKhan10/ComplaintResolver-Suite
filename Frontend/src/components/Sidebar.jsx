import React from 'react';
import { Link  } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{transform:"translate(0% , 0%)"}} className="w-64 bg-gray-500 text-white h-[150%] flex flex-col absolute">
      <div className="p-8">
        <h1 className="p-3 my-4 text-blue-300 mb-8">Manage</h1>
        <ul className="space-y-8">
         
            <Link to= "/browse/card"><li className="font-medium text-blue-300 hover:text-white cursor-pointer">
              Dashboard
            </li></Link>
        
         
            <Link to="/browse/complaints">
    <li className="hover:text-blue-300 cursor-pointer my-7">Complaints</li>
</Link>

        
         
            <Link to="/browse/notify"><li className="hover:text-blue-300 cursor-pointer">Notifications</li></Link>
        
        
        <Link to="/browse/account">    <li className="hover:text-blue-300 cursor-pointer my-8">Account</li></Link>
        
        </ul>
       
      </div>
    </div>
  );
};

export default Sidebar;
