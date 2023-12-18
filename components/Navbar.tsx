import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return (
    <div className='static bg-[#212022] w-screen h-[12vh] border-b-4 border-[#DEDEDE] flex justify-between items-center'>
      {/* Logo */}

      {/* Site Name */}

      {/* Sign/Signout OR User Profile */}

      {/* Site Sections */}

      {/* Create Section */}
    </div>
  )
}

export default Navbar
