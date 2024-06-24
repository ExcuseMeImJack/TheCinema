import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

const TMDB_API_URL = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';

export async function GET(req: Request) {
  try {
    let allMovies = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages && allMovies.length < 500) {
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

      // Aggregate movie data
      allMovies = [...allMovies, ...data.results];
      allMovies.filter((film) => film.adult !== true || film.poster_path)

      // Update pagination info
      totalPages = data.total_pages;
      currentPage += 1;
    }


    // Limit to the first 50 movies
    const limitedMovies = allMovies.slice(0, 500);

    return NextResponse.json({ films: limitedMovies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
