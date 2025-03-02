"use client"
import React, { useState, useEffect,useContext } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { getApiCall } from "@/api/fatchData";
import { AuthContex } from "@/context/AuthContex";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Switch } from "@mui/material";

export default function page() {
  const router = useRouter();
  const { state } = useContext(AuthContex);
  const [account_state, set_account_state] = useState(true);

  const handleSwitchChange = (event) => {
    set_account_state(event.target.checked);
  };

  const handleLogOut = () => {
    deleteCookie("accesstoken");
    router.push("/login", { scroll: true });
  }

  return (
    <Box className="w-full p-4">

<button
                  className="p-2 px-4 text-slate-400 flex items-center justify-between text-left w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                >
                <div>
                  <h3 className="text-black text-[17px] font-[700]">Allow new job notification</h3>
                  <p className="text-gray-100 text-[10px] font-[500]">Allow to send me new job based my area and skill to my email.</p>
                </div>

                <div>
                <Switch 
                  onChange={handleSwitchChange}
                  checked={account_state} 
                />
              </div>
                </button>


                <button
                  className="p-2 px-4 text-slate-400 flex items-center justify-between text-left w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                >
                <div>
                  <h3 className="text-black text-[17px] font-[700]">Allow multiple device</h3>
                  <p className="text-gray-100 text-[10px] font-[500]">Allow to use my account in multiple device. You can see login history as well.</p>
                </div>

                <div>
                <Switch 
                  onChange={handleSwitchChange}
                  checked={account_state} 
                />
              </div>
                </button>



       <Link
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  href={"/dashboard/payment"}
                >
             Payment
                </Link>

                <Link
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  href={"/dashboard/blockedaccount"}
                >
             Blocked Account
                </Link>

                <Link
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  href={"/dashboard/loginhistory"}
                >
             Login History
                </Link>

                <Link
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  href={"/dashboard/report"}
                >
             Report
                </Link>

                <Link
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  href={"/dashboard/supportandlivechat"}
                >
             Support & Live Chat
                </Link>


                <button
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  onClick={handleLogOut}
                >
                Log out
                </button>
    </Box>
  );
}
