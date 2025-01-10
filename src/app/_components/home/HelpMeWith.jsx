"use client";
import React, { useState, useContext, useEffect } from "react";
import { AuthContex } from "@/context/AuthContex";
import { getApiCall, postApiCall } from "@/api/fatchData";
import { useRouter } from "next/navigation";
import  JoditEditor  from "jodit-react"; 

export default function HelpMeWith() {
  const { state } = useContext(AuthContex);
  const user = state?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter_options, set_filter_option] = useState({
    profession: "",
    area: "",
    description: "",
    owner_id: "",
    need_type: "",
    end_date: "",
  });
  const [step, setStep] = useState(1); // To handle steps

  useEffect(() => {
    if (user) {
      set_filter_option((predata) => ({
        ...predata,
        owner_id: user?._id,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getApiCall(`location/get`);
        if (response?.statusCode === 200) {
          setAllLocations(response?.data?.map((s_location) => s_location?.name));
        }
      } catch (error) {
        console.log("Error during registration:", error);
        setErrorMessage(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const professions = [
    "Software Engineer",
    "Doctor",
    "Teacher",
    "Artist",
    "Designer",
    "Writer",
    "Musician",
  ];

  const createHelo = async () => {
    setLoading(true);
    try {
      const response = await postApiCall("help/create", filter_options);
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
    <div className="w-full h-auto p-6 bg-gray-800 text-white">
      {loading || !allLocations.length ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center py-8">
            <div className="lg:w-8/12 w-full p-6 bg-gray-700 rounded-lg shadow-xl">
              <h1 className="text-center text-xl lg:text-2xl font-semibold mb-6">
                {step === 1 && "Step 1: Select Profession"}
                {step === 2 && "Step 2: Select Area"}
                {step === 3 && "Step 3: Write Description"}
                {step === 4 && "Step 4: Set Available Time & Priority"}
              </h1>

              {/* Profession Selection */}
              {step === 1 && (
                <div className="mb-4">
                  <label htmlFor="profession" className="block text-lg font-medium mb-2">
                    Select Profession
                  </label>
                  <input
                    list="professions"
                    id="profession"
                    value={filter_options.profession}
                    onChange={(e) =>
                      set_filter_option((prev_options) => ({
                        ...prev_options,
                        profession: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <datalist id="professions">
                    {professions.map((profession, index) => (
                      <option key={index} value={profession} />
                    ))}
                  </datalist>
                </div>
              )}

              {/* Area Selection */}
              {step === 2 && filter_options.profession && (
                <div className="mb-4">
                  <label htmlFor="area" className="block text-lg font-medium mb-2">
                    Select Area
                  </label>
                  <input
                    list="areas"
                    id="area"
                    value={filter_options.area}
                    onChange={(e) =>
                      set_filter_option((prev_options) => ({
                        ...prev_options,
                        area: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <datalist id="areas">
                    {allLocations.map((location, index) => (
                      <option key={index} value={location} />
                    ))}
                  </datalist>
                </div>
              )}

              {/* Description Input (Jodit Editor) */}
              {step === 3 && filter_options.profession && filter_options.area && (
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">Write a description</label>
                  <JoditEditor
                    value={filter_options.description}
                    onChange={(newDescription) =>
                      set_filter_option((prev_data) => ({
                        ...prev_data,
                        description: newDescription,
                      }))
                    }
                    config={{
                      placeholder: "Provide details of your job...",
                      height: 500
                    }}
                  />
                </div>
              )}

              {/* Date and Time Picker */}
              {step === 4 && filter_options.profession && filter_options.area && (
                <div className="mb-6">
                  <label htmlFor="end_date" className="block text-lg font-medium mb-2">
                    Available Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="end_date"
                    value={filter_options.end_date}
                    onChange={(e) =>
                      set_filter_option((prev_data) => ({
                        ...prev_data,
                        end_date: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Need Type Radio Buttons */}
              {step === 4 && (
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">Need Type</label>
                  <div className="flex space-x-4">
                    <label className="text-white">
                      <input
                        type="radio"
                        value="urgent"
                        checked={filter_options.need_type === "urgent"}
                        onChange={(e) =>
                          set_filter_option((prev_data) => ({
                            ...prev_data,
                            need_type: e.target.value,
                          }))
                        }
                        className="mr-2"
                      />
                      Urgent
                    </label>
                    <label className="text-white">
                      <input
                        type="radio"
                        value="later"
                        checked={filter_options.need_type === "later"}
                        onChange={(e) =>
                          set_filter_option((prev_data) => ({
                            ...prev_data,
                            need_type: e.target.value,
                          }))
                        }
                        className="mr-2"
                      />
                      Later
                    </label>
                    <label className="text-white">
                      <input
                        type="radio"
                        value="confused"
                        checked={filter_options.need_type === "confused"}
                        onChange={(e) =>
                          set_filter_option((prev_data) => ({
                            ...prev_data,
                            need_type: e.target.value,
                          }))
                        }
                        className="mr-2"
                      />
                      Confused
                    </label>
                    <label className="text-white">
                      <input
                        type="radio"
                        value="verlater"
                        checked={filter_options.need_type === "verlater"}
                        onChange={(e) =>
                          set_filter_option((prev_data) => ({
                            ...prev_data,
                            need_type: e.target.value,
                          }))
                        }
                        className="mr-2"
                      />
                      Verlater
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons (Next/Back) */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 focus:outline-none"
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={createHelo}
                    className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
