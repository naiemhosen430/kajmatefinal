import React from 'react'

export default function OwnerShip() {
  return (
    <>
        <div className="bg-[#2d4148] p-5">
            <div className="container m-auto lg:flex items-center justify-between">
                <div className="lg:w-8/12 lg:pr-5">
                    <h1 className="text-[30px] text-black font-[700]">OwnerShip and development</h1>
                    <p className="text-gray-100 ltext-[20px] font-[500]">Ownership, founding, planing and development are by MD Naiem Hosen. Naiem is a software developer. Kajmate is a platform to change and make easy the reqcruitment and job related problem. Here is advance features to help you. We are bringing new features forward.</p>
                </div>
                <div className="lg:w-4/12 ">
                    <div className="h-full bg-white rounded-bl-[200px] overlow-hidden">
                        
                    <img className='w-full rounded-bl-[200px]' src={'/naiem.jpeg'} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
