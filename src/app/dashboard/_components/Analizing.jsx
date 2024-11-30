import React from "react";
import AnalizingCart from "./carts/AnalizingCart";

export default function Analizing() {
  return (
    <>
      <div>
        <div className="lg:w-3/12 w-6/12 overflow-hidden inline-block">
          <AnalizingCart value={0} label={"Pending"} />
        </div>
        <div className="lg:w-3/12 w-6/12 overflow-hidden inline-block">
          <AnalizingCart value={0} label={"Balance (taka)"} />
        </div>
        <div className="lg:w-3/12 w-6/12 overflow-hidden inline-block">
          <AnalizingCart value={0} label={"Total Done"} />
        </div>
        <div className="lg:w-3/12 w-6/12 overflow-hidden inline-block">
          <AnalizingCart value={0} label={"Total Closed"} />
        </div>
      </div>
    </>
  );
}
