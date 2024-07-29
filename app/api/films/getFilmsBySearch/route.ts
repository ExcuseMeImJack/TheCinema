import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie?query=';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('query') || '';

  if (!API_KEY) return NextResponse.json({ error: 'API key is missing' }, { status: 500 });

  const formattedSearch = search.replace(/ /g, '+');
  const url = `${TMDB_API_URL}${formattedSearch}&api_key=${API_KEY}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data.results.filter((film: any) => film.adult !== true && film.poster_path !== null) );
    } else {
      const errorResponse = await res.json();
      return NextResponse.json({ error: `Error Fetching Film Data: ${errorResponse.status_message}` }, { status: res.status });
    }
  } catch (error: any) {
    return NextResponse.json({ error: `Error Fetching Film Data: ${error.message}` }, { status: 500 });
  }
}
