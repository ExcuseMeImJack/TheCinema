import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import getCurrSession from '../lib/session';

async function Navbar() {
  const user = getCurrSession();

  return (
    <div className='static bg-[#212022] w-screen h-[11vh] border-b-4 border-[#DEDEDE] flex justify-between items-center'>
      {/* Logo */}
      <div className="avatar">
        <div className="w-24 rounded">
          <img src="https://i.imgur.com/jAmwGlE.png" />
        </div>
      </div>
      {/* Site Name */}

      {/* Sign/Signout OR User Profile */}

      {/* Site Sections */}

      {/* Create Section */}
    </div>
  )
}

export default Navbar
