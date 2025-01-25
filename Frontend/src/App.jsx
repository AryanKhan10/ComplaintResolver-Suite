import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/Login';
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

const App = () => {
  // Setting up routes using createBrowserRouter
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
  ]);

  return (
    <>
      <Navbar />
      {/* Add the RouterProvider here */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
