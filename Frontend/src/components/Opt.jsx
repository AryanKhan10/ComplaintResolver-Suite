import React from "react";
import { useNavigate } from "react-router";


const OPT = () => {

 
     const Navigate = useNavigate()
     

    const Submit = ()=>{
    

  
        
            Navigate("/wait")
        
     
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Content Section */}
        <div className="w-full md:w-1/2 px-6">
          <h1 className="text-2xl font-bold mb-4 text-left">OTP Verification</h1>
          <p className="text-gray-500 text-left mb-8">
            Enter email and phone number to send one-time password
          </p>
          <form onSubmit={(e)=>e.preventDefault()} className="space-y-6">
            <div>
              <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
              required
                type="email"
               
                placeholder="johndoe@gmail.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
             
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+92 9999999999"
                className="mt-1 block w-full px-4 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button 
              type="submit"
              onClick={Submit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://th.bing.com/th/id/OIP.8UG1MsVBTJwdgGaJ75wVagHaGW?w=525&h=450&rs=1&pid=ImgDetMain"
            alt="OTP Verification Illustration"
            className="w-4/5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default OPT;

