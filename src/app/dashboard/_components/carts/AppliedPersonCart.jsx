"use client"
import { useState } from "react";
import Link from "next/link";
import { postApiCall } from "@/api/fatchData";
import { useRouter } from "next/navigation";
import { Snackbar, Button } from "@mui/material"; 
import MuiAlert from "@mui/material/Alert"; 

export default function AppliedPersonCart({ data, job_id }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const router = useRouter();

  // Function to handle opening the Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Function to handle the chat creation process
  const chatHandler = async () => {
    setLoading(true);
    try {
      const response = await postApiCall(`message/create/${data?._id}`, { job_id });
      if (response?.statusCode === 200) {
        router.push(`/message/${response?.data?._id}`, { scroll: true });
      } else {
        setErrorMessage("You can't chat with the person.");
        setOpenSnackbar(true); 
      }
    } catch (error) {
      setErrorMessage(error?.message || "An error occurred while creating the message.");
      setOpenSnackbar(true); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full cursor-pointer mx-auto p-4 bg-gray-800 border border-gray-500 my-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        {/* Cart Header (Profile Photo) */}
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full border-2 border-gray-400"
            src={data?.profilephoto || "default.jpeg"}
            alt="Profile"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-white">{data?.fullname}</h2>
            <span className="text-gray-500">{data?.location || "Location not available"}</span>
          </div>
        </div>

        {/* Cart Body (Location and Actions) */}
        <div className="flex text-gray-400 items-center w-full pb-2">
          <span>{data?.tittle || "No title"}</span>
        </div>

        <div className="flex justify-end items-center text-sm">
          <div className="flex space-x-2">
            {/* Profile Link */}
            <Link href={`/select/${job_id}`}>
              <div className="flex justify-center items-center text-white bg-green-600 rounded-md px-4 py-2 hover:bg-green-500 transition-colors duration-200">
                <span className="text-xs">Select</span>
              </div>
            </Link>

                        {/* Profile Link */}
                        <Link href={`/employee/${data?._id}`}>
              <div className="flex justify-center items-center text-white bg-green-600 rounded-md px-4 py-2 hover:bg-green-500 transition-colors duration-200">
                <span className="text-xs">Profile</span>
              </div>
            </Link>

            {/* Chat Link */}
            <div
              onClick={chatHandler}
              className="flex justify-center items-center text-white bg-blue-600 rounded-md px-4 py-2 hover:bg-blue-500 transition-colors duration-200"
            >
              <span className="text-xs">Chat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar for error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Auto close the Snackbar after 6 seconds
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
