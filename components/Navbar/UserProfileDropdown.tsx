'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

function UserProfileDropdown() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="">
        <div className="avatar rounded-full">
          <div className="w-8">
            <img src={session?.user?.profilePicUrl} />
          </div>
        </div>
        {session?.user?.username}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><div onClick={() => signOut()}>Sign Out</div></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
  )
}

export default UserProfileDropdown
