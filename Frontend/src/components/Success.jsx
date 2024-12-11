import React from "react";
import { useNavigate } from "react-router";

const SuccessScreen = () => {

    const Dashuse = useNavigate()

    const Dashborad = ()=>{
    
        Dashuse("/browse/card")

    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Reflex<span className="text-blue-500">CMS</span></h1>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">
          Congratulations! You have been successfully authenticated.
        </p>
        <button 
        onClick={Dashborad}
        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
