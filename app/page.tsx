// import SpinningWheel from "./components/SpinningWheel";
import Image from "next/image";
import dynamic from "next/dynamic";

const SpinningWheel = dynamic(() => import("./components/SpinningWheel"), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      <SpinningWheel />
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full z-10">
        <Image src="/ball.png" width={210} height={210} alt="ball" className=""/>
      </div>
      
    </main>
  );
}