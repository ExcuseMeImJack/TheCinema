import { NextResponse } from 'next/server';
import { genres } from '@/lib/utils/genreCodes';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER;
const TMDB_API_URL = 'https://api.themoviedb.org/3/discover/movie?with_genres=';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const inputGenre = searchParams.get('query') || '';

  if (!API_KEY || !BEARER_TOKEN) {
    return NextResponse.json({ error: 'API key or Bearer token is missing' }, { status: 500 });
  }

  try {
    const genreCode = genres["MOVIE"][inputGenre];
    if (!genreCode) {
      return NextResponse.json({ error: 'Invalid genre' }, { status: 400 });
    }

    const allMovies = await fetchFilmsByGenre(genreCode);
    if (allMovies.error) {
      return NextResponse.json({ error: allMovies.error }, { status: 500 });
    }

    return NextResponse.json({ films: allMovies.films }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error Fetching Film Data: ${error.message}` }, { status: 500 });
  }
}

async function fetchFilmsByGenre(genreCode: string) {
  let allMovies: any[] = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages && allMovies.length < 250) {
    const pageUrl = `${TMDB_API_URL}${genreCode}&page=${currentPage}&api_key=${API_KEY}`;
    const response = await fetch(pageUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Error Fetching Film Data: ${errorResponse.status_message || response.statusText}`);
    }

    const data = await response.json();
    totalPages = data.total_pages;
    currentPage += 1;

    // Filter out adult films and those without a poster
    const filteredMovies = data.results.filter((film: any) => !film.adult && film.poster_path !== null);

    // Add only unique films
    const uniqueMovies = filteredMovies.filter((film:any) => !allMovies.some(existingFilm => existingFilm.id === film.id));
    allMovies = [...allMovies, ...uniqueMovies];
  }

  // Limit to the first 250 films
  return { films: allMovies.slice(0, 250) };
}
