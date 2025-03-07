"use client";
import React from 'react';

export default function ShareBtn({ jobData, currentUrl }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${jobData?.profession} job opportunity`,
        text: `Check out this job for ${jobData?.prodile?.fullname} at ${jobData?.location}. More details here.`,
        url: currentUrl,  // Dynamically set URL
      })
      .then(() => console.log('Job shared successfully!'))
      .catch((error) => console.error('Error sharing job:', error));
    } else {
      // Fallback if the Web Share API is not supported
      alert('Your device does not support sharing');
    }
  };

  return (
    <button onClick={handleShare} className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2">
      Share
    </button>
  );
}
