/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CrossYPinch() {
  const [pinching, setPinching] = useState(false);
  const [selected, setSelected] = useState(false);
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Pinch-to-Select</h1>
      <p className="mb-6 text-gray-600">Design Decision: User selects a boundary not by crossing one line with one pointer, but by pinching two pointers across it.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-orange-500 relative h-64" onMouseDown={()=>setPinching(true)} onMouseUp={()=>{setPinching(false); setSelected(true)}}>
         <p className="text-gray-400 mb-8">Click and hold to simulate a multi-touch pinch gesture over the target.</p>
         <div className={`mx-auto w-32 h-32 border-4 rounded-full transition-all ${selected ? 'border-green-500 bg-green-50' : 'border-orange-500'}`}></div>
         {pinching && (
            <>
              <div className="absolute w-8 h-8 bg-gray-400/50 rounded-full top-1/2 left-1/3 animate-ping"></div>
              <div className="absolute w-8 h-8 bg-gray-400/50 rounded-full top-1/2 right-1/3 animate-ping"></div>
            </>
         )}
      </div>
    </div>
  );
}
