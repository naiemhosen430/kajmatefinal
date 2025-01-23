import React, { useState } from 'react';
import PersonModal from '../modals/PersonModal';

export default function PersonCart({ personData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
      <div 
        className="w-[300px] p-4 m-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img 
            src={personData?.profilephoto || 'default.jpeg'} 
            alt={personData?.fullname} 
            className="w-[100px] h-[100px] rounded-full object-cover mx-auto border-4 border-gray-200 mb-4"
          />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-gray-800">{personData?.fullname}</h3>
            <h5 className="text-sm text-gray-600">{personData?.aboutme?.slice(0,200)}</h5>
            <p className="text-sm text-gray-600">{personData?.tittle}</p>
            <div className="mt-2">
              <button className="text-blue-500 hover:underline">View Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Person Modal */}
      {isModalOpen && (
        <PersonModal 
          personData={personData} 
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
