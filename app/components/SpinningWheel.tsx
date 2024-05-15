"use client";

import { Wheel } from "react-custom-roulette";
import { useEffect, useState } from "react";
import { getIndexByChance } from "@/utils/aux";
import data from "@/data.json";

const SpinningWheel = () => {
  const [spin, setSpin] = useState(false);


  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setSpin(true);
      }
    }

    document.addEventListener("keydown", handleEnter);

    console.log(`Window is of type: ${typeof(window)}`)

    return () => {
      document.removeEventListener("keydown", handleEnter);
    }
  }, []);


  const handleWheelSpin = () => { 

  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="">
            { typeof(window) !== 'undefined' && <Wheel
            mustStartSpinning={spin}
            prizeNumber={getIndexByChance(data.chances)}
            data={data.data}
            innerRadius={20}
            onStopSpinning={() => setSpin(false)}
            innerBorderWidth={10}
            innerBorderColor="#ffffff"
            radiusLineWidth={4}
            radiusLineColor="#ffffff"
            outerBorderColor="#89786b"
            outerBorderWidth={0}
            pointerProps={{src:"/pointer.png", style:{width:"120px", marginRight: "95px", marginTop:"95px", zIndex:10}}}
          />}
      </div>
    </div>
  );
};

export default SpinningWheel;
