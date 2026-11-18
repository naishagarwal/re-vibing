/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 hover:bg-gray-400 text-xs flex items-center justify-center font-bold text-gray-500">{i}</button>)}</div>;
export default function ShiftTransparent() {
  const [pos, setPos] = useState({x:0, y:0});
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-emerald-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Transparent Finger</h1>
      <p className="mb-6 text-gray-600">Design Decision: The cursor represents a transparent finger outline, making it clear what is being occluded without a callout.</p>
      <div className="relative bg-white border p-4 shadow-sm inline-block cursor-none" onMouseMove={e=>setPos({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY})}>
         <Grid />
         <div className="absolute pointer-events-none w-16 h-24 bg-red-500/20 border-2 border-red-500 rounded-t-full rounded-b-xl backdrop-blur-sm -translate-x-1/2" style={{left: pos.x, top: pos.y}}>
             <div className="absolute top-4 left-1/2 w-1 h-1 bg-red-800 rounded-full -translate-x-1/2"></div>
         </div>
      </div>
    </div>
  );
}
