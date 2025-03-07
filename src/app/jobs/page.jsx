"use client"
import { getApiCall } from '@/api/fatchData';
import React, { useContext, useEffect, useState } from 'react'
import JobCart from '../_components/home/JobCart';
import { JonAndPersonContext } from '@/context/JonAndPersonContext';

export default function page() {
    const [allJobs, setAllJobs] = useState(null);
    const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(JonAndPersonContext);

    
      const fetchData = async () => {
        setLoading(true);
        try {
          const jobResponse = await getApiCall(`help/public/get`);

          if (jobResponse?.statusCode === 200) {
            dispatch({ type: "ADD_JOB_DATA", payload: jobResponse?.data });
          }
    
 
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
    
    
      // Fetch data when the component mounts
      useEffect(() => {
        if (!state.jobs) {
          fetchData();
        } else {
            setAllJobs(state.jobs);
        }
    
    
      }, [state.jobs]); 
    


  return (
    <>
    <div className="container mx-auto lg:px-5 px-2">

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
                  <div className="w-16 h-16 border-4 border-t-4 border border-solid rounded-full animate-spin"></div>
                </div>
              ) : null}
            </div>
    </div>
    </>
  )
}
