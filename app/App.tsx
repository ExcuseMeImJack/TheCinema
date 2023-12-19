"use client"

import Navbar from '@/components/Navbar/Navbar';
import React, { useEffect, useState } from 'react'

type imports = {
  children: React.ReactNode
}

function App({children}: imports) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  },[])


  return (
    isClient &&
      <>
        <Navbar />
        <div className="h-[89vh]">
          {children}
        </div>
      </>
  )
}

export default App
