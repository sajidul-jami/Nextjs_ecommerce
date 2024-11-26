'use client';  // Marking this as a Client Component
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';  // Using the custom hook

const CheckoutPage = () => {
    const router = useRouter();
    const [productDetails, setProductDetails] = useState(null);  // State to store product details
    const [isClient, setIsClient] = useState(false);  // State to track if it's on the client-side

    // Get user from context using the custom hook
    const { user } = useUser();  // Correct way to use the custom hook

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);

            const params = new URLSearchParams(window.location.search);  // Access query params directly
            const id = params.get('id');
            const name = params.get('name');
            const price = params.get('price');

            if (id && name && price) {
                setProductDetails({
                    id: String(id),
                    name: String(name),
                    price: String(price),
                });
            }
        }
    }, []);  // Run only once after component mounts

    // If it's not on the client-side, return null or a loading state
    if (!isClient) {
        return null;
    }

    if (!productDetails) {
        return <p>Loading or invalid product details!</p>;
    }

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const salesDate = (() => {
                const now = new Date();
                const offset = now.getTimezoneOffset() * 60000;  // Offset in milliseconds
                const localTime = new Date(now.getTime() - offset);
                return localTime.toISOString().slice(0, 19).replace('T', ' ');  // Format date
            })();

            // Ensure user ID is valid, fallback to 1 if not available
            const validUserId = user ? user.id : 1;

            const response = await fetch('http://localhost:3005/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: validUserId,
                    product_id: productDetails.id,
                    sales_date: salesDate,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Purchase confirmed! Sale ID: ${result.saleId}`);
                router.push('/');  // Navigate to a success page
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error while processing purchase:', error);
            alert('An error occurred while confirming the purchase.');
        }
    };

    return (
        <div className='h-auto w-auto p-4 bg-purple-100 rounded-md m-[10px] flex flex-col text-black'>
            <h1 className="text-2xl mb-4">Checkout</h1>
            <div className='flex'>
                <div className='flex-col'>
                    <h2 className='text-xl'>{productDetails.name}</h2>
                    <p>Price: ৳{productDetails.price}</p>
                    <div className="flex justify-start">
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-4 bg-green-500 text-white rounded-md"
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
