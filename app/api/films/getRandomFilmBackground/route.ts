import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const response = await fetch(TMDB_API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from TMDB');
    }

    const nowPlayingList = await response.json();
    const filmBackgrounds = nowPlayingList.results.filter((film: any) => film.vote_count >= 1000).map((film: any) => film.backdrop_path);


    return NextResponse.json({ filmBackgrounds }, { status: 200 });
  } catch (error) {
    console.error("Error fetching film background:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
