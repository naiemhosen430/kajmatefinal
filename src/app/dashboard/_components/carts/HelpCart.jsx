import React from "react";

export default function HelpCart({ title, status, location, need_type, profession, type }) {
  return (
    <div className="w-full mx-auto p-4 bg-none border border-gray-500 my-2 rounded-lg shadow-md">
      {/* Cart Header (Title) */}
        <h2 className="text-2xl font-bold text-right text-white">{profession}</h2>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        
      </div>

      {/* Cart Body (Location and Type) */}
      <div className="flex justify-between items-center text-gray-100 mb-4">
        <div className="flex w-6/12 text-[12px] items-center">
          <span>{location}</span>
        </div>
        <div className="flex w-2/12 text-[12px] items-center">
          <span>{status}</span>
        </div>
        <div className="flex w-2/12 text-[12px] items-center">
          <span>{need_type}</span>
        </div>
        <div className="flex w-2/12 text-[12px] items-center">
          <span>{type}</span>
        </div>
      </div>


    </div>
  );
}
