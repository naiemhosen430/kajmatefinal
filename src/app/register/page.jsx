"use client";
import React, { useContext, useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AuthContex } from "@/context/AuthContex"; 
import { postApiCall } from "@/api/fatchData"; 
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import locationData from "@/app/data/location.json"; 

// Function to extract countries from the location data
const getCountriesFromLocationData = () => {
  return Object.keys(locationData); 
};

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { dispatch } = useContext(AuthContex);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // States for storing country, division, district, area, and upazila
  const [country, setCountry] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [upazila, setUpazila] = useState("");

  // States for the dropdowns (country, division/city, district, area, upazila)
  const [countries, setCountriesList] = useState([]);
  const [divisions, setDivisionsList] = useState([]);
  const [districts, setDistrictsList] = useState([]);
  const [upazilas, setUpazilasList] = useState([]);

  // Initialize the countries list from location data
  useEffect(() => {
    setCountriesList(getCountriesFromLocationData());
  }, []);

  // Fetch the divisions when a country is selected
  useEffect(() => {
    if (country) {
      const countryData = locationData[country];
      
      // Extract the division names from the Divisions array
      const divisionList = countryData?.Divisions.map((division) => division.name);
      
      setDivisionsList(divisionList);
      setDistrictsList([]); 
      setDistrict(""); 
      setArea(""); 
      setUpazilasList([]);
      setUpazila("");
    }
  }, [country]);
  

  // Fetch the districts when a division is selected
  useEffect(() => {
    if (country && division) {
      const divisionData = locationData[country].Divisions.find(
        (d) => d.name === division
      );

      const districts_data = divisionData.districts.map((district_s) => district_s.name);

      setDistrictsList(districts_data);
      setDistrict(""); 
      setArea("");
      setUpazilasList([]);
      setUpazila("");
    }
  }, [country, division]);

  // Fetch the upazilas when a district is selected
  useEffect(() => {
    if (country && division && district) {
      const divisionData = locationData[country].Divisions.find(
        (d) => d.name === division
      );
      const districtData = divisionData.districts.find(
        (d) => d.name === district
      );
      setUpazilasList(districtData ? districtData.upazilas : []);
      setUpazila(""); // Reset upazila when a new district is selected
    }
  }, [country, division, district]);

  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Combine location data in the format "country, division, district, area, upazila"
      const location = `${country}, ${division}, ${district}, ${upazila}, ${area}`;
      const response = await postApiCall("auth/register", { ...data, location });
      if (response?.statusCode === 200) {
        setCookie("accesstoken", response?.token);
        dispatch({ type: "ADD_AUTH_DATA", payload: response?.data || null });
        router.push("/dashboard", { scroll: true });
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error?.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container m-auto lg:p-10 p-2">
      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="lg:flex">
          <div className="lg:w-6/12 hidden lg:block"></div>
          <div className="lg:w-6/12">
          <div elevation={3} className="p-6 mt-10 rounded-lg bg-[#284329] bg-gradient-to-r from-[#2d7c51] to-[#1a4d33] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22%3E%3Cpath d=%22M0 0L2 2L4 0L6 2L8 0L10 2L10 10H0Z%22 fill=%22rgba(255, 255, 255, 0.2)%22/%3E%3C/svg%3E')]">
          <Typography component="h1" variant="h5" color="white" align="center">
                Register
              </Typography>
              {errorMessage && (
                <div className="text-center text-red-950 p-4">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  margin="normal"
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  label="Name"
                  {...register("fullname", { required: true })}
                  error={!!errors.fullname}
                  helperText={errors.fullname ? "Name is required" : ""}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  label="Phone"
                  type="tel"
                  {...register("phone", { required: true })}
                  error={!!errors.phone}
                  helperText={errors.phone ? "Phone is required" : ""}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  label="Email"
                  type="email"
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email ? "Email is required" : ""}
                />

                <div className="flex items-center pt-5">
                  {/* Country Autocomplete */}
                  <Autocomplete
                    className="text-white w-full mr-2"
                    options={countries}
                    sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                    value={country}
                    onChange={(event, newValue) => setCountry(newValue)}
                    renderInput={(params) => <TextField {...params}        sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }} label="Country" />}
                  
                  />

                  {/* Division Autocomplete */}
                  <Autocomplete
                    className="text-white w-full ml-2"
                    options={divisions}
                    value={division}
                    sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                    onChange={(event, newValue) => setDivision(newValue)}
                    renderInput={(params) => <TextField {...params}        sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }} label="Division (City)" />}
                    disabled={!country} // Disable until country is selected
                  />
                </div>

                {/* District Autocomplete */}
                <Autocomplete
                  className="text-white w-full"
                  options={districts}
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  value={district}
                  onChange={(event, newValue) => setDistrict(newValue)}
                  renderInput={(params) => <TextField {...params}        sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }} label="District" />}
              
                  disabled={!division} // Disable until division is selected
                />

                {/* Upazila Autocomplete */}
                <Autocomplete
                  className="text-white w-full"
                  options={upazilas}
                  value={upazila}
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  onChange={(event, newValue) => setUpazila(newValue)}
                  renderInput={(params) => <TextField {...params}        sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }} label="Upazila" />}
                  disabled={!district} // Disable until district is selected
                />

                {/* Area Text Field */}
                <TextField
                  fullWidth
                  label="Area"
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  disabled={!district} // Disable until district is selected
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  sx={{
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                  label="Password"
                  type="password"
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password ? "Password is required" : ""}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="mt-4 bg-slate-900 text-white"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>

                <Typography variant="body2" className="pt-5 text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600">
                    Login
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
