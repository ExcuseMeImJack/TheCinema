import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

const TMDB_API_URL = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    let allMovies: any[] = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages && allMovies.length < 250) {
      const response = await fetch(`${TMDB_API_URL}&page=${currentPage}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from TMDB');
      }

      const data = await response.json();

      // Aggregate movie data and filter out adult content and movies without posters
      const filteredMovies = data.results.filter((film: any) => !film.adult && film.poster_path);
      allMovies = [...allMovies, ...filteredMovies];

      // Update pagination info
      totalPages = data.total_pages;
      currentPage += 1;
    }

    // Ensure unique movies by ID
    const uniqueMoviesMap = new Map();
    allMovies.forEach((film) => {
      if (!uniqueMoviesMap.has(film.id)) {
        uniqueMoviesMap.set(film.id, film);
      }
    });

    // Convert Map values to an array and limit to 250 movies
    const limitedMovies = Array.from(uniqueMoviesMap.values()).slice(0, 250);

    return NextResponse.json({ films: limitedMovies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
