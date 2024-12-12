import { useRef, useState } from "react";
import Validate from "../utils/validate";
import { useNavigate } from "react-router";


const LoginForm = () => {

   const nav = useNavigate()
  // Create state for toggling between forms
  const [isSignIn, setSignIn] = useState(true);
  const [Iserror , setiserror] = useState(null)
  const email = useRef()
  const password = useRef()
  const name = useRef()

  // Handle form toggle
  const handleToggle = () => {
    setSignIn(!isSignIn);

  };

  const Handleform = ()=>{
    const Message =    Validate(email?.current?.value , password?.current?.value  , name?.current?.value )
     console.log(email?.current?.value);
     console.log(password?.current?.value);
     console.log(Message);

    setiserror(Message)

    if (!Message) {
        nav("/browse/card");
      }
     
      if(!isSignIn){
     const check =    Validate(email?.current?.value , password?.current?.value  , name?.current?.value )
      setiserror(check)
     if(!check){
        nav("/opt")
     }

      
      }
 
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      {isSignIn ? (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          {/* Login Form */}
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Reflex<span className="text-blue-500">CMS</span>
          </h1>
          <form onSubmit={(e)=> e.preventDefault()}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
              
                ref={email}
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={password}
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
               <p className="text-red-400 px-4 font-bold">{Iserror}</p>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm text-blue-500 mb-4">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              onClick={Handleform}
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Sign in
            </button>

            {/* Toggle to Register */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </form>
        </div>
       
      )  : (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
          {/* Registration Form */}
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Reflex<span className="text-blue-500">CMS</span>
          </h1>
          <form onSubmit={(e)=> e.preventDefault()}>
            {/* Full Name and CNIC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  ref={name}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cnic"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  CNIC
                </label>
                <input
                  type="text"
                  id="cnic"
                  name="cnic"
                  placeholder="Enter your CNIC"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                ref={email}
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  ref={password}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  ref={password}
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Hint */}
            <p className="text-sm text-gray-500 mb-4">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>
            <p className="text-red-400 px-4 font-bold">{Iserror}</p>

            {/* Register Button */}
            <button
              type="submit" onClick={Handleform}
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>

            {/* Toggle to Sign In */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
