import { getApiCall } from '@/api/fatchData';
import Link from 'next/link';
import React from 'react';

// Server-side metadata function
export async function generateMetadata({ params }) {
  const { id } = await params; // Make sure to await the params

  // Fetching job data from the server
  let jobData = null;
  try {
    const data = await getApiCall(`help/public/get/${id}`);
    console.log({data,id})
    jobData = data?.data || null;
  } catch (error) {
    console.error("Error fetching job data:", error);
  }

  console.log(jobData)

  // If no job data exists, you can return default metadata.
  if (!jobData) {
    return {
      title: "Job Not Found",
      description: "The job opportunity you're looking for is not available.",
      openGraph: {
        type: "website",
        title: "Job Not Found",
        description: "The job opportunity you're looking for is not available.",
        image: "/default.jpeg",
        url: "https://kajmate.vercel.app", // Add your fallback URL
      },
      twitter: {
        card: "summary_large_image",
        title: "Job Not Found",
        description: "The job opportunity you're looking for is not available.",
        image: "/default.jpeg",
        url: "https://kajmate.vercel.app", // Add your fallback URL
      },
    };
  }

  return {
    title: `${jobData?.profession || "Job Opportunity"}`,
    description: `Find a job opportunity for ${jobData?.prodile?.fullname} in ${jobData?.location}.`,
    openGraph: {
      type: "website",
      title: `${jobData?.profession} job opportunity`,
      description: `Find a job opportunity for ${jobData?.prodile?.fullname} in ${jobData?.location}.`,
      image: jobData?.prodile?.profilephoto || "/default.jpeg",
      url: `https://kajmate.vercel.app/job/${id}`, // Update with your dynamic job URL
    },
    twitter: {
      card: "summary_large_image",
      title: `${jobData?.profession} job opportunity`,
      description: `Find a job opportunity for ${jobData?.prodile?.fullname} in ${jobData?.location}.`,
      image: jobData?.prodile?.profilephoto || "/default.jpeg",
      url: `https://kajmate.vercel.app/job/${id}`, // Update with your dynamic job URL
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params; // Make sure to await params here as well
  
  // Fetching the job data (server-side)
  let jobData = null;
  try {
    const data = await getApiCall(`help/public/get/${id}`);
    jobData = data?.data || null;
  } catch (error) {
    console.error("Error fetching job data:", error);
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobData?.profession + " job opportunity",
        text: `Check out this job for ${jobData?.prodile?.fullname} at ${jobData?.location}. More details here.`,
        url: currentUrl,  // Now using the dynamically set URL
      })
      .then(() => console.log('Job shared successfully!'))
      .catch((error) => console.error('Error sharing job:', error));
    } else {
      // Fallback if the Web Share API is not supported
      alert('Your device does not support sharing');
    }
  };

  if (!jobData) {
    return (
      <div>
        <h1>Job Not Found</h1>
        <p>The job opportunity you're looking for is not available.</p>
      </div>
    );
  }

  return (
    <div className="lg:rounded-r-[20px] lg:p-[20px] p-5 py-10 rounded-t-[20px] overflow-hidden overflow-y-auto bg-[#023020]">
      <div className='container m-auto'>
        <div className="flex border-b pb-2 border-gray-500">
          <div className="lg:w-[10%] w-[20%]">
            <img className='rounded-full h-[50px] w-[50px]' src={jobData?.prodile?.profilephoto ? jobData?.prodile?.profilephoto === "default.jpeg" ? "/default.jpeg" : jobData?.prodile?.profilephoto : "/default.jpeg"} alt={"no img"} />
          </div>
          <div className="lg:w-[72%] w-[60%]">
            <h2 className="text-white">{jobData?.prodile?.fullname || "no name"}</h2>
            <h2 className="text-gray-500">{jobData?.prodile?.location || "no location"}</h2>
          </div>
          <div className="lg:w-[18%] mr-2">
            <button onClick={handleShare} className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2">
              Share
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
            <div className="text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: jobData?.description }} />
          </div>
        </div>

        <div className="flex">
          <div className="w-[50%] mr-2">
            <Link href={`/job/apply/${jobData?._id}`}>
              <button style={{ backgroundColor: "green" }} className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2">
                Apply
              </button>
            </Link>
          </div>

          <div className="w-[50%] ml-2">
            <button className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500  mr-2">
              Save For Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
