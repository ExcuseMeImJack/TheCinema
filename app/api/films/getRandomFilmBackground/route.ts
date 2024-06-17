import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";
import { Session, getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTA0Y2NkNDZlMGFkNjllNzU3MjhiY2RmMGQyMjY2YyIsInN1YiI6IjY1NWJkMDZlZDRmZTA0MDExYjk0MWUyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7HLvlhgYIqe1PtsPsQ2tKnUh2Jsr0oiMUJal0_az5v8'
      }
    };


    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
    const nowPlayingList = await response.json();
    const filmBackgrounds = nowPlayingList.results.map((film:any) => film.backdrop_path);

    const filmBackgroundsArr:any = Object.values(filmBackgrounds);

    const filmBackgroundUrl = filmBackgroundsArr[Math.floor(Math.random() * filmBackgroundsArr.length)]

    return NextResponse.json(filmBackgroundUrl, {status: 200});
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
