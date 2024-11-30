"use client"
import React,{useState} from 'react'
import FilterBar from './FilterBar'
import JobCart from './JobCart'
import PersonCart from './PersonCart'

export default function Feed() {
  const [feed_type,set_feed_type] = useState("worker")
  const [filter_box_state,set_filter_box_state] = useState(false)
  return (
    <>
    {filter_box_state &&
<FilterBar />
    }
<div className='flex items-center'>
  <button
    style={{ backgroundColor: feed_type === "worker" ? "green" : "" }}
    onClick={() => set_feed_type("worker")}
    className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] mr-2"
  >
    Worker
  </button>
  
  <button
    style={{ backgroundColor: feed_type === "job" ? "green" : "" }}
    onClick={() => set_feed_type("job")}
    className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] mx-2"
  >
    Job
  </button>
  
  <button
     onClick={() => set_filter_box_state(!filter_box_state)}
    className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[20%] ml-2"
  >
    Filter
  </button>
</div>

{/* feed  */}

{
  feed_type === "job" ? 

<div>
<JobCart />
</div>

:

  
<div>
<PersonCart />
</div>
}

    </>
  ) 
}
