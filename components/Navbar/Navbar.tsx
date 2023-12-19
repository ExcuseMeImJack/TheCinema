import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import getCurrSession from '../../lib/session';
import SignIn from '../Auth/SignIn';
import CreateAccount from '../Auth/CreateAccount';
import UserProfileDropdown from './UserProfileDropdown';
import NavCreate from './NavCreate';

async function Navbar() {
  const user = await getCurrSession();

  return (
    <div className='static bg-[#212022] w-screen h-[11vh] border-b-4 border-[#DEDEDE] flex justify-evenly items-center font-HeaderFont font-bold text-lg'>
      <div className='flex items-center gap-2'>

        {/* Logo */}
        <div className="avatar">
          <div className="w-24">
            <img src="https://i.imgur.com/jAmwGlE.png" />
          </div>
        </div>

        {/* Site Name */}
        <h1 className='text-4xl'>WATCHBOXD</h1>
      </div>

      {/* Sign/Signout OR User Profile */}
      {!user ? (
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
      {user &&
        <NavCreate />
      }
    </div>
  )
}

export default Navbar
