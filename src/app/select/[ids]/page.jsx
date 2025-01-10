"use client"
import { getApiCall } from '@/api/fatchData';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [selectEmployeeData, setSelectEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ids } = useParams();
  const router = useRouter();

  const person_id = ids?.split("and")[0];
  const job_id = ids?.split("and")[1];

  useEffect(() => {
    if (!person_id || !job_id) {
      router.push('/not-found'); 
      return;
    }

    const fetchData = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const data = await getApiCall(`help/select/${job_id + "and" + person_id}`);
        setSelectEmployeeData(data?.data);
      } catch (error) {
        setError("Error fetching profile data.");
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [person_id, job_id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="w-16 h-16 m-auto border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
      </div>
    );
  }


  // handling select employee 
  const handleSelectEmployee = async () => {
    console.log("hello ")
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] text-white">
        <p>{error}</p>
      </div>
    );
  }

  // Show data once it's fetched
  return (
    <>
      <div className="lg:rounded-r-[20px] container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
        <div className="flex border-b pb-2 border-gray-500">
          <div className="w-[12%]">
            <img src={selectEmployeeData?.profile?.profilephoto || "default.jpeg"} alt={"no img"} />
          </div>
          <div className="w-[70%]">
            <h2 className="text-white">{selectEmployeeData?.profile?.fullname || "no name"}</h2>
            <h2 className="text-gray-500">{selectEmployeeData?.profile?.location || "no location"}</h2>
          </div>
          <div className="w-[18%] mr-2">
            {/* <button
              style={{ backgroundColor: "green" }}
              className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
            >
              Apply
            </button> */}
          </div>
        </div>

        <div>
          <p>
            here will the job title and description
          </p>
        </div>

        <div className="text-white py-5">
          <h5 className="font-bold">{selectEmployeeData?.profession || "no profession"}</h5>
          <h6 className="font-bold">Vacancy: {selectEmployeeData?.vacancy || "no vacancy"}</h6>
          <h6 className="font-bold">Location: {selectEmployeeData?.location || "no location"}</h6>
          <p className="text-[14px] py-3">{selectEmployeeData?.description || "no description"}</p>
        </div>

        <div className="flex ">
          <div className="w-[50%] mr-2">
            <button
            onClick={handleSelectEmployee}
              style={{ backgroundColor: "green" }}
              className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
            >
              Select for this job
            </button>
          </div>

          <div className="w-[50%] ml-2">
            <button
              style={{ backgroundColor: "" }}
              className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
