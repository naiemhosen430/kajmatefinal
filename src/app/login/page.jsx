"use client";
import React, { useContext, useState } from "react";
import { TextField, Button, Typography, Paper, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { postApiCall } from "@/api/fatchData";
import { setCookie } from "cookies-next";
import { AuthContex } from "@/context/AuthContex";
import { useRouter } from "next/navigation";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const { dispatch } = useContext(AuthContex);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postApiCall(`auth/login`, data);
      if (response?.statusCode === 200) {
        setCookie("accesstoken", response?.token);
        dispatch({ type: "ADD_AUTH_DATA", payload: response?.data || null });
        router.push("/dashboard", { scroll: true });
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(error?.message);
      // Manage error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container m-auto lg:w-4/12 lg:p-10 p-2">
    {loading ? 
      <div className="flex items-center justify-center h-[500px]">
    <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
</div>

:

<div elevation={3} className="p-6 mt-10 rounded-lg bg-[#284329] bg-gradient-to-r from-[#2d7c51] to-[#1a4d33] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22%3E%3Cpath d=%22M0 0L2 2L4 0L6 2L8 0L10 2L10 10H0Z%22 fill=%22rgba(255, 255, 255, 0.2)%22/%3E%3C/svg%3E')]">
<Typography variant="h5" className="mb-4 text-white text-center">
          Login
        </Typography>
        {errorMessage && 
          <Typography variant="p" className="mb-4 text-[15px] text-gray-500 text-center">
          {errorMessage}
        </Typography>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className=" border text-white"
            fullWidth
            sx={{
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
            margin="normal"
            label="Email"
            type="email"
            {...register("email", { required: true })} // Use register here
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            className=" border text-white"
            fullWidth
            sx={{
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
            margin="normal"
            label="Password"
            type="password"
            {...register("password", { required: true })} // Use register here
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-4 bg-slate-900 text-white"
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" className="pt-5 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </Typography>
      </div>
    }
    </div>
  );
}
