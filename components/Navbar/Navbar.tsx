import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SignIn from '../Auth/SignIn';
import CreateAccount from '../Auth/CreateAccount';
import UserProfileDropdown from './UserProfileDropdown';
import NavCreate from './NavCreate';
import NavBarLogo from './NavBarLogo';
import { getSession, useSession } from 'next-auth/react';

async function Navbar() {

  const {data: session} = useSession();

  return (
    <div className='static bg-[#212022] w-screen h-[11vh] border-b-4 border-[#DEDEDE] flex justify-evenly items-center font-HeaderFont font-bold text-lg'>

      <NavBarLogo/>

      {/* Sign/Signout OR User Profile */}
      {!session ? (
        <>
          <SignIn />
          <CreateAccount />
        </>
      ) : (
        <UserProfileDropdown />
      )}

      {/* Site Sections */}
      <Link className='hover:text-gray-400' href="/films">FILMS</Link>
      <Link className='hover:text-gray-400' href="/shows">SHOWS</Link>
      <Link className='hover:text-gray-400' href="/lists">LISTS</Link>
      <Link className='hover:text-gray-400' href="/members">MEMBERS</Link>

      {/* Create Section */}
      {session &&
        <NavCreate />
      }
    </div>
  )
}

export default Navbar
