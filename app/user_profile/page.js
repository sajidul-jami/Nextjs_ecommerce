'use client'; // Marking this as a Client Component
import React from 'react';
import { useUser } from '../context/UserContext'; // Import the useUser hook
import { useRouter } from 'next/navigation'; // For redirecting after logout

export default function UserProfile() {
    const { user, logout } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login_signup/login'); // Redirect to login page after logout
    };

    if (!user) {
        return <p>You need to be logged in to view this page.</p>;
    }

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-purple-600">User Profile</h1> {/* Changed the color of the title */}
            <p>
                <strong className="text-red-500 ml-2">Name:</strong>
                <span className="text-red-500 ml-2">{user.phone_number}</span> {/* Ensure phone number color is applied */}
            </p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
            >
                Logout
            </button>
        </div>
    );
}
