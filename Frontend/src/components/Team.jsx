import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import hamdanImg from "../assets/hamdanraza.png";
import asadImg from "../assets/asad.png";
import atifImg from "../assets/atif.png";
import majeedImg from "../assets/majeed.png";
import salmanImg from "../assets/salman.png";
import faisalImg from "../assets/faisal.png";
import dummyImg from "../assets/dummy.png";
import aryanImg from "../assets/aryan.png";
import musanifImg from '../assets/musanif.png'

export default function Team() {
    const teamMembers = [
        { name: "Aryan Khan", role: "Frontend and Backend Developer", imageUrl: aryanImg },
        { name: "Hamdan Raza", role: "Frontend and Backend Developer", imageUrl: hamdanImg },
        { name: "Malik Majeed", role: "Frontend and Backend Developer", imageUrl: majeedImg },
        { name: "Muhammad Atif", role: "Frontend Developer", imageUrl: atifImg },
        { name: "Salman Ali", role: "Tester", imageUrl: salmanImg },
        { name: "Laiba Hamid", role: "Web Designer", imageUrl: dummyImg },
        { name: "Emaan Sheeraz", role: "Web Designer", imageUrl: dummyImg },
        { name: "Asad Ullah", role: "Data Analyst", imageUrl: asadImg },
        { name: "Muhammad Musanif", role: "Web Designer", imageUrl: musanifImg },
        { name: "Faisal Hashim", role: "Tester", imageUrl: faisalImg },
    ];

    const itemsPerPage = 6; // Number of team members per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

    // Get members for current page
    const paginatedMembers = teamMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const { ref: teamRef, inView: isTeamVisible } = useInView();
    const [animateHeading, setAnimateHeading] = useState(false);

    useEffect(() => {
        if (isTeamVisible) {
            setAnimateHeading(true);
        }
    }, [isTeamVisible]);

    return (
        <div ref={teamRef} className="py-10 bg-gray-100">
            {/* Heading Section */}
            <div className={`text-center mb-10 transition-opacity duration-700 ${animateHeading ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-500 h-1 w-12 mx-1"></div>
                    <div className="bg-blue-500 h-1 w-1 mx-1"></div>
                    <p className="text-lg font-semibold text-gray-600"> MY TEAM</p>
                </div>
                <h1 className="text-4xl font-bold text-gray-800">Expert Team Members</h1>
            </div>

            {/* Team Members Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5 mx-auto">
                {paginatedMembers.map((member, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
                    >
                        <img
                            src={member.imageUrl}
                            alt={`${member.name}'s profile`}
                            className="w-40 h-40 rounded-full object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h2>
                        <h3 className="text-gray-600 mb-4">{member.role}</h3>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`px-4 py-2 mx-1 rounded flex items-center ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`px-4 py-2 mx-1 rounded flex items-center ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
            </div>
        </div>
    );
}
