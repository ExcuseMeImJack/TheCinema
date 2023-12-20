
import React from 'react'
import { HashLoader } from 'react-spinners'

function Loading() {

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg'>
      <HashLoader
        color='#F765A3'
        size={150}
        speedMultiplier={0.8} />
    </div>
  )
}

export default Loading
