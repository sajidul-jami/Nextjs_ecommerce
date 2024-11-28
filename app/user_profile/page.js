'use client'; // Marking this as a Client Component
import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; // Import the useUser hook
import { useRouter } from 'next/navigation'; // For redirecting after logout

export default function UserProfile() {
    const { user, logout, updateUser } = useUser(); // Assuming `updateUser` updates user information in context
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false); // Track if the user is in edit mode
    const [formData, setFormData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        phone_number: user?.phone_number || '',
        location: user?.location || '',
    });
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login_signup/login'); // Redirect to login page after logout
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3005/update-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) {
                alert(`Error: ${result.error}`);
                return;
            }

            alert('User profile updated successfully!');
            updateUser(formData); // Update user data in context
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert('An error occurred while updating the profile.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <p>You need to be logged in to view this page.</p>;
    }

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-purple-600">User Profile</h1>

            <div className="mb-4">
                <strong className="block text-red-500">Name:</strong>
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md text-black"
                    />
                ) : (
                    <p className="text-gray-700">{user.name}</p>
                )}
            </div>

            <div className="mb-4">
                <strong className="block text-red-500">Phone Number:</strong>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md text-black"
                    />
                ) : (
                    <p className="text-gray-700">{user.phone_number}</p>
                )}
            </div>

            <div className="mb-4">
                <strong className="block text-red-500">Location:</strong>
                {isEditing ? (
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md text-black"
                    />
                ) : (
                    <p className="text-gray-700">{user.location}</p>
                )}
            </div>

            <div className="mb-6">
                <strong className="block text-red-500">Orders:</strong>
                {user.orders && user.orders.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                        {user.orders.map((order, index) => (
                            <li key={index}>{order}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No orders yet.</p>
                )}
            </div>

            {isEditing ? (
                <div className="flex gap-2">
                    <button
                        onClick={handleSaveChanges}
                        disabled={loading}
                        className="bg-green-500 text-white py-2 px-4 rounded-md"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        onClick={handleEditToggle}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleEditToggle}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Edit Profile
                </button>
            )}

            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
            >
                Logout
            </button>
        </div>
    );
}
