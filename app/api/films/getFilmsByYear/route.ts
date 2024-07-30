import { isDateInFuture } from '@/lib/utils/isDateInFuture';
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
      return await getAllMovies();
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
  let allMovies: any[] = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages && allMovies.length < 150) {
    const pageUrl = `${url}&page=${currentPage}`;
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

    const filteredMovies = data.results.filter((film: any) => !film.adult && film.poster_path !== null);
    allMovies = [...allMovies, ...filteredMovies];
  }

  return allMovies.slice(0, 150);
}

async function getAllMovies() {
  try {
    const films = await fetchTMDBData(TMDB_API_URL);
    return NextResponse.json({ films }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all movies:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getFilmsByDecade(startYear: number) {
  const endYear = startYear + 9;
  const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
  try {
    const films = await fetchTMDBData(url);
    return NextResponse.json({ films }, { status: 200 });
  } catch (error) {
    console.error("Error fetching films by decade:", error);
    return NextResponse.json({ error: "Failed to fetch films by decade" }, { status: 500 });
  }
}

async function getUpcomingFilms() {
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${todayDate}`;

  try {
    const films = await fetchTMDBData(url);
    const upcomingFilms = films.filter(film => isDateInFuture(film.release_date));
    return NextResponse.json({ films: upcomingFilms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching upcoming films:", error);
    return NextResponse.json({ error: "Failed to fetch upcoming films" }, { status: 500 });
  }
}
