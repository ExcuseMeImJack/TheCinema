export async function getRandomFilmBackground(){
  try {
    const res = await fetch('/api/films/getRandomFilmBackground');
    if(res.ok) {
      const filmBackgrounds = await res.json();
      return filmBackgrounds;
    }
  } catch (error) {
    return({error: `Error Fetching User Data ${error}`});
  }
}
