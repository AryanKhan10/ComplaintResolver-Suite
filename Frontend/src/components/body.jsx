import { createBrowserRouter, RouterProvider } from "react-router"
import LoginForm from "./Login"
import Browse from "./browse"
import OTPVerification from "./OTPwait"
import SuccessScreen from "./Success"
import Cards from "./Cards"
import Complaint from "./Complaints"
import Notification from "./Notification"
import Account from "./Account"


const Body = ()=>{

   const Approuter = createBrowserRouter([
  
    {
        path:"/" ,
        element: <LoginForm/>

   } , 
   {
      path:"/browse",
      element:<Browse/>,
      children:[
        {
            path:"card" ,
            element:<Cards/>
        } ,
        {
            path:"complaints" ,
            element:<Complaint/>
        } ,
        {
            path:"notify" ,
            element:<Notification/>
        } ,
        {
            path:"account",
            element:<Account/>
        } ,
       
      ] ,
   } ,
//    {
//     path:"/opt",
//     element:<OPT/>
//    },
   {
    path:"wait" ,
    element:<OTPVerification/>
   } ,
   {
    path:"/success",
    element:<SuccessScreen/>
   } ,
 
])

    return(
        <div>
         <RouterProvider router={Approuter} />
      
        </div>
    )
}

export default Body