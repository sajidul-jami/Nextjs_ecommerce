'use client'; // Marking this as a client-side component

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import websitelogo from "@/public/images/websitelogo.jpeg";
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext'; // Import the useUser hook
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Navbar() {
    const { cart } = useCart();
    const { user, logout } = useUser(); // Get the user and logout function from context
    const router = useRouter(); // Instantiate the router

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    // State to control showing user details
    const [showUserDetails, setShowUserDetails] = useState(false);

    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
    };

    const handleProfileRedirect = () => {
        router.push('/user_profile'); // Redirect to the user profile page
        setShowUserDetails(false); // Hide the user details dropdown
    };

    return (
        <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between flex-wrap">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/">
                        <Image src={websitelogo} alt="Website Logo" className="w-40 h-auto" />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex items-center w-full md:w-auto mt-4 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-80 py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 placeholder-gray-500 focus:placeholder-gray-400"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Search
                    </button>
                </div>

                {/* Links and User Section */}
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="#" className="text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition">
                                All Offers
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart" className="text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition">
                                Cart ({cartItemCount})
                            </Link>
                        </li>
                    </ul>

                    {/* User Section */}
                    <div>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserDetails}
                                    className="text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition"
                                >
                                    {user.phone_number || 'User'}
                                </button>

                                {/* Dropdown Menu */}
                                {showUserDetails && (
                                    <div className="absolute top-full right-0 mt-2 bg-white text-black p-4 rounded-md shadow-lg w-48">
                                        <p className="text-sm font-medium">Welcome, {user.phone_number}</p>
                                        <button
                                            onClick={handleProfileRedirect}
                                            className="mt-3 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setShowUserDetails(false);
                                            }}
                                            className="mt-2 w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login_signup/login" className="text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
