/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function WedgeGlow() {
  const [pos, setPos] = useState({x:250, y:250});
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: Edge Glow</h1>
      <p className="mb-6 text-gray-600">Design Decision: Edges of the screen project a colored glow indicating proximity to targets in that direction.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move transition-all" 
           style={{boxShadow: `inset 0 ${pos.y > 300 ? -20 : 0}px 30px rgba(255,0,0,0.5), inset ${pos.x < 200 ? 20 : 0}px 0 30px rgba(0,0,255,0.5)`}}
           onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
           <p className="absolute bottom-4 left-4 text-xs text-gray-400">Move mouse to simulate camera pan</p>
      </div>
    </div>
  );
}
