import Link from 'next/link'
import React from 'react'
import { SocialIcon } from 'react-social-icons'

function Footer() {
  return (
    <div className='bg-[#212022] w-screen h-[12vh] border-t-4 border-[#DEDEDE] flex justify-evenly items-center'>
      <Link className='flex items-center hover:text-gray-400' href='https://github.com/ExcuseMeImJack' target='_blank' >
        <SocialIcon network='github' bgColor='transparent'/>
        <h1 className='font-HeaderFont font-bold pt-1'>ExcuseMeImJack</h1>
      </Link>
      <Link className='flex items-center hover:text-gray-400' href='https://www.linkedin.com/in/jroybaldev/' target='_blank'>
        <SocialIcon network='linkedin' bgColor='transparent'/>
        <h1 className='font-HeaderFont font-bold pt-1'>Jack Roybal</h1>
      </Link>
    </div>
  )
}

export default Footer
