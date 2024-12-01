"use client"
import React, { useState, useEffect,useContext } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { getApiCall } from "@/api/fatchData";
import HelpCart from "./carts/HelpCart";
import { AuthContex } from "@/context/AuthContex";

const fetchHelpData = async () => {
  try {
    
    const response = await getApiCall("help/get-helps");
    console.log({here:response})
    return response?.data
  } catch (error) {
    console.log(error)
  }
};

const fetchWorkHistoryData = async () => {
  try {
    const response = await getApiCall("help/get-applys");
  return response?.data
  } catch (error) {
    console.log(error)
  }

};

export default function OrderSection() {
  const [activeTab, setActiveTab] = useState(0);

  const { state } = useContext(AuthContex);
  const [helpData, setHelpData] = useState(null);
  const [workHistoryData, setWorkHistoryData] = useState(null);

  useEffect(() => {
    console.log(activeTab)
    if (activeTab === 0) {
      fetchHelpData().then((data) => setHelpData(data));
    } else if (activeTab === 1) {
      fetchWorkHistoryData().then((data) => setWorkHistoryData(data));
    }
  }, [activeTab,state]);




  return (
    <Box className="w-full p-4">
      {/* MUI Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        aria-label="tabs"
        className="bg-none border-2 border-gray-500 text-white rounded-lg shadow-md"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab className="text-white" label="My Help" />
        <Tab className="text-white" label="Work History" />
      </Tabs>

      {/* Tab Content */}
      <Box className="mt-4">
        {activeTab === 0 && helpData && (
          <Box className=" bg-none rounded-lg shadow-lg">
          {helpData?.length === 0 &&
          <p className="text-center text-white p-10">No data found</p>
          }
          {helpData?.slice().reverse()?.map((single_mydata, i)=>(

          <HelpCart key={i} title={single_mydata?.description} need_type={single_mydata?.need_type} id={single_mydata?._id} profession={single_mydata?.profession} status={single_mydata?.status} location={single_mydata?.area} type={single_mydata?.type} />
          ))}

          </Box>
        )}

        {activeTab === 1 && workHistoryData && (
          <Box className="p-4 bg-none rounded-lg shadow-lg">
          {workHistoryData?.length === 0 &&
          <p className="text-center text-white p-10">No data found</p>
          }
          {workHistoryData?.slice().reverse()?.map((single_mydata, i)=>(

           <HelpCart key={i} title={single_mydata?.description} need_type={single_mydata?.need_type} profession={single_mydata?.profession} status={single_mydata?.status} location={single_mydata?.area} type={single_mydata?.type} />
          ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
