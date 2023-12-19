"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SocialIcon } from 'react-social-icons'

function Footer() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    isClient && (
    <div className='bg-[#212022] w-screen h-[11vh] border-t-4 border-[#DEDEDE] flex justify-evenly items-center'>
      <Link className='flex items-center hover:text-gray-400' href='https://github.com/ExcuseMeImJack' target='_blank' >
        <SocialIcon as='div' network='github' bgColor='transparent'/>
        <h1 className='font-HeaderFont font-bold pt-1'>ExcuseMeImJack</h1>
      </Link>
      <Link className='flex items-center hover:text-gray-400' href='https://www.linkedin.com/in/jroybaldev/' target='_blank'>
        <SocialIcon as='div' network='linkedin' bgColor='transparent'/>
        <h1 className='font-HeaderFont font-bold pt-1'>Jack Roybal</h1>
      </Link>
    </div>)
  )
}

export default Footer
