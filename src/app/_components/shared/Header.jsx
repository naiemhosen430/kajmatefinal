"use client"
import {useContext} from "react"
import { AuthContex } from "@/context/AuthContex";
import Link from "next/link";
import React from "react";

export default function Header() {
  const {state} = useContext(AuthContex)
  const user = state?.user
  return (
    <>
      <div className="bg-black/50">
        <div className="container m-auto p-4 py-0 flex items-center justify-between">
          <div className="w-6/12 text-white  text-[30px]">
            <Link href={"/"}>
Kajmate
            </Link>
          </div>

          <div className="w-6/12 flex items-center py-2 justify-end">

{user ?
  <Link
              className=" p-1 px-5 text-[15px] border border-gray-500 rounded-xl text-white font-[600]"
              href={"/register"}
            >
              {user?.fullname}
            </Link>
:

            <Link
              className="p-1 px-5 text-[15px] border border-gray-500 rounded-xl text-white font-[600]"
              href={"/register"}
            >
              Account
            </Link>
}
          </div>
        </div>
      </div>
    </>
  );
}
