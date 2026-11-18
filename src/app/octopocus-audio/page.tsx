/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function OctopocusAudio() {
  const [dev, setDev] = useState(0);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-sky-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus: Audio Sonification</h1>
      <p className="mb-6 text-gray-600">Design Decision: Visual guides are replaced by an audio pitch/visual meter that increases as the user deviates from the valid gesture.</p>
      <div className="bg-white p-8 rounded shadow border-t-4 border-sky-500 cursor-crosshair h-64 flex flex-col justify-center" onMouseMove={e => setDev(Math.min(100, Math.abs(250 - e.nativeEvent.offsetX)/2))}>
         <h3 className="font-bold mb-2">Deviation Pitch:</h3>
         <div className="w-full h-8 bg-gray-200 rounded overflow-hidden">
            <div className="h-full transition-all" style={{width: `${dev}%`, backgroundColor: `hsl(${120 - dev}, 100%, 50%)`}}></div>
         </div>
         <p className="mt-4 text-sm text-gray-500 text-center pointer-events-none">Move mouse left/right to simulate stroke deviation</p>
      </div>
    </div>
  );
}
