import React from 'react';
import Image from 'next/image';
import cardimage from '@/public/images/card.jpeg';
import Cards from '@/app/components/cards'
import getAllProducts from '@/app/mysqldb'

export default async function Limitedtimeoffer() {
    const limitedoffers = await getAllProducts();
    //console.log(limitedoffers);
    return (
        <div className='h-auto bg-purple-100 w-auto rounded-md m-[10px] flex flex-col'>
            <h1 className='text-gray-500 m-[10px]'>Limited Time Offers:</h1>
            {/* card */}
            {/* <Cards limitedoffers = {limitedoffers}/> */}
            <div className='flex justify-center flex-wrap pb-[15px]'>
                {limitedoffers.map(limitedoffer => (
                    <div key={limitedoffer.product_id} className='bg-yellow-300 w-[220px] h-[350px] mb-[15px] mx-2 flex-col border border-white rounded-md' >
                        <div className='w-[210px] flex flex-col mx-auto'>
                            <div className='w-[210px] h-[210px] flex mx-auto mt-[5px]'>
                                <img className='rounded-sm w-[210px] h-[210px]' src={`/images/productsimg/${limitedoffer.photo}`} alt = {`/public/images/productsimg/${limitedoffer.photo}`} />
                            </div>
                            <h1 className='text-gray-600 text-sm overflow-hidden w-[210px] h-[45px]'>Name: {limitedoffer.name}</h1>                     
                            <p className='text-gray-600 text-sm'>Price: {limitedoffer.price}<span>৳</span></p>
                            <p className='text-gray-600 text-sm'>Raring: 5<span> Star</span></p>
                            <div className='flex justify-around mt-[5px]'>
                                <button className='px-[5px] py-[3px] bg-blue-400 rounded-sm'>Add to Cart</button>
                                <button className='px-[5px] py-[3px]  bg-blue-400 rounded-sm'>Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>







        </div >
    )
}
