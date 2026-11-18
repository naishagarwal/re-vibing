/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 text-xs flex items-center justify-center font-bold text-gray-500 hover:scale-150 hover:z-10 hover:bg-emerald-200 transition-all origin-center">{i}</button>)}</div>;
export default function ShiftFisheye() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-emerald-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Fisheye Distortion</h1>
      <p className="mb-6 text-gray-600">Design Decision: Rather than a callout, the screen bulges dynamically under the finger to magnify the targets.</p>
      <div className="bg-white border p-4 shadow-sm inline-block"><Grid /></div>
    </div>
  );
}
