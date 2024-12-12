import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import API from "../../api/api";
import toast from "react-hot-toast";

const OTPVerification = () => {
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]); // Ref array to manage input focus
  const location = useLocation();
  const confirmnav = useNavigate();
  const email = location.state?.email;
  const firstName = location.state?.firstName;
  const lastName = location.state?.lastName;
  const password = location.state?.password;
  const confirmPassword = location.state?.confirmPassword;
  const accountType = location.state?.accountType;
  const address = location.state?.address;
  console.log(
    email,
    firstName,
    lastName,
    accountType,
    password,
    confirmPassword,
    address
  );
  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value; // Update the value at the specific index
    setInputValues(newValues); // Set the updated values into the state

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !inputValues[index] && index > 0) {
      // Move focus to the previous input on Backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };
  const Confirm = async () => {
    const otp = inputValues.join("");
    try {
      await API.post(
        "/user/signup",
        {
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
          accountType,
          address,
          otp,
        },
        
      );
      toast.success("Verified!")
      confirmnav("/success");
    } catch (error) {
      console.log(error);
      alert("Invalid OTP or signup error");
    }

  };

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
              {inputValues.map((value, index) => (
                <input
                  key={index}
                  type="tel"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)} // Update state on input change
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)} // Assign ref to inputs
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              ))}
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
