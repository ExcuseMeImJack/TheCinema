import { genres } from './genreCodes.js';
import { genreFormatter } from './genreFormatter.js';

export const genreIDConvertor = (genreIdentifier) => {
  // If genreIdentifier is a number as a string (e.g., "35")
  if (!isNaN(parseInt(genreIdentifier)) && genreIdentifier.trim() !== "") {
    const number = parseInt(genreIdentifier);
    // Check if the number matches any value in the MOVIE genres
    for (const [key, value] of Object.entries(genres.MOVIE)) {
      if (value === number) {
        return key; // Return the genre name (key)
      }
    }
    // If no match, return an empty string
    return "";
  } else {
    // If genreIdentifier is a string, check if it matches any key in the MOVIE genres
    const genre = genreFormatter(genre);
    if (genres.MOVIE.hasOwnProperty(genre)) {
      return genres.MOVIE[genre]; // Return the genre code (value)
    }
    // If no match, return an empty string
    return "";
  }
};
