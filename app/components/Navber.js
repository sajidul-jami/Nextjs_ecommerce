'use client'; // Marking this as a client-side component

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import websitelogo from "@/public/images/websitelogo.jpeg";
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext'; // Import the useUser hook

export default function Navber() {
    const { cart } = useCart();
    const { user, logout } = useUser(); // Get the user and logout function from context

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    // State to control showing user details
    const [showUserDetails, setShowUserDetails] = useState(false);

    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
    };

    return (
        <nav className="flex bg-purple-100 text-white p-4 justify-between items-center">
            <div>
                <Link href="/">
                    <Image src={websitelogo} alt="website logo of techtrandsbd.com" className="w-40" />
                </Link>
            </div>

            <div className="flex items-center mx-auto">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-80 py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 placeholder-gray-500 focus:placeholder-gray-400"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Search
                </button>
            </div>

            <div>
                <ul className="flex">
                    <li>
                        <Link href="#" className="text-white p-2 mx-2 bg-gray-600 rounded-md">All Offers</Link>
                    </li>
                    <li>
                        <Link href="/cart" className="text-white p-2 mx-2 bg-gray-600 rounded-md">
                            Cart ({cartItemCount})
                        </Link>
                    </li>

                    {/* Conditionally render the login/logout text */}
                    <li>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserDetails}
                                    className="text-white p-2 mx-2 bg-gray-600 rounded-md"
                                >
                                    Logged In
                                </button>

                                {/* User details dropdown */}
                                {showUserDetails && (
                                    <div className="absolute top-12 right-0 bg-white text-black p-4 rounded-md shadow-lg w-48">
                                        <p><strong>Name:</strong> {user.phone_number}</p>
                                        <button
                                            onClick={() => {
                                                logout();  // Calls logout function
                                                setShowUserDetails(false);  // Hide the user details dropdown
                                            }}
                                            className="mt-2 w-full bg-red-500 text-white py-1 rounded-md"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login_signup/login" className="text-white p-2 mx-2 bg-gray-600 rounded-md">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
