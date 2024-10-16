import React from 'react';
import Image from 'next/image';
import Product from '@/public/images/card.jpeg';
import Related_Products from '../components/Related_Products';

export default function page() {
    return (
        <div className='h-auto w-auto p-2 bg-purple-100 rounded-md m-[10px] flex flex-col  text-black'>
            <div className='flex'>
                {/* left side */}
                <div className='m-[10px] flex border-r-2 border-slate-950'>
                    <div className='flex-col'>
                        <Image className='w-80 h-80' src={Product} />
                        More images
                    </div>
                    <div className='flex flex-col ml-[15px] mt-[15px] w-[500px] h-auto'>
                        <h1 className='h-[60px] text-xl'>Name of the selected Product</h1>
                        <p>5 Star Rating <span>|</span> 90 Answered Question</p>
                        <p>Brand: No Brand</p>
                        <h2 className='my-[15px] text-xl'>৳<span>429</span></h2>
                        <h2 className='mb-[15px] text-xl'>Color:<span> Color Options</span></h2>
                        <h2 className='mb-[15px] text-xl'>Quantity:<span>429</span></h2>
                        <div className='flex justify-evenly'>
                            <button className='my-[10px]  w-48 py-[10px] bg-red-800 rounded-sm'>Buy Now</button>
                            <button className='my-[10px] w-48 py-[10px] bg-red-800 rounded-sm'>Add to Cart</button>
                        </div>
                    </div>
                </div>
                {/* delivery side */}
                <div>
                    <h1>Delivery Side</h1>
                </div>
            </div>

            <div className='flex justify-start w-full'>
                <h1>Product description:</h1>
                <p> lorem24</p>
            </div>
            <div className='justify-start w-full'>
                <h1>Ratings & Reviews:</h1>
            </div>
            <div>
                <Related_Products />
            </div>
            
        </div>
    )
}
