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
        // setIsLoading(true);
        const films = await getFilmsBySearch(search);
        if (films.length === 0) {
          await fetchFilms();
          console.log("Film Results Not Found")
        } else {
          const searchedFilms = films;
          setSearchedItems(searchedFilms);
        }
      } catch (error) {
        console.error("Error searching films:", error);
      }
    }

    if (search.length > 3) {
      searchFilms();
    } else if (search.length <= 3) {
      fetchFilms();
    }
  }, [search, setSearchedItems]);

  return (
    <div>
      {searchType === "film" && (
        <input
          className='w-48 h-9 p-2 rounded-lg text-md border-2 bg-[--blue] text-white placeholder:text-white focus:outline-none'
          type="text"
          placeholder="Find a Film"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}

      {searchType === "show" && (
        <input
          type="text"
          placeholder="Find a Show"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}

      {searchType === "list" && (
        <input
          type="text"
          placeholder="Find a List"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}

      {searchType === "user" && (
        <input
          type="text"
          placeholder="Find a User"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}
    </div>
  );
}

export default SearchBar;
