'use client';  // Marking this as a Client Component
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';  // Using the custom hook

const CheckoutPage = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);  // State to store all products
    const [isClient, setIsClient] = useState(false);

    // Get user from context using the custom hook
    const { user } = useUser();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);

            const params = new URLSearchParams(window.location.search); // Access query params
            console.log("Received from cart:", params);

            // Parse all product details
            const allProducts = [];
            const ids = params.getAll('id'); // Get all 'id' values from the URL

            for (const id of ids) {
                const name = params.get(`name${id}`); // Get name specific to the current ID
                const price = params.get(`price${id}`); // Get price specific to the current ID
                const quantity = params.get(`quantity${id}`); // Get quantity specific to the current ID
                allProducts.push({ id, name, price, quantity });
            }

            setProducts(allProducts);
            console.log("Parsed products:", allProducts);
        }
    }, []); // Run only once after component mounts

    if (!isClient) {
        return null; // Prevent rendering during SSR
    }

    if (products.length === 0) {
        return <p>Loading or invalid product details!</p>;
    }

    const handleSubmit = async () => {
        try {
            const salesDate = (() => {
                const now = new Date();
                const offset = now.getTimezoneOffset() * 60000;
                const localTime = new Date(now.getTime() - offset);
                return localTime.toISOString().slice(0, 19).replace('T', ' ');
            })();

            const validUserId = user ? user.id : 1;

            // Loop through all products and send them to the server for processing
            for (const product of products) {
                const response = await fetch('http://localhost:3005/sales', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: validUserId,
                        product_id: product.id,
                        sales_date: salesDate,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                    return;
                }
            }

            alert('Purchase confirmed!');
            router.push('/'); // Navigate to a success page
        } catch (error) {
            console.error('Error while processing purchase:', error);
            alert('An error occurred while confirming the purchase.');
        }
    };

    return (
        <div className='h-auto w-auto p-4 bg-purple-100 rounded-md m-[10px] flex flex-col text-black'>
            <h1 className="text-2xl mb-4">Checkout</h1>
            {products.map((product) => (
                <div key={product.id} className="flex flex-col mb-4">
                    <h2 className="text-xl">Name: {product.name}</h2>
                    <p>Price: ৳{product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                </div>
            ))}
            <div className="flex justify-start">
                <button
                    onClick={handleSubmit}
                    className="py-2 px-4 bg-green-500 text-white rounded-md"
                >
                    Confirm Purchase
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
