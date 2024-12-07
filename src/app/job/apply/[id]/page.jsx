"use client"
import { getApiCall, postApiCall } from '@/api/fatchData';
import { AuthContex } from '@/context/AuthContex';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, TextField, Snackbar } from '@mui/material';

export default function Page() {
  const [jobData, setJobData] = useState(null);
  const { state } = useContext(AuthContex);
  const router = useRouter()
  const user = state?.user;
  let { id } = useParams();

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    applier_id: '',
    expectedSalary: '',
    job_id: id
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData((predata_app) => {
      return {
        ...predata_app,
        fullname: user?.fullname,
        email: user?.email,
        phone: user?.phone,
        applier_id: user?._id,
      }
    })
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiCall(`help/public/get/${id}`);
        setJobData(data?.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Error fetching job data");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await postApiCall(`help/apply/${formData?.job_id}`, formData);
      if (response?.data){

        setSuccess(true);
        router.push("/thankyou/Successfully applied on the job", { scroll: true });
      } else {

        setError("Failed to apply. Try again.");
      }
    } catch (err) {
      console.error("Error during application:", err);
      setError("An error occurred while submitting your application.");
    } finally {
      setLoading(false);
    }
  };

  if (!jobData) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="lg:rounded-r-[20px] container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
      <div className="flex border-b pb-2 border-gray-500">
        <div className="w-[12%]">
          <img
            src={jobData?.profile?.profilephoto || "default.jpeg"}
            alt={"no img"}
          />
        </div>
        <div className="w-[70%]">
          <h2 className="text-white">{jobData?.profile?.fullname || "no name"}</h2>
          <h2 className="text-gray-500">{jobData?.profile?.location || "no location"}</h2>
        </div>
        <div className="w-[18%] mr-2">
          <Button
            style={{ backgroundColor: "green" }}
            className="p-1 px-4 text-[12px] lg:text-[20px] w-full rounded-lg text-white border border-gray-500 mr-2"
          >
            Contact
          </Button>
        </div>
      </div>

      <div className="text-white py-5">
        <h5 className="font-bold">{jobData?.title || "no profession"}</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <TextField
            fullWidth
            style={{
              outline: "1px solid white",
            }}
            label="Full Name"
            sx={{
              color: "white",
              "& .MuiInputBase-root": {
                borderColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            style={{
              outline: "1px solid white",
            }}
            label="Phone"
            sx={{
              color: "white",
              "& .MuiInputBase-root": {
                borderColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            style={{
              outline: "1px solid white",
            }}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            sx={{
              color: "white",
              "& .MuiInputBase-root": {
                borderColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            required
            readOnly
            type="email"
          />
          <TextField
            fullWidth
            style={{
              outline: "1px solid white",
            }}
            sx={{
              color: "white",
              "& .MuiInputBase-root": {
                borderColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            label="Expected Salary"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            type="number"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? <CircularProgress size={24} /> : "Apply"}
          </Button>
        </div>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Application submitted successfully"
      />

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
        />
      )}
    </div>
  );
}
