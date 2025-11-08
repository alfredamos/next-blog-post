"use client"
import { useState } from 'react';
import {logoutUser} from "@/app/actions/auth.action"; // For mobile menu state

type Props = {
    isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated}:Props) => {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state

    const logout = () => {
        logoutUser().then((user) => {});
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                    {/*Logo*/}
                    <div className="flex items-center">
                        <a href="#" className="flex items-center py-4 px-2 text-white hover:text-gray-900 text-lg font-semibold">
                            Blog
                        </a>
                    </div>

                    {/*Primary Navbar items (Desktop)*/}
                    <div className="hidden md:flex items-center space-x-1 flex justify-between items-center gap-2">
                        <a href="#" className="py-4 px-2 dark:text-white text-gray-500 font-semibold hover:text-gray-900">Home</a>
                        <a href="#" className="py-4 px-2 dark:text-white text-gray-500 font-semibold hover:text-gray-900">About</a>
                        <a href="#" className="py-4 px-2 dark:text-white text-gray-500 font-semibold hover:text-gray-900">Contact</a>
                    </div>

                    {/*Secondary Navbar items (Desktop)*/}
                    <div className="md:flex items-center space-x-3">
                        <a href="#" className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">Sign Up</a>
                        <a href="#" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Login</a>
                        {/*Use this for logout if user is logged in*/}
                        <a href="#" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Logout</a>
                    </div>

                    {/*Mobile Menu Button*/}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none menu-button" id="menu-button">
                            {/*<svg className="w-6 h-6 text-gray-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*    <path d="M4 6h16M4 12h16M4 18h16"></path>*/}
                            {/*</svg>*/}
                        </button>
                    </div>
                </div>
            </div>

            {/*Mobile Menu (Hidden by default)*/}
            <div className="hidden mobile-menu" id="mobile-menu">
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">About</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Sign Up</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Login</a>

                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Logout</a>
            </div>
        </nav>
    );
};

export default Navbar;