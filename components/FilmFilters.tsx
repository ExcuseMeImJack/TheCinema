import React, { useEffect, useState } from 'react'
import { years } from '@/lib/utils/filterYears.js'
import { genres } from '@/lib/utils/genreCodes.js';

function FilmFilters() {

  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    if (yearFilter) {
      console.log("Year: ", yearFilter)
    }

    if (genreFilter) {
      console.log("Genre: ", genreFilter)
    }
  }, [genreFilter, yearFilter])


  return (
    <div className='flex gap-2 items-end'>
      <p className='font-bold'>Filter by:</p>
      <div className='flex gap-2'>
        <select
          className='w-36 h-8 rounded-lg text-md border-2 bg-[--pink] placeholder:text-white text-white text-center focus:outline-none hover:cursor-pointer selection:'
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option className='text-white text-xs' value="" disabled>Year</option>
          {years.map((year, i) => (
            <option key={i} value={year} className='text-xs text-white hover:cursor-pointer'>
              {year}
            </option>
          ))}
        </select>
        <select
          className='w-36 h-8 rounded-lg text-md border-2 bg-[--purple] placeholder:text-white text-white text-center focus:outline-none hover:cursor-pointer selection:'
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option className='text-white text-sm' value="" disabled>Genre</option>
          {Object.keys(genres["MOVIE"]).map((genre, i) => (
            <option key={i} value={genre} className='text-xs text-white hover:cursor-pointer'>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilmFilters
