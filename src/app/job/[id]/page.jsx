"use client"
import { getApiCall } from '@/api/fatchData';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
  const [jobData, setJobData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiCall(`help/public/get/${id}`);
        setJobData(data?.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);


//   if (!jobData ){
//     return       <div className="flex items-center justify-center h-[500px]">
//     <div className="w-16 h-16 m-auto border-4 border-t-4 border-black border-solid rounded-full animate-spin"></div>
// </div>
//   }
   console.log(jobData);
  return (
    <>
    <div className="lg:rounded-r-[20px] lg:p-[20px] p-5 py-10 rounded-t-[20px] overflow-hidden overflow-y-auto bg-[#023020]">
  <div className='container m-auto'>

    <div className="flex border-b pb-2 border-gray-500">
        <div className="w-[12%]">
            <img src={jobData?.prodile?.profilephoto || "default.jpeg"} alt={"no img"} />
        </div>
        <div className="w-[70%]">
        <h2 className="text-white">{jobData?.prodile?.fullname || "no name"}</h2>
        <h2 className="text-gray-500">{jobData?.prodile?.location || "no location"}</h2>
        </div>
        <div className="w-[18%] mr-2">
        <button
    style={{ backgroundColor: "green" }}
    // onClick={() => set_feed_type("worker")}
    className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
  >
    Apply
  </button>
        </div>
    </div>
    
    <div className="text-white py-5">
        <h5 className="font-bold">{jobData?.profession + " need" || "N/A"}</h5>
        <h6 className="font-bold">Vacency: {jobData?.vacency || "N/A"}</h6>
        <h6 className="font-bold">Location: {jobData?.location || "N/A"}</h6>
        <h6 className="font-bold">Job type: {jobData?.type || "N/A"}</h6>
        <br />

        <div>

        <div 
            className="text-gray-300 text-justify" 
            dangerouslySetInnerHTML={{
              __html: jobData?.description
            }}
            />
            </div>
    </div>

    <div className="flex ">
        <div className="w-[50%] mr-2">
        <button
    style={{ backgroundColor: "green" }}
    // onClick={() => set_feed_type("worker")}
    className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
  >
    Apply
  </button>
        </div>

        <div className="w-[50%] ml-2">
        <button
    style={{ backgroundColor: "" }}
    // onClick={() => set_feed_type("worker")}
    className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
  >
    Save For Later
  </button>
        </div>

    </div>
  </div>
</div>
    </>
  )
}
