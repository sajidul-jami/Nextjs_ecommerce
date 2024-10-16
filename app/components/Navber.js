import React from 'react';
import Link from "next/link";
import Image from "next/image";
import websitelogo from "@/public/images/websitelogo.jpeg";




export default function Navber() {
    return (
        <nav className="flex bg-purple-100 text-white p-4 justify-between items-center">
            <div>
                <Link href="/">
                    <Image src={websitelogo} alt="website logo of techtrandsbd.com" className="w-40"></Image>
                </Link>
            </div>

            <div className="flex items-center mx-auto">
                <input type="text" placeholder="Search" className=" w-80 py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 placeholder-gray-500 focus:placeholder-gray-400" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-300">Search</button>
            </div>

            <div>
                <ul className="flex">
                    <li><Link href="#" className="text-white p-2 mx-2 bg-gray-600 rounded-md">All Offers</Link></li>
                    <li><Link href="/cart" className="text-white p-2 mx-2 bg-gray-600 rounded-md">Cart With Money Indication</Link></li>
                    <li><Link href="#" className="text-white p-2 mx-2 bg-gray-600 rounded-md">Login Logo</Link></li>
                </ul>
            </div>
        </nav>
    )
}
