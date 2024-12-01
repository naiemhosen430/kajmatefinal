"use client"

import Link from "next/link"

export default function AppliedPersonCart({data}) {
  return (
    <>


    <div className="w-full cursor-pointer flex items-center mx-auto p-4 bg-none border border-gray-500 my-2 rounded-lg shadow-md">
      {/* Cart Header (Title) */}
      <div className="mb-4 flex justify-between items-center">
<img className="w-[20px] h-[20px]" src={data?.profilephoto} alt={"no img"} />
        
      </div>

      <div className="">
      <h2 className="text-xl font-semibold text-white">{data?.fullname}</h2>

      {/* Cart Body (Location and Type) */}
      <div className="flex justify-between items-center text-gray-500 ">
        <div className="flex text-gray-100 text-[10px] w-6/12 items-center">
          <span></span>
        </div>
        <div className="flex text-gray-100 text-[10px] w-2/12 items-center">
          <span></span>
        </div>

        <Link href={`profile/${data?._id}`}>

        <div className="flex text-gray-100 text-[10px] w-2/12 bg-green-500 items-center">
          <span>Profile</span>
        </div>
        </Link>
        <Link href={`chat/${data?.chat_id}`}>

<div className="flex text-gray-100 text-[10px] w-2/12 bg-green-500 items-center">
  <span>Chat</span>
</div>
</Link>
      </div>
      </div>

    </div>
    </>
  )
}
