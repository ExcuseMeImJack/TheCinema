'use client'

import { getAllFilms, getFilmsBySearch } from '@/lib/FetchRequests/films';
import React, { useEffect, useState } from 'react';

type Imports = {
  searchType: string;
  setSearchedItems: React.Dispatch<React.SetStateAction<any>>;
}

function SearchBar({ searchType, setSearchedItems }: Imports) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const films = await getAllFilms();
        setSearchedItems(films.films);
      } catch (error) {
        console.error("Error fetching all films:", error);
      }
    }

    const searchFilms = async () => {
      try {
        const films = await getFilmsBySearch(search);
        if (films.results.length === 0) {
          await fetchFilms();
        } else {
          const searchedFilms = films.results.filter((film) => film.adult !== true && film.poster_path !== null);
          setSearchedItems(searchedFilms);
        }
      } catch (error) {
        console.error("Error searching films:", error);
      }
    }

    if (search.length > 3) {
      searchFilms();
    } else if (search.length < 4) {
      fetchFilms();
    }
  }, [search, searchType, setSearchedItems]);

  return (
    <div className="flex justify-end m-3">
      {searchType === "film" && (
        <input
          className='w-64 h-10 p-2 rounded-lg text-lg border-2 border-[var(--interactHover)] outline-[var(--highlight)]'
          type="text"
          placeholder="Search a Film"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}

      {searchType === "show" && (
        <input
          type="text"
          placeholder="Search a Show"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}

      {searchType === "list" && (
        <input
          type="text"
          placeholder="Search a List"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}

      {searchType === "user" && (
        <input
          type="text"
          placeholder="Search a User"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}
    </div>
  );
}

export default SearchBar;
