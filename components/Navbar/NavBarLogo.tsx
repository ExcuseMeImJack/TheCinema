"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function NavBarLogo() {
  const router = useRouter();
  return (
    <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => router.push('/')}>

        {/* Logo */}
        <div className="avatar">
          <div className="w-24">
            <img src="https://i.imgur.com/jAmwGlE.png" />
          </div>
        </div>

        {/* Site Name */}
        <h1 className='text-4xl'>WATCHBOXD</h1>
      </div>
  )
}

export default NavBarLogo
