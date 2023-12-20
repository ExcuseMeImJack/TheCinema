import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading';

function UserProfileDropdown() {
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

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

  if (status === 'loading' || !user || !session) return <Loading/>;

  const currUser = Object.values(user)[0];
  const { username, profile_pic_url } = currUser;

  if (!currUser) return <Loading/>;

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="flex items-center gap-2 hover:text-gray-400" >
        <div className="avatar rounded-full">
          <div className="w-8">
            {profile_pic_url && <img src={profile_pic_url} alt='' />}
          </div>
        </div>
        {username.toUpperCase()}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#212022] rounded-box w-32 mt-2 border-2 border-[#DEDEDE]">
        <li><a>Profile</a></li>
        <li><a>Watchlist</a></li>
        <li><a>Lists</a></li>
        <li><a>Friends</a></li>
        <li><div onClick={() => signOut()}>Sign Out</div></li>
      </ul>
    </div>
  )
}

export default UserProfileDropdown
