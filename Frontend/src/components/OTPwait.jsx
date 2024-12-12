import React from "react";
import { useNavigate } from "react-router";

const OTPVerification = () => {

  const confirmnav = useNavigate()

const Confirm = ()=>{

   confirmnav("/success")
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row w-full max-w-4xl">
          {/* Left Content Section */}
          <div className="md:w-1/2 px-6 flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-4">Verification Code</h2>
            <p className="text-gray-500 mb-6">
              We have sent the verification code to your email address
            </p>
            <div className="flex space-x-4 mb-6">
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
            <button
            onClick={Confirm}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Confirm
            </button>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 flex items-center justify-center">
            <img
              src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4687.jpg"
              alt="OTP Illustration"
              className="w-4/5 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
