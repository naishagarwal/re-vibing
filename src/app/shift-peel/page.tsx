/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 hover:bg-gray-400 text-xs flex items-center justify-center font-bold text-gray-500">{i}</button>)}</div>;
export default function ShiftPeel() {
  const [peel, setPeel] = useState(false);
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-emerald-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Page Peel</h1>
      <p className="mb-6 text-gray-600">Design Decision: Pressing the screen literally peels back the occluded area to render it clearly to the side.</p>
      <div className="relative bg-white border p-4 shadow-sm inline-block" onMouseDown={()=>setPeel(true)} onMouseUp={()=>setPeel(false)}>
         <div className={`transition-all duration-300 ${peel ? '-translate-y-8 translate-x-8 scale-110 shadow-2xl z-10 bg-white' : ''}`}><Grid /></div>
      </div>
    </div>
  );
}
