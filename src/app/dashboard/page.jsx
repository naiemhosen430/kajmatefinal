"use client"
import { useContext, useState } from "react";
import { AuthContex } from "@/context/AuthContex";
import React from "react";
import Analizing from "./_components/Analizing";
import OrderSection from "./_components/OrderSection";
import { Switch } from "@mui/material";
import Link from "next/link";

export default function Page() {
  const { state } = useContext(AuthContex);
  const user = state?.user;
  const [account_state, set_account_state] = useState(true);

  // Handle the state change when the Switch is toggled
  const handleSwitchChange = (event) => {
    set_account_state(event.target.checked);
  };

  return (
    <>
      <div className="lg:p-5 p-2">
        <div className="lg:flex items-center p-5 bg-[#1B1212] rounded-lg">
        <div className="lg:w-[50%] flex items-center w-[100%]">

        <div className=" w-[20%]">
          
          <img className="h-[50px] w-[50px] rounded-full" src={user?.profilephoto} alt="profile" />
        </div>
          <div className="px-2 text-[20px] w-[90%]">
            <h1 className="text-white">
              Hello, {user?.fullname}
            </h1>
            <h4 className="text-blue-500 text-[15px]">
              Location: {user?.location}
            </h4>
          </div>
        </div>

        <div className="lg:w-[50%] flex items-center w-[100%]">

          <div className=" w-[60%]">
            <h1 className="text-white text-[20px]">
              {user?.phone}
            </h1>
            <h4 className="text-blue-500 text-[15px]">
              {user?.email}
            </h4>
          </div>

          <div className=" text-right w-[40%]">
            <h1 className="text-white text-[20px]">
              {account_state ? "As Worker" : "As Client"}

            </h1>
              <div>
                <Switch 
                  onChange={handleSwitchChange}
                  checked={account_state} 
                />
              </div>
          </div>
        </div>

        </div>
<Link href="/dashboard/editprofile">Edit profile</Link>
        <div>
        <div className=" w-[60%] px-5 py-2">
            <h1 className="text-white text-[15px]">
              {user?.tittle}
            </h1>
            <h4 className="text-blue-500 text-[10px]">
              {user?.aboutme}
            </h4>
          </div>
        </div>
        <Analizing />
        <OrderSection />
      </div>
    </>
  );
}
