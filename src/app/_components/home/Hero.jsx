import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="bg-[#d4eff0]">

    <div className="background-color rounded-br-[200px] lg:p-[100px] p-[20px]">
      <div className="container m-auto">
        <h1 className="lg:text-[40px] text-[20px] text-center">
          Find help from any where any time{" "}
          <span className="primary-green">Kajmate</span>
        </h1>
        <p className="dark text-center lg:text-[20px] text-[15px]">
          Here is worker and service are availabe for you in your area. if you are looking for that then here you will find.register and and enjoy the new world
        </p>

        <div className="text-center mt-5">
          <Link
            className="text-[20px] rounded-full border-[#333333] dark border-2 px-8 py-2"
            href={"/register"}
          >
          Join now
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
