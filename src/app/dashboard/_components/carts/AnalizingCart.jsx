import React from "react";

export default function AnalizingCart({ value, label }) {
  return (
    <>
      <div className="p-4 px-5 shadow-xl bg-slate-600 text-white m-4 rounded-lg">
        <h1 className="font-[700] text-[30px] leading-[10px] text-center pb-2 p-0">
          {value}
        </h1>

        <p className="text-center lg:text-[16px] text-[12px]">{label}</p>
      </div>
    </>
  );
}
