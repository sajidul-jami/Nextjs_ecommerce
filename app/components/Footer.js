import React from 'react'

export default function Footer() {
    return (
        <div className='flex flex-col bg-gray-700 p-3'> {/* Footer */}
            <div className='flex justify-between w-full'>
                <div className='flex w-full'>
                    <div className='m-10'>
                        <h1>Help</h1>
                        <p>Contact Us</p>
                        <p>FQA</p>
                    </div>
                    <div className='m-10'>
                        <h1>About</h1>
                        <p>Our Story</p>
                        <p>Press</p>
                        <p>Careers</p>
                    </div>
                </div>
                <div className='flex flex-col m-auto'>
                    <div className='flex m-2'>
                    <input type="text" placeholder="Your Email Address" className="py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 placeholder-gray-500 focus:placeholder-gray-400" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-300">Subscribe</button>
                    </div>
                    <div className='flex m-5'>
                        Social Media Logos
                    </div>
                </div>
            </div>
            <div className='flex justify-between w-full p-5'>
                <h1>&copy; 2024 TechTrendsbd.com</h1>
                <div className='flex'>
                    <p className='mr-5'>Terms of Service</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}
