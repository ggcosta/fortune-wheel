"use client";

import dynamic from "next/dynamic";
import dataJSON from "@/data.json";
import { getIndexByChance } from "@/utils/aux";
import { useEffect, useRef, useState } from "react";


const SpinningWheel = dynamic(() => import("./components/SpinningWheel"), { ssr: false });

export default function Home() {
  const videoRef = useRef(null);
  const data = dataJSON.data;
  const chances = dataJSON.chances;

  const [showVideo, setShowVideo] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number | null>(null);

  const updatePrize = async (prize: any) => {
    console.log(prize);
    try {
      const response = await fetch("/api/prizes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          method: "POST",
        },
        body: JSON.stringify({ prize }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialPrize = getIndexByChance(chances);
    setPrizeNumber(initialPrize);
    updatePrize(data[initialPrize].option);
    console.log("useEffect")
  }, [chances, data]);

  const handleWheelStop = () => {
    setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        (videoRef.current as HTMLVideoElement).play();
      }
    }, 1000);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setTimeout(() => {
      const newPrize = getIndexByChance(chances);
      setPrizeNumber(newPrize)
      updatePrize(data[newPrize].option);
    }, 1000);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-screen bg-primary">
      <SpinningWheel
        data={data}
        prizeNumber={prizeNumber}
        onWheelStop={handleWheelStop}
      />
      {prizeNumber !== null && (
        <video
          ref={videoRef}
          src={data[prizeNumber].video}
          className={`z-20 fixed w-screen bg-primary transition-opacity duration-1000 ease-in-out ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          onEnded={handleVideoEnd}
        />
      )}
    </main>
  );
}