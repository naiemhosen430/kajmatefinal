"use client"
import { getApiCall, patchApiCall, postApiCall } from '@/api/fatchData';
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

   const handleSelectEmployrr = async () => {
    try {
      
    } catch (error) {
      
    }
    }

  // handling select employee 
  const handleSelectEmployee = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const data = await patchApiCall(`help/select/hire/${job_id + "and" + person_id}`);
      const response = await postApiCall(`message/create/${person_id}`, { job_id });

      if (response?.statusCode === 200) {
        router.push(`/message/${response?.data?._id}`, { scroll: true });
      }

    } catch (error) {
      setError("Error hiring the employee.");
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
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
      <div className="lg:rounded-r-[20px] container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full overflow-hidden overflow-y-auto bg-[#023020]">
        <div className="lg:rounded-r-[20px] container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full overflow-hidden overflow-y-auto bg-[#023020]">
          <div className="lg:flex border-b pb-2 border-gray-500">
            <div className="lg:w-[20%]">
              <img
                className="lg:w-[150px] w-[100px] lg:h-[150px] h-[100px] rounded-[20px] mt-[-50px] bg-gray-300"
                src={
                  selectEmployeeData?.user_data?.profilephoto || "default.jpeg"
                }
                alt={"no img"}
              />
            </div>
            <div className="lg:w-[100%] lg:flex items-center w-[80%]">
              <div className="w-[50%]">
                <h2 className="text-white text-[25px] font-[700]">
                  {selectEmployeeData?.user_data?.fullname || "no name"}
                </h2>
                <h2 className="text-gray-500 text-[15px] font-[500]">
                  {selectEmployeeData?.user_data?.location || "no location"}
                </h2>
              </div>
              <div className="w-[50%]">
                <h2 className="text-white text-[20px] font-[700]">
                  {selectEmployeeData?.user_data?.profession || "no profession"}
                </h2>
                <h2 className="text-gray-500 text-[15px] font-[500]">
                  {selectEmployeeData?.user_data?.ratting || "0/5"} |{" "}
                  {selectEmployeeData?.user_data?.jobdone || "0"}
                </h2>
              </div>
            </div>
          </div>

          <div className="text-white py-5">
            <h5 className="font-bold text-[20px]">
              {selectEmployeeData?.user_data?.tittle || "no title"}
            </h5>
            <p className="font-[500] pt-2 text-[15px]">
              {selectEmployeeData?.user_data?.aboutme || "no abot me"}
            </p>
          </div>
        </div>

        <div className="pb-5">
          <p>
            <div className='text-white' dangerouslySetInnerHTML={{
              __html:selectEmployeeData?.job_result?.description
            }}>

            </div>
          </p>
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
