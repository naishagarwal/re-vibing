/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function WedgeArrows() {
  const [pos, setPos] = useState({x:250, y:250});
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: 3D Arrows</h1>
      <p className="mb-6 text-gray-600">Design Decision: Arrows float at the screen edge, scaling down in size to simulate 3D distance to the target.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move" onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
           <div className="absolute top-0 right-1/4 text-red-500 font-bold -translate-y-1/2 rotate-[-90deg]" style={{fontSize: Math.max(10, pos.y/10) + 'px'}}>➔</div>
           <div className="absolute bottom-1/2 left-0 text-blue-500 font-bold -translate-x-1/2 rotate-180" style={{fontSize: Math.max(10, (500-pos.x)/10) + 'px'}}>➔</div>
      </div>
    </div>
  );
}
