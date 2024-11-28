'use client';  // Marking this as a Client Component
import React, { useEffect, useState } from 'react';
import Related_Products from '../../components/Related_Products';
import getSingleProducts from '@/app/lib/mysqldb_single';
import Image from 'next/image';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/navigation';  // Use the router for redirecting
import { useCart } from '../../context/CartContext';


export default function Page({ params }) {
    const { id } = params;
    const [singleProduct, setSingleProduct] = useState(null); // State for product details
    const { user } = useUser();  // Get user from context
    const router = useRouter();  // Access router to navigate
    const { addToCart } = useCart();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getSingleProducts(id);
                console.log("Product fetched:", product);  // Debugging line
                setSingleProduct(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!singleProduct) {
        return <p>Product not found</p>;
    }

    // Function to handle "Buy Now" action

    const handleBuyNow = (limitedoffer) => {
        if (!user) {
            alert("You need to be logged in to make a purchase!");
            router.push("/login_signup/login");  // Redirect to the login page
        } else {
            // Wrap the limitedoffer in an array and add a default quantity of 1
            const selectedProducts = [{ ...singleProduct, quantity: 1 }];
            router.push(`/checkout?products=${encodeURIComponent(JSON.stringify(selectedProducts))}`);
        }
    };



    return (
        <div className='h-auto w-auto p-2 bg-purple-100 rounded-md m-[10px] flex flex-col text-black'>
            <div className='flex'>
                <div className='m-[10px] flex border-r-2 border-slate-950'>
                    <div className='flex-col'>
                        <Image
                            className='w-80 h-80'
                            src={`/images/productsimg/${singleProduct.photo}`}
                            alt={`Image of ${singleProduct.name}`}
                            width={320}
                            height={320}
                        />
                        <p>More images</p>
                    </div>
                    <div className='flex flex-col ml-[15px] mt-[15px] w-[500px] h-auto'>
                        <h1 className='h-[60px] text-xl'>{singleProduct.name}</h1>
                        <p>5 Star Rating <span>|</span> 90 Answered Questions</p>
                        <p>Brand: No Brand</p>
                        <h2 className='my-[15px] text-xl'>৳<span>{singleProduct.price}</span></h2>
                        <h2 className='mb-[15px] text-xl'>Color: <span>Color Options</span></h2>
                        <h2 className='mb-[15px] text-xl'>Quantity: <span>{singleProduct.quantity}</span></h2>
                        <div className='flex justify-evenly'>
                        <button
                                    className='my-[10px] w-48 py-[10px] bg-red-800 text-white rounded-sm'
                                    onClick={() => {
                                        addToCart(singleProduct);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            <button
                                onClick={handleBuyNow}
                                className='my-[10px] w-48 py-[10px] bg-red-800 text-white rounded-sm'
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='justify-start w-full mt-4'>
                <h1>Product Description:</h1>
                <p>{singleProduct.description}</p>
            </div>

            <div className='mt-4'>
                <Related_Products />
            </div>
        </div>
    );
}
