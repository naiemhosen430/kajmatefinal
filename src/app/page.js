"use client"
import {useContext} from "react"
import Image from "next/image";
import Hero from "./_components/home/Hero";
import HowToWork from "./_components/home/HowToWork";
import HelpMeWith from "./_components/home/HelpMeWith";
import { AuthContex } from "@/context/AuthContex";
import IntroSlider from "./_components/home/IntroSlider";
import Feed from "./_components/home/Feed";
import { getCookie } from "cookies-next";

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

        <HelpMeWith />

<div className="4">

        <IntroSlider />
        <Feed />

</div>
      </div>
      </>
        :

        <div class="flex items-center justify-center h-[500px]">
    <div class="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
</div>
        }
      </>
      :
      <>

      <div className="bg-white min-h-screen">


        <Hero /> 
         <HowToWork />
      </div>

      </>
      }
      </div>
    </>
  );
}
