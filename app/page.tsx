"use client";

import dynamic from "next/dynamic";
import dataJSON from "@/config.json";
import { getIndexByChance } from "@/utils/aux";
import { useEffect, useRef, useState } from "react";
import { initiateAwards, getChancesArray } from "@/_actions/awardActions";

const SpinningWheel = dynamic(() => import("./components/SpinningWheel"), {
  ssr: false,
});

export default function Home() {
  const videoRef = useRef(null);
  const data = dataJSON.data;
  //const chances = useMemo(() => getChancesArray2(data), [data]);

  const [chances, setChances] = useState<any>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number | null>(null);

  useEffect(() => {
    handleInitiateAwards();
  }, []);

  const handleInitiateAwards = async () => {
    const res = await initiateAwards(data);
    console.log(res);
    const newChances = await getChancesArray(data);
    console.log(newChances);
    setChances(newChances);
    const initialPrize = getIndexByChance(newChances as number[]);
    setPrizeNumber(initialPrize);
  };

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
      setPrizeNumber(newPrize);
    }, 1000);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-screen bg-primary">
      {chances !== null ? (
        <SpinningWheel
          data={data}
          prizeNumber={prizeNumber}
          onWheelStop={handleWheelStop}
        />
      ) : (
        <p>Loading...</p>
      )}
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
