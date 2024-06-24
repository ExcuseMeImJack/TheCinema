export async function getRandomFilmBackground(){
  try {
    const res = await fetch('/api/films/getRandomFilmBackground');
    if(res.ok) {
      const filmBackgrounds = await res.json();
      return filmBackgrounds;
    }
  } catch (error) {
    return({error: `Error Fetching Film Data ${error}`});
  }
}

export async function getAllFilms(){
  try {
    const res = await fetch('/api/films/getAllFilms');
    if(res.ok) {
      const films = await res.json();
      return films;
    }
  } catch (error) {
    return({error: `Error Fetching Film Data ${error}`});
  }
}

export async function getFilmsBySearch(search: string) {
  const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie?query=';
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  search = search.replace(/ /g, '+');

  if (!API_KEY) {
    return { error: 'API key is missing' };
  }

  try {
    const res = await fetch(`${TMDB_API_URL}${search}&api_key=${API_KEY}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
      },
    });

    if (res.ok) {
      const films = await res.json();
      return films;
    } else {
      const errorResponse = await res.json();
      return { error: `Error Fetching Film Data: ${errorResponse.status_message}` };
    }
  } catch (error) {
    return { error: `Error Fetching Film Data: ${error.message}` };
  }
}

