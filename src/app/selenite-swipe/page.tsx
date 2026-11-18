/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SeleniteSwipe() {
  const [idx, setIdx] = useState(0);
  const options = ['React', 'Vue', 'Svelte', 'SolidJS', 'Done!'];
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Selenite: Tinder-style Swiping</h1>
      <p className="mb-6 text-gray-600">Design Decision: User evaluates options sequentially via Keep/Discard actions to quickly build a shortlist.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-teal-500 h-96 flex flex-col items-center justify-center">
         <div className="w-64 h-64 bg-gray-100 rounded-xl shadow-lg border-2 flex items-center justify-center text-3xl font-bold mb-8">
            {options[idx]}
         </div>
         {idx < 4 && (
            <div className="flex gap-8">
               <button onClick={()=>setIdx(i=>i+1)} className="w-16 h-16 rounded-full bg-red-100 text-red-600 font-bold border-2 border-red-600 hover:bg-red-200">NO</button>
               <button onClick={()=>setIdx(i=>i+1)} className="w-16 h-16 rounded-full bg-green-100 text-green-600 font-bold border-2 border-green-600 hover:bg-green-200">YES</button>
            </div>
         )}
      </div>
    </div>
  );
}
