/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CrossYScratch() {
  const [prog, setProg] = useState(0);
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Scratch-off</h1>
      <p className="mb-6 text-gray-600">Design Decision: User must rapidly scrub/cross over a target multiple times to select it, preventing accidental selections completely.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-orange-500 flex flex-col items-center justify-center h-96 relative">
         <div className="w-64 h-32 bg-gray-200 border-4 border-dashed border-gray-400 relative overflow-hidden flex items-center justify-center cursor-crosshair" onMouseMove={() => setProg(p => Math.min(100, p+2))}>
             <span className="relative z-10 font-bold mix-blend-difference text-white">Scrub to Select</span>
             <div className="absolute left-0 top-0 bottom-0 bg-green-500 transition-all duration-75" style={{width: `${prog}%`}}></div>
         </div>
         {prog === 100 && <p className="mt-4 text-green-600 font-bold">Selected!</p>}
      </div>
    </div>
  );
}
