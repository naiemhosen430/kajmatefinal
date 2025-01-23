import React, { useState } from 'react';
import PersonModal from '../modals/PersonModal';
import { useRouter } from 'next/navigation';

export default function PersonCart({ personData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const handleCardClick = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  console.log(personData)

  return (
    <>
<div
  className="w-full p-4 bg-transparent border border-gray-500 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
  onClick={() => {
    router.push(`/employee/${personData?._id}`, { scroll: true });
  }}
>
        <div >
          <img 
            src={personData?.profilephoto || 'default.jpeg'} 
            alt={personData?.fullname} 
            className="w-[100px] h-[100px] rounded-full object-cover mx-auto border-4 border-gray-200 mb-4"
          />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-white">{personData?.fullname}</h3>
            <h5 className="text-sm text-gray-300">{personData?.aboutme?.slice(0,200)}</h5>
            <p className="text-sm text-gray-600">{personData?.tittle}</p>
            <div className="mt-2">
              <button className="text-blue-500 hover:underline">View Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Person Modal */}
      {/* {isModalOpen && (
        <PersonModal 
          personData={personData} 
          onClose={handleCloseModal}
        />
      )} */}
    </>
  );
}
