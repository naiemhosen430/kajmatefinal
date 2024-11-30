"use client"
import React, {useState} from 'react'
import JobModal from '../modals/JobModal'

export default function JobCart({}) {
    const [job,set_job] = useState(null)
  return (
    <>
    {job &&
    <JobModal job={job} set_job={set_job} />
    }

    <div onClick={() => set_job("job")} className="w-full cursor-pointer mx-auto p-4 bg-none border border-gray-500 my-2 rounded-lg shadow-md">
      {/* Cart Header (Title) */}
        <h2 className="text-2xl font-bold text-right text-white">{"Teacher"}</h2>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{"title"}</h2>
        
      </div>

      {/* Cart Body (Location and Type) */}
      <div className="flex justify-between items-center text-gray-500 mb-4">
        <div className="flex items-center">
          <span>{"location"}</span>
        </div>
        <div className="flex items-center">
          <span>{"status"}</span>
        </div>
        <div className="flex items-center">
          <span>{"need_type"}</span>
        </div>
        <div className="flex items-center">
          <span>{"type"}</span>
        </div>
      </div>


    </div>
    </>
  )
}
