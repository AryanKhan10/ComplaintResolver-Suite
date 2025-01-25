import React from 'react';
import { useNavigate } from 'react-router-dom';
import Content from './Content'
import Footer from './Footer';
import Team from './Team';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white">
                {/* Main Content */}
                <div className="flex flex-col items-center justify-center flex-grow">
                    {/* Title Section */}
                    <div className="mb-4 text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            Reflex<span className="text-blue-600">CMS</span>
                        </h1>
                    </div>

                    {/* Subtitle Section */}
                    <div className="mb-6 text-center">
                        <h3 className="text-xl font-medium italic text-gray-300">
                            Fast, Flexible, Flawless
                        </h3>
                    </div>

                    {/* Button Section */}
                    <div>
                        <button
                            onClick={handleClick}
                            className="px-6 py-3 text-lg font-semibold text-blue-600 border-2 border-blue-600 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            GET STARTED
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Content />
            </div>
            <div>
                <Team />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
