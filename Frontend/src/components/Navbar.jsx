import  { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "About", href: "/about", current: false },
];

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { token } = useContext(AppContext)

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    const handleLogin = () => {
        // Example: Redirect to login page
        window.location.href = "/login";
    };

    const renderNavLinks = (isMobile = false) => {
        return navigation.map((item) => (
            <a
                key={item.name}
                href={item.href}
                className={classNames(
                    item.current
                        ? "bg-gray-900 text-white"
                        : "font-bold text-gray-300 hover:bg-gray-700 hover:text-white",
                    isMobile ? "block px-3 py-2 text-base" : "px-3 py-2 text-xl",
                    "rounded-md transition duration-300"
                )}
                aria-current={item.current ? "page" : undefined}
            >
                {item.name}
            </a>
        ));
    };

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`block h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Logo and Navigation Links */}
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex-shrink-0">
                            <h2 className="font-bold text-white text-4xl">
                                Reflex<span className="text-blue-600">CMS</span>
                            </h2>
                        </div>

                        {/* Desktop Navigation Links + Login/Logout */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {renderNavLinks()}
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-transparent hover:border-2 transition duration-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-transparent hover:border-2 transition duration-300"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {renderNavLinks(true)}
                    </div>
                    <div className="px-4 pt-2">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-transparent hover:border-2 transition duration-300"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-transparent hover:border-2 transition duration-300"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
