"use client"
import { getApiCall } from '@/api/fatchData';
import React, { useContext, useEffect, useState } from 'react'
import PersonCart from '../_components/home/PersonCart';
import { JonAndPersonContext } from '@/context/JonAndPersonContext';

export default function page() {
      const [allPersons, setAllPersons] = useState(null); 
  const [loading, setLoading] = useState(false);

  const {state, dispatch} = useContext(JonAndPersonContext);

    
      const fetchData = async () => {
        setLoading(true);
        try {
            const personResponse = await getApiCall(`user/public/getemployees`);
    
          if (personResponse?.statusCode === 200) {
            dispatch({ type: "ADD_EMPLOYEES_DATA", payload: personResponse?.data });
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
    
    
      // Fetch data when the component mounts
      useEffect(() => {
        if (!state.emplyees) {
          fetchData();
        } else {
          setAllPersons(state.emplyees);
        }
    
    
      }, [state.emplyees]); 
    


  return (
    <>
    <div className="container mx-auto lg:px-5 px-2">


    <div className="pt-1">
           {allPersons ? (
             allPersons.length > 0 ? (
               allPersons.map((person, i) => (
                 <div className="lg:w-3/12 w-6/12 inline-block p-4" key={i}>
                   <PersonCart personData={person} />
                 </div>
               ))
             ) : (
               <p className="text-center text-white p-10">No workers found</p>
             )
           ) : loading ? (
             <div className="flex items-center justify-center h-[500px]">
               <div className="w-16 h-16 border-4 border-t-4 border border-solid rounded-full animate-spin"></div>
             </div>
           ) : null}
         </div>
    </div>
    </>
  )
}
