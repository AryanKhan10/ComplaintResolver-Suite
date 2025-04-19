import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';
import LoginForm from './components/Login';
import Chatbot from "./components/chatbot/chatbot";
import ChatbotIcon from "./components/chatbot/chatButton";
import Browse from './components/Browse';
import OTPVerification from './components/OTPwait';
import SuccessScreen from './components/Success';
import Cards from './components/Cards';
import Complaint from './components/Complaints';
import Notification from './components/Notification';
import Account from './components/Account';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/ABout';
import Admin from './components/Admin'; // Admin panel component
import AdminPanel from './components/AdminPanel'; // Admin panel component
import User from './components/User'
const App = () => {
  const [showBot, setShowBot] = useState(false);
  const { role } = useContext(AppContext); // Access the user from context
  console.log(role)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/browse",
      element: <Browse />,
      children: [
        { path: "card", element: <Cards /> },
        { path: "complaints", element: <Complaint /> },
        { path: "notify", element: <Notification /> },
        { path: "account", element: <Account /> },
      ],
    },
    {
      path: "/wait",
      element: <OTPVerification />,
    },
    {
      path: "/success",
      element: <SuccessScreen />,
    },
    {
      path: "/admin",
      element: role === "Admin" ? <Admin /> : <Navigate to="/login" replace />,
      children: role === "Admin" && [
        { path: "panel", element: <AdminPanel /> },
        { path: "user", element: <User /> },
        { path: "account", element: <Account /> },
      ],
    },

  ]);

  return (
    <>
   
      <Navbar />
      {!showBot && (
        <button className="bot-button" onClick={() => setShowBot(true)}>
          <ChatbotIcon />
        </button>
      )}

      {/* Chatbot */}
      {showBot && (
        <Chatbot closeBot={() => setShowBot(false)} />
      )}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
