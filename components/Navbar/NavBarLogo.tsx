"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function NavBarLogo() {
  const router = useRouter();
  return (
    <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => router.push('/')}>

        {/* Logo */}
        <div className="avatar">
          <div className="xl:w-24 lg:w-20 m:w-16 sm:w-14">
            <img src="https://i.imgur.com/jAmwGlE.png" />
          </div>
        </div>

        {/* Site Name */}
        <h1 className='xl:text-4xl lg:text-3xl m:text-2xl sm:text-xl font-HeaderFont'>WATCHBOXD</h1>
      </div>
  )
}

export default NavBarLogo
