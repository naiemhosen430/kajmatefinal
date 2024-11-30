import React from 'react'

export default function JobModal({set_job}) {
  return (
    <>
    <div className="fixed h-screen w-full flex lg:justify-end items-end top-0 left-0 bg-black/50">

<div className="lg:rounded-r-[20px] lg:p-[20px] p-5 rounded-t-[20px] lg:w-6/12 w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
    <div className="flex border-b pb-2 border-gray-500">
        <div className="w-[10%]">
            <img src={""} alt={""} />
        </div>
        <div className="w-[85%]">
        <h2 className="text-white">Microsoft</h2>
        <h2 className="text-gray-500">USA</h2>
        </div>
        <div onClick={() => set_job(null)} className="w-[5%] cursor-pointer text-white">
        close
        </div>
    </div>

    <div className="text-white py-5">
        <h5 className="font-bold">I need a graphic designer</h5>
        <p>I need a graphic designer</p>
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
    Save
  </button>
        </div>

    </div>
</div>

    </div>
    </>
  )
}
