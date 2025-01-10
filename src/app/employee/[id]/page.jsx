"use client"
import { getApiCall } from '@/api/fatchData';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
  const [profileData, setprofileData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiCall(`user/public/get/${id}`);
        setprofileData(data?.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log({profileData})

  if (!profileData ){
    return       <div className="flex items-center justify-center h-[500px]">
    <div className="w-16 h-16 m-auto border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
</div>
  }
  return (
    <>
    <div className="lg:rounded-r-[20px] container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
        <div className="w-[100%]">
            <img className='w-full lg:min-h-[200px] min-h-[100px] rounded-[20px] bg-gray-500' src={profileData?.prodile?.coverphoto || "default.jpeg"} alt={"no img"} />
        </div>
    <div className="lg:flex border-b pb-2 border-gray-500">
        <div className="lg:w-[20%]">
            <img className='lg:w-[150px] w-[100px] lg:h-[150px] h-[100px] rounded-[20px] mt-[-50px] bg-gray-300' src={profileData?.prodile?.profilephoto || "default.jpeg"} alt={"no img"} />
        </div>
        <div className="lg:w-[100%] lg:flex items-center w-[80%]">
        <div className="w-[50%]">
        <h2 className="text-white text-[25px] font-[700]">{profileData?.fullname || "no name"}</h2>
        <h2 className="text-gray-500 text-[15px] font-[500]">{profileData?.location || "no location"}</h2>
        </div>
        <div className="w-[50%]">
        <h2 className="text-white text-[20px] font-[700]">{profileData?.profession || "no profession"}</h2>
        <h2 className="text-gray-500 text-[15px] font-[500]">{profileData?.ratting || "0/5"} | {profileData?.jobdone || "0"}</h2>
        </div>
        </div>  
    
    </div>
    
    <div className="text-white py-5">
        <h5 className="font-bold text-[20px]">{profileData?.tittle || "no title"}</h5>
        <p className="font-[500] pt-2 text-[15px]">{profileData?.aboutme || "no abot me"}</p>
    </div>

    

    <div className="flex ">
        <div className="w-[50%] mr-2">
        <button
    style={{ backgroundColor: "green" }}
    // onClick={() => set_feed_type("worker")}
    className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2"
  >
    Contact
  </button>
        </div>



    </div>
</div>
    </>
  )
}
