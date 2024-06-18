'use client'

import Footer from "@/components/Footer";
import { getRandomFilmBackground } from "@/lib/FetchRequests/films";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [filmBackground, setFilmBackground] = useState("");
  const[prevFilmBackground, setPrevFilmBackground] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      if(filmBackground !== prevFilmBackground) {
        setPrevFilmBackground(filmBackground);
        setFilmBackground(await getRandomFilmBackground());
      } else {
        setFilmBackground(await getRandomFilmBackground());
      }
    }, 15000)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            alt={`Film Background Image: ${filmBackground}`}
            src={filmBackground ? `https://image.tmdb.org/t/p/original${filmBackground}` : "https://i.imgur.com/W2oTx5H.jpg"}
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
