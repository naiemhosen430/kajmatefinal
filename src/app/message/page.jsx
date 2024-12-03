"use client"
import { MessageContext } from '@/context/MessageContext'
import {useContext, useState,useEffect} from 'react'

export default function PAGE() {
    const [feed_type,set_feed_type] = useState("all")
    const [display_message,set_display_message] = useState(null)
    const {messageState} = useContext(MessageContext)

    useEffect(()=>{
      set_display_message(messageState?.messages)
    },[messageState,feed_type])
  return (
    <>
        <div className='container m-auto lg:px-5 pz-2'>
        <div className="flex items-center justify-center pt-5">
        <button
          style={{ backgroundColor: feed_type === "all" ? "green" : "" }}
          onClick={() => set_feed_type("all")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] mr-2"
        >
          All
        </button>

        <button
          style={{ backgroundColor: feed_type === "unseen" ? "green" : "" }}
          onClick={() => set_feed_type("unseen")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] mx-2"
        >
          Unseen
        </button>

        <button
          style={{ backgroundColor: feed_type === "nonreplied" ? "green" : "" }}
          onClick={() => set_feed_type("nonreplied")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[40%] ml-2"
        >
          Un Replied
        </button>
      </div>



      <div>
        {display_message ? 
        <>
          {display_message?.length > 0 ?
          <>
            {display_message?.map((s_message,inx)=>(

              <div className="rounded-[20px] hover:bg-gray-800 p-3 flex items-center" key={inx}>
                <img className="h-[50px] w-[50px] rounded-full" src={s_message?.profile?.profilephoto} alt={""} />
                <div>
                  <h1 className="font-[700] text-[20px] text-white">{s_message?.profile?.fullname}</h1>
                  <p className="font-[500] text-[15px] text-white">{s_message?.chats[-1].text}</p>
                </div>
              </div>
            ))}
          </>
           :             <p className="text-center text-white p-10">No message found</p>}
        </>
        :       <div className="flex items-center justify-center h-[500px]">
    <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
</div>}
      </div>
        </div>
    </>
  )
}
