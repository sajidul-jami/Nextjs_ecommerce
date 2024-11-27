import React from 'react';
import Image from 'next/image';
import Slideimage from '@/public/images/slideberimage01.jpeg';

export default function Categoriesslideber() {
  return (
    <div className='flex items-center'>
      <div className='h-[345px] w-auto rounded-md m-[10px] flex mx-auto'>
        <div className='w-[280px] h-[345px] bg-slate-400 rounded-md'>
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
            <h2 className="text-xl p-1 m-[1px] bg-slate-200 rounded-sm border-solid border-yellow-500 md:text-lg lg:text-lg font-semibold text-gray-800">Category 01</h2>
          </div>
        </div>
        <div>
          <div className='w-[1000px] h-[300px] rounded-md ml-[10px] mb-[5px] bg-yellow-200'>
            <Image src={Slideimage} className='w-[1000px] h-[300px] rounded-lg' />
          </div>
          <div className='flex h-[40px] ml-[10px] bg-orange-700 w-auto rounded-md justify-center items-center'>
            Moving text of your message
          </div>
        </div>
      </div>
    </div>
  )
}
