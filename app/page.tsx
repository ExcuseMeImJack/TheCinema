'use client'

import '../styles/home.css'
import Footer from "@/components/Footer";
import { getRandomFilmBackground } from "@/lib/FetchRequests/films";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [filmBackground, setFilmBackground] = useState("");
  const [filmBackgrounds, setFilmBackgrounds] = useState([]);

  // Fetch the backgrounds initially
  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const backgrounds = await getRandomFilmBackground();
        const backgroundsArr = Object.values(backgrounds)[0];
        setFilmBackgrounds(backgroundsArr);
        setFilmBackground(backgroundsArr[Math.floor(Math.random() * backgroundsArr.length)]);
      } catch (error) {
        console.error("Error fetching film backgrounds:", error);
        setFilmBackground("https://i.imgur.com/W2oTx5H.jpg");
      }
    };

    fetchBackgrounds();
  }, []);

  useEffect(() => {
    const updateBackground = () => {
      if (filmBackgrounds.length > 0) {
        const filmBackgroundUrl = filmBackgrounds[Math.floor(Math.random() * filmBackgrounds.length)];
        setFilmBackground(filmBackgroundUrl);
      }
    };

    if (filmBackgrounds.length > 0) {
      const interval = setInterval(updateBackground, 15000);
      return () => clearInterval(interval);
    }
  }, [filmBackgrounds]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="relative w-[65%] h-full overflow-hidden fade-container">
          <Image
            alt={`Film Background Image: ${filmBackground}`}
            src={filmBackground ? `https://image.tmdb.org/t/p/original${filmBackground}` : "https://i.imgur.com/W2oTx5H.jpg"}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
