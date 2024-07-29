import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER;
const TMDB_API_URL = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('query') || '';

  if (!API_KEY || !BEARER_TOKEN) {
    return NextResponse.json({ error: 'API key or Bearer token is missing' }, { status: 500 });
  }

  try {
    if (year === 'All') {
      try {
        let allMovies: any[] = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages && allMovies.length < 250) {
          const response = await fetch(`${TMDB_API_URL}&page=${currentPage}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data from TMDB');
          }

          const data = await response.json();
          totalPages = data.total_pages;
          currentPage += 1;

          // Filter and aggregate movie data
          const filteredMovies = data.results.filter((film: any) => !film.adult && film.poster_path);
          allMovies = [...allMovies, ...filteredMovies];
        }

        // Limit to the first 250 movies
        const limitedMovies = allMovies.slice(0, 250);

        return NextResponse.json({ films: limitedMovies }, { status: 200 });
      } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }

    if (year === 'Upcoming') {
      return await getUpcomingFilms();
    }

    const decadeMatch = year.match(/^(\d{4})s$/);
    if (decadeMatch) {
      const startYear = parseInt(decadeMatch[1], 10);
      return await getFilmsByDecade(startYear);
    }

    return NextResponse.json({ error: 'Invalid year filter' }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: `Error Fetching Film Data: ${error.message}` }, { status: 500 });
  }
}

async function fetchTMDBData(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    return NextResponse.json({ error: `Error Fetching Film Data: ${errorResponse.status_message}` }, { status: response.status });
  }
  const data = await response.json();
  return data.results.filter((film: any) => !film.adult && film.poster_path !== null);
}

async function getFilmsByDecade(startYear: number) {
  const endYear = startYear + 9;
  const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
  const films = await fetchTMDBData(url);
  return NextResponse.json({ films }, { status: 200 });
}

async function getUpcomingFilms() {
  const url = `https://api.themoviedb.org/3/movie/upcoming`;
  const films = await fetchTMDBData(url);
  return NextResponse.json({ films }, { status: 200 });
}
