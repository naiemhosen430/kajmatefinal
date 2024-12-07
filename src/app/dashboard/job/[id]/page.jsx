"use client";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { getApiCall } from "@/api/fatchData";
import AppliedPersonCart from "../../_components/carts/AppliedPersonCart";

export default function page() {
  const [jobData, setJobData] = useState(null);
  const [page_type, set_page_type] = useState("apply");
  let { id } = useParams();

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

console.log(jobData)

  if (!jobData ){
    return       <div className="flex items-center justify-center h-[500px]">
    <div className="w-16 h-16 m-auto border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
</div>
  }
  return (
    <>
       <div className="flex items-center p-5">
        <button
          style={{ backgroundColor: page_type === "apply" ? "green" : "" }}
          onClick={() => set_page_type("apply")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[100%] mr-2"
        >
          Applied
        </button>

        <button
          style={{ backgroundColor: page_type === "details" ? "green" : "" }}
          onClick={() => set_page_type("details")}
          className="p-1 px-4 text-[12px] lg:text-[20px] rounded-lg text-white border border-gray-500 w-[100%] ml-2"
        >
          Details
        </button>

      </div>

        {/* Feed section */}
        {page_type === "apply" ? (
        <div className="p-2">
          {jobData?.applied_users ? (
            jobData?.applied_users.length > 0 ? (
              jobData?.applied_users.map((s_user, i) => (
                <div key={i}>
                  <AppliedPersonCart job_id={jobData?._id} data={s_user} />
                </div>
              ))
            ) : (
              <div>

              <p className="text-center w-full text-white p-10">Nobody applied</p>
              </div>
            )
          ) : loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
        <div className="text-white p-5">
        <h5 className="font-bold border-b border-gray-500">{jobData?.profession}</h5>
        <p className="py-2">{jobData?.description}</p>
    </div>
        </div>
      )}
    </>
  );
}