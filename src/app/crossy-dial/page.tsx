/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CrossYDial() {
  const [color, setColor] = useState('black');
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Radial Dial</h1>
      <p className="mb-6 text-gray-600">Design Decision: Instead of vertical screen-spanning lines, user crosses pie slices outward from a center origin point.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-orange-500 flex flex-col items-center justify-center h-96 relative overflow-hidden">
         <div className="w-8 h-8 rounded-full mb-8" style={{backgroundColor: color}}></div>
         <div className="relative w-64 h-64 rounded-full border-4 border-gray-300">
             <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400">Start Here</div>
             <div onMouseLeave={()=>setColor('red')} className="absolute top-0 right-0 w-32 h-32 hover:bg-red-100 cursor-crosshair border-l border-b border-dashed"></div>
             <div onMouseLeave={()=>setColor('blue')} className="absolute bottom-0 right-0 w-32 h-32 hover:bg-blue-100 cursor-crosshair border-l border-t border-dashed"></div>
             <div onMouseLeave={()=>setColor('green')} className="absolute bottom-0 left-0 w-32 h-32 hover:bg-green-100 cursor-crosshair border-r border-t border-dashed"></div>
             <div onMouseLeave={()=>setColor('yellow')} className="absolute top-0 left-0 w-32 h-32 hover:bg-yellow-100 cursor-crosshair border-r border-b border-dashed"></div>
         </div>
      </div>
    </div>
  );
}
