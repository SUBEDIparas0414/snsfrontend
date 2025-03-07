import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full border-b-2 border-slate-600/30 bg-[#A8A3E6] shadow-md z-50'>
      <div className='w-11/12 mx-auto flex justify-between items-center py-4'>
        <div className='flex items-center space-x-4'>
          <Image src='/snslogo.png' width={100} height={100} alt='logo' />
        </div>
        <div className='flex space-x-20 py-7 text-blue-900 font-bold'>
          <p>Home</p>
          <p>Service</p>
          <p>Privacy Policy</p>
          <p>News</p>
          <p>Contact Us</p>
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
