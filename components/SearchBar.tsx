'use client'

import { getAllFilms, getFilmsBySearch } from '@/lib/FetchRequests/films';
import React, { useEffect, useState } from 'react';

type Imports = {
  searchType: string;
  setSearchedItems: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({ searchType, setSearchedItems, setIsLoading }: Imports) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const films = await getAllFilms();
        setSearchedItems(films.films);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching all films:", error);
        setIsLoading(false);
      }
    }

    const searchFilms = async () => {
      try {
        setIsLoading(true);
        const films = await getFilmsBySearch(search);
        if (films.results.length === 0) {
          await fetchFilms();
          console.log("Film Results Not Found")
        } else {
          const searchedFilms = films.results.filter((film: any) => film.adult !== true && film.poster_path !== null);
          setSearchedItems(searchedFilms);
        }
      } catch (error) {
        console.error("Error searching films:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (search.length > 3) {
      searchFilms();
    } else if (search.length <= 3) {
      fetchFilms();
    }
  }, [search, setSearchedItems]);

  return (
    <div className="flex justify-end m-3">
      {searchType === "film" && (
        <input
          className='w-48 h-8 p-2 rounded-lg text-lg border-2 bg-[--blue] placeholder:text-white'
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
