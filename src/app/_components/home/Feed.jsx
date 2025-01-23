"use client";
import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import JobCart from "./JobCart";
import PersonCart from "./PersonCart";
import { getApiCall } from "@/api/fatchData";

export default function Feed() {
  const [feedType, setFeedType] = useState("worker");
  const [loading, setLoading] = useState(false);
  const [filterBoxState, setFilterBoxState] = useState(false);
  const [allJobs, setAllJobs] = useState(null);
  const [allPersons, setAllPersons] = useState(null); 
  const [allAreas,set_allAreas] = useState([])
  const [professions,set_professions] = useState([])
  

  const [filter_options, set_filter_options] = useState( {
    area: [],
    profession:[]
  }); 


  const fetchData = async () => {
    setLoading(true);
    try {
      const jobResponse = await getApiCall(`help/public/get`);
      const personResponse = await getApiCall(`user/public/getemployees`);

      if (jobResponse?.statusCode === 200) {
        setAllJobs(jobResponse?.data);
      }

      if (personResponse?.statusCode === 200) {
        setAllPersons(personResponse?.data); 
      }
    } catch (error) {
      console.log("Error during fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  // Fetch data when the component mounts
  useEffect(() => {


    fetchData();
  }, []); 

  const onApply = async () => {
    fetchData()
    setFilterBoxState(false)

  }

  const onClose = () => {
    setFilterBoxState(false)
  }

  return (
    <>
      {filterBoxState && (
        <FilterBar
          set_filter_box_state={setFilterBoxState}
          filter_options={filter_options}
          set_filter_options={set_filter_options}
          allAreas={allAreas}
          professions={professions}
          onApply={onApply}
          onClose={onClose}
        />
      )}

      <div className="flex items-center py-5 pb-0">
        <button
          style={{ backgroundColor: feedType === "worker" ? "green" : "" }}
          onClick={() => setFeedType("worker")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] mr-2"
        >
          Worker
        </button>

        <button
          style={{ backgroundColor: feedType === "job" ? "green" : "" }}
          onClick={() => setFeedType("job")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] mx-2"
        >
          Job
        </button>

        <button
          onClick={() => setFilterBoxState(!filterBoxState)}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[20%] ml-2"
        >
          Filter
        </button>
      </div>

      {/* Feed section */}
      {feedType === "job" ? (
        <div className="pt-3">
          {allJobs ? (
            allJobs.length > 0 ? (
              allJobs.map((job, i) => (
                <div key={i}>
                  <JobCart data={job} />
                </div>
              ))
            ) : (
              <p className="text-center text-white p-10">No jobs found</p>
            )
          ) : loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="pt-1">
          {allPersons ? (
            allPersons.length > 0 ? (
              allPersons.map((person, i) => (
                <div className="lg:w-3/12 w-6/12 inline-block p-4" key={i}>
                  <PersonCart personData={person} />
                </div>
              ))
            ) : (
              <p className="text-center text-white p-10">No workers found</p>
            )
          ) : loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
