'use client'

import Loading from '@/components/Loading';
import { getAllFilms } from '@/lib/FetchRequests/films'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function Films() {

  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const films = await getAllFilms();
        setFilms(films.films);
        console.log(films.films)
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }

    fetchFilms();
  }, []);

  if (!films || !films.length) return <Loading loader={1} />
  return (
    <div className='mx-16'>
      <h1 className='text-4xl font-HeaderFont font-bold text-center m-16'>FILMS</h1>
      <div className='films_container flex flex-wrap justify-evenly items-center gap-4'>
        {films.map((film, i) => (
          <div className="card w-48 bg-base-100 shadow-xl" key={i}>
            <Image
              src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={`Film Poster: ${film.poster_path}`}
              width={400}
              height={600}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Films
