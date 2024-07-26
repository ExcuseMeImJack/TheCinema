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
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize with true
  const router = useRouter();

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true); // Set loading state to true when fetching starts
      try {
        const response = await getAllFilms();
        if (response.films) {
          setFilms(response.films);
        } else {
          console.error("No films data received:", response);
        }
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setIsLoading(false); // Set loading state to false when fetching completes
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

  if(!films) return <Loading loader={1}/>;

  return (
    <div className='mx-16'>
      {isLoading ? <Loading loader={1} /> :
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <h1 className='text-6xl font-HeaderFont font-bold mt-10'>FILMS</h1>
            <div className='flex items-end gap-8'>
              <FilmFilters setSearchedItems={setFilms}/>
              <SearchBar searchType={"film"} setSearchedItems={setFilms} />
            </div>
          </div>
          <div className='border' />

          <div className={`films_container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3`}>
            {films.length === 0 ? (
              <p className='text-center text-lg'>No films available</p>
            ) : (
              films.map((film) => (
                <div
                  className="card bg-base-100 shadow-xl border-2 rounded-lg hover:border-[var(--interactHover)] hover:cursor-pointer overflow-hidden"
                  key={film.id}
                  onClick={() => openFilmDetails(film.id)}
                >
                  <div className='tinted-div'>
                    <Image
                      className='rounded-md w-full'
                      src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={`Film Poster: ${film.title}`}
                      width={400}
                      height={600}
                    />
                    <div className="text-overlay flex flex-col gap-3 justify-evenly p-4">
                      <div>
                        <p className='font-bold text-lg'>{film.title}</p>
                        <p className='font-bold text-md text-gray-400'>{film.release_date.split('-')[0]}</p>
                      </div>
                      <p className='text-sm'>{film.overview.length > 125 ? (`${film.overview.slice(0, 125)}...`) : film.overview}</p>
                      <p className='font-bold text-sm text-[var(--highlight)]'>{getRatingStatus(film)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default Films
