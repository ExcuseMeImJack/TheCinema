import React, { useState } from 'react'

function FilmFilters() {

  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");


  return (
    <div className='flex gap-2 items-end'>
      <p className='font-bold'>Filter by:</p>
      <div className='flex gap-2'>
        <input
          className='w-28 h-7 p-2 rounded-lg text-md border-2 bg-[--pink] placeholder:text-white text-white text-center'
          type='text'
          placeholder='Year'
          onChange={(e) => setYearFilter(e.target.value)}
          value={yearFilter}
        />
        <input
          className='w-28 h-7 p-2 rounded-lg text-md border-2 bg-[--purple] placeholder:text-white text-white text-center'
          type='text'
          placeholder='Genre'
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
        />
      </div>
    </div>
  )
}

export default FilmFilters
