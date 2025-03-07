"use client"
import React, { useState } from 'react';
import JobModal from '../modals/JobModal';

export default function JobCart({ data }) {
  const [job, setJob] = useState(null);

  return (
    <>
      {job && <JobModal job={job} set_job={setJob} />}

      <div 
        onClick={() => setJob(data)} 
        className="w-full p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer transform mx-auto my-4"
      >
        {/* Cart Header (Title) */}
        <h2 className="lg:text-[20px] text-[18px] font-semibold text-white text-left mb-4">{data?.profession}</h2>

        {/* Cart Body (Description) */}
        <div className="text-white text-sm mb-4">
          <div 
            className="text-gray-300 text-justify" 
            dangerouslySetInnerHTML={{
              __html: data?.description?.slice(0, 200) + "...."
            }}
          />
        </div>

        {/* Cart Footer (Location, Status, Type) */}
        <div className="lg:flex text-sm text-gray-300">
          <div className="inline-block mt-2 mr-4 p-2 px-4 bg-gray-700 rounded-[10px]">
            <span className="text-white font-medium">{data?.area}</span>
          </div>
          <div className="inline-block mt-2 mr-4 p-2 px-4 bg-gray-600 rounded-[10px]">
            <span className="text-white font-medium">{data?.need_type}</span>
          </div>
          <div className="inline-block mt-2 p-2 px-4 border border-gray-700 rounded-[10px]">
            <span className="text-white font-medium">{data?.type}</span>
          </div>
        </div>

      </div>
    </>
  );
}
