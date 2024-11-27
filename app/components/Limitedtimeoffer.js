'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import getAllProducts from '@/app/lib/mysqldb';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';  // Use the router for redirecting

export default function Limitedtimeoffer() {
    const [limitedoffers, setLimitedoffers] = useState([]);
    const { addToCart } = useCart();
    const { user } = useUser();  // Get user from context
    const router = useRouter();  // Access router to navigate

    useEffect(() => {
        // Fetch data on the client side
        const fetchLimitedOffers = async () => {
            const offers = await getAllProducts();
            setLimitedoffers(offers);
        };

        fetchLimitedOffers();
    }, []);

    const handleBuyNow = (limitedoffer) => {
        if (!user) {
            alert("You need to be logged in to make a purchase!");
            router.push("/login_signup/login");  // Redirect to the login page
        } else {
            router.replace(
                `/checkout?id=${encodeURIComponent(limitedoffer.id)}&name=${encodeURIComponent(limitedoffer.name)}&price=${encodeURIComponent(limitedoffer.price)}`
            );
        }
    };

    const handleAddToCart = (limitedoffer) => {
        addToCart(limitedoffer); // Add the product to the cart

        // Show pop-up alert for 1 second
        const alertTimeout = setTimeout(() => {
            window.alert('Product added to cart!');
        }, 0); // Display immediately
        setTimeout(() => {
            clearTimeout(alertTimeout); // Clear timeout after 1 second
        }, 1000); // 1-second delay
    };

    return (
        <div className='h-auto bg-purple-100 w-auto rounded-md m-[10px] flex flex-col'>
            <h1 className='text-gray-500 m-[10px]'>Limited Time Offers:</h1>
            <div className='flex justify-center flex-wrap pb-[15px]'>
                {limitedoffers.map((limitedoffer) => (
                    <div
                        key={limitedoffer.id}
                        className='bg-yellow-300 w-[220px] h-[350px] mb-[15px] mx-2 flex-col border border-white rounded-md'
                    >
                        <div className='w-[210px] flex flex-col mx-auto'>
                            <Link href={`/singleproduct/${limitedoffer.id}`}>
                                <div className='w-[210px] h-[210px] flex mx-auto mt-[5px]'>
                                    <Image
                                        className='rounded-sm w-[210px] h-[210px]'
                                        src={`/images/productsimg/${limitedoffer.photo}`}
                                        alt={limitedoffer.name || 'Product Image'}
                                        width={210}
                                        height={210}
                                    />
                                </div>
                            </Link>

                            <Link href={`/singleproduct/${limitedoffer.id}`}>

                                <h1 className='text-gray-600 text-sm overflow-hidden w-[210px] h-[45px]'>
                                    Name: {limitedoffer.name}
                                </h1>
                                <p className='text-gray-600 text-sm'>
                                    Price: {limitedoffer.price}
                                    <span>৳</span>
                                </p>
                                <p className='text-gray-600 text-sm'>
                                    Rating: 5 <span>Star</span>
                                </p>
                            </Link>

                            <div className='flex justify-around mt-[5px]'>
                                <button
                                    className='px-[5px] py-[3px] bg-blue-400 rounded-sm'
                                    onClick={() => handleAddToCart(limitedoffer)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handleBuyNow(limitedoffer)}
                                    className='px-[5px] py-[3px] bg-blue-400 rounded-sm'
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
