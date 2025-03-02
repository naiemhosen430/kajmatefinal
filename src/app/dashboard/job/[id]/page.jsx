"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getApiCall } from "@/api/fatchData";
import AppliedPersonCart from "../../_components/carts/AppliedPersonCart";

export default function Page() {
  const [jobData, setJobData] = useState(null);
  const [pageType, setPageType] = useState("apply");
  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiCall(`help/myhelp/get/${id}`);
        setJobData(data?.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Loading state logic
  if (!jobData) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="w-16 h-16 m-auto border-4 border-t-4 border border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center p-5">
        <button
          style={{ backgroundColor: pageType === "apply" ? "green" : "" }}
          onClick={() => setPageType("apply")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-black border border-gray-500 w-[100%] mr-2"
        >
          Applied
        </button>

        <button
          style={{ backgroundColor: pageType === "details" ? "green" : "" }}
          onClick={() => setPageType("details")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-black border border-gray-500 w-[100%] ml-2"
        >
          Details
        </button>
      </div>

      {/* Feed section */}
      {pageType === "apply" ? (
        <div className="p-2">
          {jobData?.applied_users && jobData.applied_users.length > 0 ? (
            jobData.applied_users.map((s_user, i) => (
              <div key={i}>
                <AppliedPersonCart job_id={jobData?._id} data={s_user} />
              </div>
            ))
          ) : (
            <div>
              <p className="text-center w-full text-black p-10">Nobody applied</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-black p-5">
          <h5 className="font-bold border-b border-gray-500">{jobData?.profession}</h5>
          <p className="py-2">{jobData?.description}</p>
          <div
            className="text-white"
            dangerouslySetInnerHTML={{
              __html: jobData?.description, // I assume you wanted to display jobData's description in HTML format.
            }}
          />
        </div>
      )}
    </>
  );
}
