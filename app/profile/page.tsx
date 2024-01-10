'use client'

import Loading from '@/components/Loading';
import { getCurrUser } from '@/lib/FetchRequests/users'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'


function Profile() {
  const {data: session, status} = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const currUserObj = await getCurrUser(status);
      const currUser = Object.values(currUserObj)[0];
      setUser(currUser);
    }
    getUser();
  }, [status])

  if(status === 'loading') return <Loading loader={2}/>

  console.log(user)

  return (
    <div className='w-screen flex flex-col justify-center items-center '>

    </div>
  )
}

export default Profile
