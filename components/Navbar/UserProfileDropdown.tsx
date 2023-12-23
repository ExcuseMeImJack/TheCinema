import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import { BarLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UserProfileDropdown() {
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/users/getCurrUser');
          if (res.ok) {
            const loggedInUser = await res.json();
            setUser(loggedInUser);
          } else {
            console.error('Failed to fetch user data:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data', error)
        }
      }
    }

    getUser();
  }, [status])

  if (status === 'loading' || !user || !session) return <Loading loader={2} />;

  const currUser = Object.values(user)[0];
  const { username, profile_pic_url } = currUser;

  if (!currUser || !username || !profile_pic_url) return <Loading loader={2} />;

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="flex items-center gap-2 hover:text-gray-400" >
        <div className="avatar rounded-full">
          <div className="w-6">
            <img src={profile_pic_url} alt='' />
          </div>
        </div>
        {username.toUpperCase()}
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" dataSlot="icon" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#212022] rounded-box w-48 mt-2 border-2 border-[#DEDEDE]">
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/profile/watchlist">Watchlist</Link></li>
        <li><Link href="/profile/lists">Lists</Link></li>
        <li><Link href="/profile/friends">Friends</Link></li>
        <li><div onClick={() => {
          signOut();
          router.refresh();
          router.push('/');
        }}>Sign Out</div></li>
      </ul>
    </div>
  )
}

export default UserProfileDropdown
