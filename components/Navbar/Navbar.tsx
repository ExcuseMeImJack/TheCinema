'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SignIn from '../Auth/SignIn';
import CreateAccount from '../Auth/CreateAccount';
import UserProfileDropdown from './UserProfileDropdown';
import NavCreate from './NavCreate';
import NavBarLogo from './NavBarLogo';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Loading from '../Loading';

function Navbar() {
  const { data: session, status } = useSession();

  if(status === "loading") return <Loading loader={1}/>


  return (
    <div className='static bg-[#212022] w-screen h-[11vh] border-b-4 border-[#DEDEDE] flex justify-evenly items-center font-HeaderFont font-bold text-lg'>
      <NavBarLogo/>

      {/* Sign/Signout OR User Profile */}
      {status === "unauthenticated" ? (
        <>
          <SignIn/>
          <CreateAccount />
        </>
      ) : (
        status === "authenticated" &&  <UserProfileDropdown/>
      )}

      {/* Site Sections */}
      <Link className='hover:text-gray-400 xl:text-2xl lg:text-xl m:text-md sm:text-sm' href="/films">FILMS</Link>
      <Link className='hover:text-gray-400 xl:text-2xl lg:text-xl m:text-md sm:text-sm' href="/shows">SHOWS</Link>
      <Link className='hover:text-gray-400 xl:text-2xl lg:text-xl m:text-md sm:text-sm' href="/lists">LISTS</Link>
      <Link className='hover:text-gray-400 xl:text-2xl lg:text-xl m:text-md sm:text-sm' href="/members">MEMBERS</Link>

      {/* Create Section */}
      {status === "authenticated" &&
        <NavCreate />
      }

    </div>
  )
}

export default Navbar
