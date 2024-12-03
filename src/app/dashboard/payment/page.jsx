"use client"
import {useState} from 'react'
import { TextField, Button, Typography, Paper, Container } from "@mui/material";
import { useForm } from "react-hook-form";

export default function page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const [loading, setLoading] = useState(false);
      const [errorMessage,setErrorMessage] = useState("")

      const onSubmit = async (data) => {
        setLoading(true);
        try {
          const response = await postApiCall(`user/withdraw`, data);
          if (response?.statusCode === 200) {

          } else {
          }
        } catch (error) {
          console.log("Error during registration:", error);
          setErrorMessage(error?.message);
          // Manage error state
        } finally {
          setLoading(false);
        }
      };
    
  return (
    <>
    <div className="p-5">

    <div className="lg:flex items-center bg-[#1B1212] p-5">
        <div className="lg:w-6/12 w-full text-center">
<h1 className="text-[30px] font-[700] text-white">0 taka</h1>
<h5 className="text-gray-100 font-[500] text-[20px]">Balance</h5>
        </div>
        <div className="lg:w-6/12 w-full lg:text-left text-center">
        <form onSubmit={handleSubmit(onSubmit)}>

        <TextField
            className=" border border-white text-white"
            fullWidth
            sx={{
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputBase-label": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
            margin="normal"
            label="Ammount"
            type="number"
            {...register("ammount", { required: true })} 
            error={!!errors.ammount}
            helperText={errors.ammount ? "Ammount is required" : ""}
          />

<Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-4 bg-slate-900 text-white"
          >
            Withdraw
          </Button>
        </form>
</div>
    </div>


    <div className="py-5 mt-5">
        <div className="flex items-center p-3 bg-gray-900">
<h5 className="text-white p-2 w-4/12">Date</h5>
<h5 className="text-white p-2 w-4/12">Ammount</h5>
<h5 className="text-white p-2 w-4/12">Status</h5>
        </div>
    </div>

    <div>

<p className="text-center w-full text-white p-10">No tranction history!</p>
</div>

    </div>
    </>
  )
}
 