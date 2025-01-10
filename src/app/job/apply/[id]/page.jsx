"use client"
import { getApiCall, postApiCall } from '@/api/fatchData';
import { AuthContex } from '@/context/AuthContex';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Snackbar } from '@mui/material';

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
      if (response?.data) {
        setSuccess(true);
        router.push("/thankyou/Successfully applied on the job", { scroll: true });
      } else {
        setError(response?.message || "Failed to apply. Try again.");
      }
    } catch (err) {
      console.error("Error during application:", err);
      setError("An error occurred while submitting your application.");
    } finally {
      setLoading(false);
    }
  };

  console.log(jobData)

  if (!jobData) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="lg:rounded-r-[20px] lg:w-6/12  container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
      <div className="flex m-auto border-b pb-2 border-gray-500">
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
      </div>

      <div className="text-white py-5">
        <h5 className="font-bold">{jobData?.profession || "no profession"}</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            disabled
            className="w-full px-4 py-2 rounded-md text-white bg-transparent border border-white focus:outline-none"
            placeholder="Full Name"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled
            className="w-full px-4 py-2 rounded-md text-white bg-transparent border border-white focus:outline-none mt-4"
            placeholder="Phone"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
            className="w-full px-4 py-2 rounded-md text-white bg-transparent border border-white focus:outline-none mt-4"
            placeholder="Email"
          />
          <input
            type="number"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md text-white bg-transparent border border-white focus:outline-none mt-4"
            placeholder="Expected Salary"
            required
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
