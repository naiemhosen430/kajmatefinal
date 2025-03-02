"use client"
import {useContext} from "react"
import Image from "next/image";
import Hero from "./_components/home/Hero";
import HowToWork from "./_components/home/HowToWork";
import HelpMeWith from "./_components/home/HelpMeWith";
import { AuthContex } from "@/context/AuthContex";
import IntroSlider from "./_components/home/IntroSlider";
import dynamic from "next/dynamic";
const Feed = dynamic(() => import('./_components/home/Feed'), {
  ssr: false, 
});
import { getCookie } from "cookies-next";
import WhyChooseUs from "./_components/home/WhyChooseUs";
import OwnerShip from "./_components/home/OwnerShip";

export default function Home() {
  const token = getCookie("accesstoken");
  const {state} = useContext(AuthContex)
  const user = state?.user
  return (
    <>

      <div className="">

      {token ? 
      <>
        {user ?
      <>

      <div className="pt-5 container m-auto px-5">

<div className="lg:flex items-center justify-between">

<div className="lg:w-[35%] mb-0">

        <HelpMeWith />
</div>

<div className="lg:w-[62%] pt-4 lg:pt-0">


        <IntroSlider />
</div>
</div>
        <Feed />

      </div>
      </>
        :

        <div className="flex items-center justify-center h-[500px]">
    <div className="w-16 h-16 border-4 border-t-4 border border-solid rounded-full animate-spin"></div>
</div>
        }
      </>
      :
      <>

      <div className="bg-white min-h-screen">


        <Hero /> 
         <HowToWork />
         <WhyChooseUs />
        <OwnerShip />
      </div>

      </>
      }
      </div>
    </>
  );
}

