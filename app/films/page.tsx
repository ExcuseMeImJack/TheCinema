'use client'

import Loading from '@/components/Loading';
import { getAllFilms } from '@/lib/FetchRequests/films'
import Image from 'next/image';
import './films.css'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../lib/utils/formatDate';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import FilmFilters from '@/components/FilmFilters';

interface Film {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

const Films: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getAllFilms();
        setFilms(response.films);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }

    fetchFilms();

  }, []);

  const getRatingStatus = (film: Film) => {
    const releaseDate = new Date(film.release_date);
    const today = new Date();

    if (releaseDate > today) {
      return (<><p>Coming Soon</p> <p>{formatDate(releaseDate)}</p></>);
    }

    const rating = film.vote_average;
    return rating.toFixed(1) + "/10";
  }

  const openFilmDetails = (filmID: number) => {
    router.refresh();
    router.push(`/films/${filmID}`);
  }

  return (
    <div className='mx-16'>
      <h1 className='text-4xl font-HeaderFont font-bold text-center mx-16 mt-16 mb-6'>FILMS</h1>
      {films.length === 0 || isLoading ? <Loading loader={1} /> :
        // Work on making justify-center to justify-start
        <div className='flex flex-col'>
          <FilmFilters />
          <SearchBar searchType={"film"} setSearchedItems={setFilms} setIsLoading={setIsLoading} />
          <div className={`films_container flex flex-wrap justify-evenly gap-4`}>
            {films.map((film) => (
              <div
                className="card w-48 bg-base-100 shadow-xl border-2 rounded-lg hover:border-[var(--interactHover)] hover:cursor-pointer"
                key={film.id}
                onClick={() => openFilmDetails(film.id)}>
                <div className='tinted-div'>
                  <Image
                    className='rounded-md'
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={`Film Poster: ${film.title}`}
                    width={400}
                    height={600}
                  />
                  <div className="text-overlay flex flex-col gap-3 justify-evenly">
                    <div>
                      <p className='font-bold text-lg'>{film.title}</p>
                      <p className='font-bold text-md text-gray-400'>{film.release_date.split('-')[0]}</p>
                    </div>
                    <p className='text-sm'>{film.overview.length > 125 ? (`${film.overview.slice(0, 125)}...`) : film.overview}</p>
                    <p className='font-bold text-sm text-[var(--highlight)]'>{getRatingStatus(film)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>}
    </div>
  )
}

export default Films
