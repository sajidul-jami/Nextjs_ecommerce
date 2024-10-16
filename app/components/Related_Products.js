import React from 'react';
import Image from 'next/image';
import cardimage from '@/public/images/card.jpeg';
import Cards from '@/app/components/cards'

export default function Limitedtimeoffer() {
    return (
        <div className='h-auto bg-purple-100 w-auto rounded-md m-[10px] flex flex-col'>
            <h1 className='text-gray-500 m-[10px]'>Related Products:</h1>
            {/* card */}
            <Cards />
        </div>
    )
}
