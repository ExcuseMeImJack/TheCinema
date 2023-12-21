"use client"

import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar/Navbar';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

type imports = {
  children: React.ReactNode
}

function App({children}: imports) {
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();


  useEffect(() => {
    setIsClient(true);
  },[])


  return (
    isClient &&
      <>
        {status === "loading" ? (
          <Loading loader={1}/>
        ) : (
          <>
            <Navbar />
            <div className="h-[89vh]">
              {children}
            </div>
          </>
        )}

      </>
  )
}

export default App
