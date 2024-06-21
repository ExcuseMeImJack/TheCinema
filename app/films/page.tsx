'use client'

import Loading from '@/components/Loading';
import { getAllFilms } from '@/lib/FetchRequests/films'
import Image from 'next/image';
import './films.css'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../lib/utils/formatDate';
import { useRouter } from 'next/navigation';

function Films() {

  const [films, setFilms] = useState([]);
  const router = useRouter();

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

  const getRatingStatus = (film) => {
    const releaseDate = new Date(film.release_date);
    const today = new Date();

    if (releaseDate > today) {
      return (<><p>Coming Soon</p> <p>{formatDate(releaseDate)}</p></>);
    }

    const rating = film.vote_average;
    return rating.toFixed(1) + "/10";
  }

  const openFilmDetails = (filmID) => {
    router.refresh();
    router.push(`/films/${filmID}`);
  }

  if (!films || !films.length) return <Loading loader={1} />
  return (
    <div className='mx-16'>
      <h1 className='text-4xl font-HeaderFont font-bold text-center m-16'>FILMS</h1>
      <div className='films_container flex flex-wrap justify-evenly items-center gap-4'>
        {films.map((film, i) => (
          <div
            className="card w-48 bg-base-100 shadow-xl border-2 rounded-lg hover:border-[var(--interactHover)] hover:cursor-pointer"
            key={i}
            onClick={() => openFilmDetails(film.id)}>
            <div className='tinted-div'>
              <Image
                className='rounded-md'
                src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={`Film Poster: ${film.poster_path}`}
                width={400}
                height={600}
              />
              <div className="text-overlay flex flex-col gap-3 justify-evenly">
                <div>
                  <p className='font-bold text-lg'>{film.title}</p>
                  <p className='font-bold text-md text-gray-400'>{film.release_date.split('-')[0]}</p>
                </div>
                <p className='text-sm'>{film.overview.length > 180 ? (`${film.overview.slice(0, 180)}...`) : film.overview}</p>
                <p className='font-bold text-sm text-[var(--highlight)]'>{getRatingStatus(film)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Films
