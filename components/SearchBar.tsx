'use client'

import { getAllFilms, getFilmsBySearch } from '@/lib/FetchRequests/films';
import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from '@/lib/utils/debounce';

type Imports = {
  searchType: string;
  setSearchedItems: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<any>>;
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<any>>;
  setGenreFilter: React.Dispatch<React.SetStateAction<any>>;
  setYearFilter: React.Dispatch<React.SetStateAction<any>>;
}

function SearchBar({ searchType, setSearchedItems, setIsLoading, searchFilter, setSearchFilter, setGenreFilter, setYearFilter }: Imports) {


  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      setIsLoading(true);
      try {
        if (searchTerm.length > 3) {
          const films = await getFilmsBySearch(searchTerm);
          if (films.length === 0) {
            // console.log("No results found, fetching all films.");
            const allFilms = await getAllFilms();
            setSearchedItems(allFilms.films || []);
          } else {
            setSearchedItems(films);
          }
        } else {
          // console.log("Search term too short, fetching all films.");
          const allFilms = await getAllFilms();
          setSearchedItems(allFilms.films || []);
        }
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setGenreFilter("");
        setYearFilter("");
        setIsLoading(false);
      }
    }, 500), // Adjust debounce delay as needed
    [setSearchedItems, setIsLoading]
  );

  useEffect(() => {
    // Only call debouncedSearch if search term actually changes
    if (searchFilter) {
      debouncedSearch(searchFilter);
    }
  }, [searchFilter]);

  return (
    <div>
      {searchType === "film" && (
        <input
          className='w-48 h-9 p-2 rounded-lg text-md border-2 bg-[--blue] text-white placeholder:text-white focus:outline-none'
          type="text"
          placeholder="Find a Film"
          onChange={(e) => setSearchFilter(e.target.value)}
          value={searchFilter}
        />
      )}

      {searchType === "show" && (
        <input
          type="text"
          placeholder="Find a Show"
          onChange={(e) => setSearchFilter(e.target.value)}
          value={searchFilter}
        />
      )}

      {searchType === "list" && (
        <input
          type="text"
          placeholder="Find a List"
          onChange={(e) => setSearchFilter(e.target.value)}
          value={searchFilter}
        />
      )}

      {searchType === "user" && (
        <input
          type="text"
          placeholder="Find a User"
          onChange={(e) => setSearchFilter(e.target.value)}
          value={searchFilter}
        />
      )}
    </div>
  );
}

export default SearchBar;
