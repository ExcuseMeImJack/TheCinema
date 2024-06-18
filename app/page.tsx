'use client'

import Footer from "@/components/Footer";
import { getRandomFilmBackground } from "@/lib/FetchRequests/films";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [filmBackground, setFilmBackground] = useState("");

  useEffect(() => {
    const fetchBackground = async () => {
      const background = await getRandomFilmBackground();
      setFilmBackground(background);
    };

    fetchBackground();
    const interval = setInterval(fetchBackground, 15000);

    return () => clearInterval(interval);
  }, [filmBackground]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="relative w-full h-full">
          <Image
            alt={`Film Background Image: ${filmBackground}`}
            src={filmBackground ? `https://image.tmdb.org/t/p/original${filmBackground}` : "https://i.imgur.com/W2oTx5H.jpg"}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
