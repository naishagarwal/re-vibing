/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function WedgeRadar() {
  const [pos, setPos] = useState({x:250, y:250});
  const targets = [{x: 100, y: -200}, {x: 800, y: 150}, {x: 300, y: 700}];

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: Mini-map Radar</h1>
      <p className="mb-6 text-gray-600">Design Decision: Replaces edge wedges with a dedicated spatial mini-map overlay in the corner.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move" onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
         <div className="absolute top-4 right-4 w-32 h-32 bg-black/80 rounded border-2 border-gray-400 relative overflow-hidden">
             {targets.map((t, i) => <div key={i} className="absolute w-2 h-2 bg-red-500 rounded-full" style={{left: (t.x/1000)*128, top: ((t.y+300)/1000)*128}} />)}
             <div className="absolute w-4 h-3 border border-white" style={{left: (pos.x/1000)*128, top: ((pos.y+300)/1000)*128}}></div>
         </div>
      </div>
    </div>
  );
}
