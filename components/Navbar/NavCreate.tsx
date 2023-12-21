import React from 'react'

function NavCreate() {
  return (
    <div className="dropdown">
      <button tabIndex={0} role="button" className="flex items-center gap-1 bg-[#A155B9] hover:bg-[#7f4291] text-[#ffffff] py-1 px-3 rounded-xl" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" dataSlot="icon" className="w-5 h-5">
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        <h1 className=''>CREATE</h1>
      </button>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#212022] rounded-box w-48 mt-2 border-2 border-[#DEDEDE]">
        <li><a>Review</a></li>
        <li><a>List</a></li>
      </ul>
    </div>
  )
}

export default NavCreate
