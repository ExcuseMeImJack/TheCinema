import { NextResponse } from 'next/server';
import {isDateInFuture} from '@/lib/utils/isDateInFuture.js'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const options = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
  },
};

export const dynamic = 'force-dynamic';

// Fetch random film backgrounds
export async function getRandomFilmBackground() {
  try {
    const res = await fetch('/api/films/getRandomFilmBackground');
    if (res.ok) {
      return await res.json();
    } else {
      const errorResponse = await res.json();
      return { error: `Error Fetching Film Data: ${errorResponse.status_message}` };
    }
  } catch (error) {
    return { error: `Error Fetching Film Data: ${error.message}` };
  }
}

// Fetch all films
export async function getAllFilms() {
  try {
    const res = await fetch('/api/films/getAllFilms');
    if (res.ok) {
      return await res.json();
    } else {
      const errorResponse = await res.json();
      return { error: `Error Fetching Film Data: ${errorResponse.status_message}` };
    }
  } catch (error) {
    return { error: `Error Fetching Film Data: ${error.message}` };
  }
}

// Fetch films by year
export async function getFilmsByYear(inputYear: string) {
  if (!API_KEY) return { error: 'API key is missing' };

  try {
    if (inputYear === 'All') return await getAllFilms();

    if (inputYear === 'Upcoming') {
      let upcomingMovies: any[] = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages && upcomingMovies.length < 250) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${currentPage}`, options);

        if (!res.ok) {
          const errorResponse = await res.json();
          return { error: `Error Fetching Film Data: ${errorResponse.status_message}` };
        }

        const data = await res.json();
        upcomingMovies = [
          ...upcomingMovies,
          ...data.results.filter((film: any) => !film.adult && film.poster_path && film.popularity > 15 && isDateInFuture(film.release_date, film.title)),
        ];

        totalPages = data.total_pages;
        currentPage += 1;
      }

      const limitedMovies = upcomingMovies.slice(0, 250);
      console.log(limitedMovies)
      return { films: limitedMovies };
    }

    return { error: 'Invalid year filter' };
  } catch (error: any) {
    return { error: `Error Fetching Film Data: ${error.message}` };
  }
}

// Fetch films by genre
export async function getFilmsByGenre(inputGenre: string) {
  if (!API_KEY) return { error: 'API key is missing' };

  // Define TMDB API URL for fetching films by genre
  const TMDB_API_URL = 'https://api.themoviedb.org/3/discover/movie?with_genres=';

  try {
    const genreCode = genres.MOVIE[inputGenre];
    if (!genreCode) return { error: 'Invalid genre' };

    const res = await fetch(`${TMDB_API_URL}${genreCode}`, options);

    if (res.ok) {
      const films = await res.json();
      return { films: films.results };
    } else {
      const errorResponse = await res.json();
      return { error: `Error Fetching Film Data: ${errorResponse.status_message}` };
    }
  } catch (error: any) {
    return { error: `Error Fetching Film Data: ${error.message}` };
  }
}

// Fetch films by search query
export async function getFilmsBySearch(search: string) {
  if (!API_KEY) return { error: 'API key is missing' };

  const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie?query=';
  search = search.replace(/ /g, '+');

  try {
    const res = await fetch(`${TMDB_API_URL}${search}&api_key=${API_KEY}`, options);

    if (res.ok) {
      return await res.json();
    } else {
      const errorResponse = await res.json();
      return { error: `Error Fetching Film Data: ${errorResponse.status_message}` };
    }
  } catch (error: any) {
    return { error: `Error Fetching Film Data: ${error.message}` };
  }
}
