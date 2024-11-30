"use client";
import { TextField, Radio, RadioGroup, FormControlLabel, Autocomplete, FormLabel, FormControl, Box } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { AuthContex } from "@/context/AuthContex";
import { postApiCall } from "@/api/fatchData";
import { useRouter } from "next/navigation";

export default function HelpMeWith() {
  const { state } = useContext(AuthContex);
  const user = state?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter_options, set_filter_option] = useState({
    profession: "",
    area: "",
    description: "",
    owner_id: "",
    need_type: ""
  });

  useEffect(() => {
    if (user) {
      set_filter_option((predata) => {
        return {
          ...predata,
          owner_id: user?._id
        };
      });
    }
  }, [user]);

  const dhakaDivisionAreas = [
    "Dhaka City",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Netrokona",
    "Rajbari",
    "Shariatpur",
    "Tangail",
    "Mymensingh",
  ];

  const professions = [
    "Software Engineer",
    "Doctor",
    "Teacher",
    "Artist",
    "Designer",
    "Writer",
    "Musician",
  ];

  const createHelo = async (data) => {
    console.log("hello");
    setLoading(true);
    try {
      const response = await postApiCall(`help/create`, filter_options);
      console.log(response?.statusCode);
      if (response?.statusCode === 200) {
        router.push("/dashboard", { scroll: true });
      }
    } catch (error) {
      console.log("Error during registration:", error);
      setErrorMessage(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center py-[40px] justify-center">
              <div className="lg:flex items-center justify-center">
                <h1 className="text-white lg:text-[25px] text-[15px] font-[700] mr-2">
                  {!filter_options.profession
                    ? "Help Me With"
                    : !filter_options.area
                    ? "Select Area"
                    : ""}
                  {filter_options.profession && filter_options.area && "Write What needs"}
                </h1>

                {/* Profession Autocomplete */}
                {!filter_options.profession && (
                  <Autocomplete
                    disablePortal
                    value={filter_options.profession}
                    onChange={(event, newValue) =>
                      set_filter_option((prev_options) => ({
                        ...prev_options,
                        profession: newValue,
                      }))
                    }
                    options={professions}
                    sx={{
                      width: 300,
                      "& .MuiInputBase-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                      },
                      "& .MuiFormLabel-root": {
                        color: "white",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Profession" className="text-sm lg:text-base" />
                    )}
                  />
                )}

                {/* Area Autocomplete */}
                {filter_options.profession && !filter_options.area && (
                  <Autocomplete
                    disablePortal
                    value={filter_options.area}
                    onChange={(event, newValue) =>
                      set_filter_option((prev_options) => ({
                        ...prev_options,
                        area: newValue,
                      }))
                    }
                    options={dhakaDivisionAreas}
                    sx={{
                      width: 300,
                      "& .MuiInputBase-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                      },
                      "& .MuiFormLabel-root": {
                        color: "white",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Area" className="text-sm lg:text-base" />
                    )}
                  />
                )}

                {/* Description */}
                {filter_options.profession && filter_options.area && (
                  <>
                    <TextField
                      value={filter_options.description}
                      onChange={(e) =>
                        set_filter_option((prev_data) => ({
                          ...prev_data,
                          description: e.target.value,
                        }))
                      }
                      label="Write description"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      className="text-white text-sm lg:text-base p-2 px-4"
                      sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray",
                          },
                          "&:hover fieldset": {
                            borderColor: "#007bff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#007bff",
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                        },
                      }}
                      helperText="Provide a brief description for your filter"
                    />
                  </>
                )}
              </div>
            </div>

            {filter_options.profession && filter_options.area && (
              <div className="container">
                <div className="lg:w-6/12 m-auto p-5 w-12/12">
                  <TextField
                    type="datetime-local"
                    value={filter_options.date}
                    onChange={(e) =>
                      set_filter_option((prev_data) => ({
                        ...prev_data,
                        end_date: e.target.value,
                      }))
                    }
                    label="Available Date & Time"
                    fullWidth
                    variant="outlined"
                    className="text-white text-sm lg:text-base p-2 px-4"
                    sx={{
                      marginBottom: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray",
                        },
                        "&:hover fieldset": {
                          borderColor: "#007bff",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007bff",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      },
                    }}
                  />

                  <FormControl
                    component="fieldset"
                    sx={{
                      marginBottom: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RadioGroup
                      value={filter_options.priority}
                      onChange={(e) =>
                        set_filter_option((prev_data) => ({
                          ...prev_data,
                          need_type: e.target.value,
                        }))
                      }
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        value="urgent"
                        control={<Radio sx={{ color: "white" }} />}
                        label="Urgent"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "white",
                          },
                          marginRight: 3,
                        }}
                      />
                      <FormControlLabel
                        value="later"
                        control={<Radio sx={{ color: "white" }} />}
                        label="Later"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "white",
                          },
                          marginRight: 3,
                        }}
                      />
                      <FormControlLabel
                        value="confused"
                        control={<Radio sx={{ color: "white" }} />}
                        label="Confused"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "white",
                          },
                          marginRight: 3,
                        }}
                      />
                      <FormControlLabel
                        value="verlater"
                        control={<Radio sx={{ color: "white" }} />}
                        label="Verlater"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "white",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            )}

            <div className="w-full">
              {filter_options.profession &&
                filter_options.area &&
                filter_options.end_date &&
                filter_options.need_type &&
                filter_options.description && (
                  <div className="text-center">
                    <button
                      onClick={createHelo}
                      className="p-4 px-5 rounded-lg text-[15px] font-[700] text-white bg-slate-500"
                    >
                      Submit
                    </button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
