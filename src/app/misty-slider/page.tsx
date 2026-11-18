/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function MistySlider() {
  const [val, setVal] = useState(50);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Misty: Blend Intensity Slider</h1>
      <p className="mb-6 text-gray-600">Design Decision: User drags a slider to smoothly interpolate the design between the original code and the reference image.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-blue-500">
         <input type="range" min="0" max="100" value={val} onChange={e=>setVal(+e.target.value)} className="w-full mb-8" />
         <div className="flex gap-4 items-center justify-center">
            <span className="font-bold text-gray-500">WIP Code</span>
            <div className="relative w-64 h-32 bg-gray-200 rounded overflow-hidden">
               <div className="absolute inset-0 bg-blue-500 flex items-center justify-center text-white font-bold transition-all duration-75" style={{opacity: val/100, borderRadius: `${val/2}px`}}>Blended Element</div>
            </div>
            <span className="font-bold text-gray-500">Reference Image</span>
         </div>
      </div>
    </div>
  );
}
