"use client"
import { getApiCall, postApiCall } from '@/api/fatchData';
import { AuthContex } from '@/context/AuthContex';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, TextField, Snackbar } from '@mui/material';

export default function Page() {
  const { state } = useContext(AuthContex);
  const user = state?.user;
  let { message } = useParams();
  const router = useRouter();

  return (
    <div className="lg:rounded-r-[20px] container m-auto lg:p-[20px] p-5 py-10 rounded-t-[20px] w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
      <div className="text-white py-5">
        <h5 className="font-[700] p-5 text-[25px] text-center">{"Congratulations!"}</h5>
        <h5 className="font-[500] text-[12px] text-center">{decodeURIComponent(message) || "No message"}</h5>
      </div>

      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/dashboard")}
          className="w-[200px] mt-4"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
