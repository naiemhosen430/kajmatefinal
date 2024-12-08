"use client"
import React, { useState, useEffect } from 'react';
import FilterBar from './FilterBar';
import JobCart from './JobCart';
import PersonCart from './PersonCart';
import { getApiCall } from "@/api/fatchData";

export default function Feed() {
  const [feed_type, set_feed_type] = useState("worker");
  const [loading, setLoading] = useState(false);
  const [filter_box_state, set_filter_box_state] = useState(false);
  const [all_jobs, set_all_jobs] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fatchData = async () => {
      setLoading(true);
      try {
        const response = await getApiCall(`help/public/get`);
        console.log(response)
        if (response?.statusCode === 200) {
          set_all_jobs(response?.data);
        }
      } catch (error) {
        console.log("Error during fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fatchData();
  }, []); 

  console.log(all_jobs)

  return (
    <>
      {filter_box_state && <FilterBar />}

      <div className="flex items-center pt-5">
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

      {/* Feed section */}
      {feed_type === "job" ? (
        <div>
          {all_jobs ? (
            all_jobs.length > 0 ? (
              all_jobs.map((s_job, i) => (
                <div key={i}>
                  <JobCart data={s_job} />
                </div>
              ))
            ) : (
              <p className="text-center text-white p-10">No data found</p>
            )
          ) : loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <PersonCart />
        </div>
      )}
    </>
  );
}
