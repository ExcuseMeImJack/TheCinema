'use client'

import Loading from '@/components/Loading';
import { getCurrUser } from '@/lib/FetchRequests/users'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type currUser = {
  currUser: object
}

function Profile() {
  const {data: session, status} = useSession();
  const [user, setUser] = useState<currUser | null>(null);


  useEffect(() => {
    const getUser = async () => {
      const currUserObj = await getCurrUser(status);
      if(currUserObj) {
        const currUser = Object.values(currUserObj)[0];
        setUser(currUser as { currUser: object });

      }
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
