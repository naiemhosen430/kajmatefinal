import { FaCheckCircle } from "react-icons/fa";
import React from "react";

export default function HowToWork() {
  return (
    <>
      <div className="container m-auto lg:flex items-center p-5">
        <div className="lg:w-6/12 w-12/12">
          <img className="w-full" src="/images/howtowork.png" alt="no image" />
        </div>
        <div className="lg:w-6/12 w-12/12">
          <h1 className="text-[30px] mb-4">
            How <span className="primary-green">EHM</span> work
          </h1>
          <ol className="list-decimal">
            <li className="flex items-center mb-3">
              <FaCheckCircle className="text-primary-green mr-2" />
              <span>Sign up.</span>
            </li>
            <li className="flex items-center mb-3">
              <FaCheckCircle className="text-primary-green mr-2" />
              <span>Add your needs</span>
            </li>
            <li className="flex items-center mb-3">
              <FaCheckCircle className="text-primary-green mr-2" />
              <span>communicate cendidate</span>
            </li>
            <li className="flex items-center mb-3">
              <FaCheckCircle className="text-primary-green mr-2" />
              <span>Finish task with him</span>
            </li>
            <li className="flex items-center mb-3">
              <FaCheckCircle className="text-primary-green mr-2" />
              <span>Review us</span>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
