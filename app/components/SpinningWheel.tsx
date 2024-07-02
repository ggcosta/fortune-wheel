"use client";

import { Wheel } from "react-custom-roulette";
import { useEffect, useState } from "react";
import { getIndexByChance } from "@/utils/aux";
import data from "@/data.json";
import Image from "next/image";

type SpinningWheelProps = {
  data: any; // Replace 'any' with the actual type of the 'data' prop
  prizeNumber: number | null;
  onWheelStop: () => void;
};

const SpinningWheel = ({ data, prizeNumber, onWheelStop }: SpinningWheelProps) => {
  const [spin, setSpin] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window === "object") {
      setIsBrowser(true);
    }
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleWheelSpin();
      }
    };

    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, []);

  const handleWheelSpin = () => {
    setSpin(true);
  };

  const handleWheelStop = () => {
    setTimeout(() => {
      setSpin(false);
    }, 7000);
    onWheelStop();
  };

  return (
    <>
      {isBrowser ? (
        <Wheel
          mustStartSpinning={spin}
          prizeNumber={prizeNumber ? prizeNumber : 0}
          data={data}
          innerRadius={20}
          onStopSpinning={handleWheelStop}
          innerBorderWidth={10}
          innerBorderColor="#ffffff"
          radiusLineWidth={4}
          radiusLineColor="#ffffff"
          outerBorderColor="#89786b"
          outerBorderWidth={0}
          pointerProps={{
            src: "/pointer.png",
            style: {
              position: "absolute",
              width: "6vw",
              marginRight: "9vh",
              marginTop: "9vh",
              display: "none",
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="fixed h-[91vh] w-[91vh] bg-secondary opacity-95 rounded-full portrait:h-[80vw] portrait:w-[80vw]"></div>
      <div className="fixed h-[98vh] w-[98vh] bg-secondary opacity-20 rounded-full portrait:h-[85vw] portrait:w-[85vw]"></div>
      <div className="fixed z-10 h-[89vh] w-[89vh] border-secondary opacity-20 rounded-full border-[12px] portrait:h-[79vw] portrait:w-[79vw]"></div>
      <Image
        src="/ball.png"
        width={318}
        height={318}
        alt="ball"
        className="fixed z-10 w-[19.5vh] portrait:w-[17vw]"
        priority
      />
      <Image
        src="/wheel_bg.png"
        width={1495}
        height={1438}
        alt="bg"
        className="fixed w-[105vh] portrait:w-[105vw]"
        priority
      />
      <Image
        src="/bg_lines.png"
        width={2558}
        height={763}
        alt="bg_lines"
        className="fixed w-[100vw] portrait:w-[100vw] top-1/3"
        priority
      />
      <Image
        src="/pointer.png"
        width={191}
        height={191}
        alt="pointer"
        className="absolute w-[6vw] z-20 -rotate-45 top-[2vh]"
        priority
      />
    </>
  );
};

export default SpinningWheel;
