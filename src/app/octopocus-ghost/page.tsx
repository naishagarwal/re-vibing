/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function OctopocusGhost() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-sky-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus: Ghost Tracing</h1>
      <p className="mb-6 text-gray-600">Design Decision: A ghost cursor animates the gesture path slightly ahead of the user's cursor to demonstrate the required action.</p>
      <div className="bg-white rounded shadow border-t-4 border-sky-500 relative h-64 cursor-crosshair overflow-hidden" 
           onMouseMove={e => setProgress(e.nativeEvent.offsetX)}>
         <svg width="100%" height="100%">
            <path d="M 50 150 Q 250 50 450 150 T 850 150" fill="none" stroke="lightgray" strokeWidth="4" />
            <circle cx={progress} cy={150 - Math.sin(progress/100)*100} r="6" fill="black" />
            <circle cx={progress+100} cy={150 - Math.sin((progress+100)/100)*100} r="8" fill="skyBlue" opacity="0.6" className="transition-all" />
         </svg>
      </div>
    </div>
  );
}
