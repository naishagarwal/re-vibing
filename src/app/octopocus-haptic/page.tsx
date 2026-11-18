/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function OctopocusHaptic() {
  const [pos, setPos] = useState({x:250, y:150});
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-sky-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus: Haptic Friction</h1>
      <p className="mb-6 text-gray-600">Design Decision: System artificially slows the software cursor (adds friction) when deviating from the path.</p>
      <div className="bg-white rounded shadow border-t-4 border-sky-500 relative h-64 cursor-none overflow-hidden" 
           onMouseMove={e => {
              const targetY = 150;
              const dy = e.nativeEvent.offsetY - targetY;
              const frictionY = targetY + (dy * 0.2);
              setPos({x: e.nativeEvent.offsetX, y: frictionY});
           }}>
         <div className="absolute top-1/2 left-0 right-0 h-4 bg-gray-100 -translate-y-1/2 border-y border-dashed pointer-events-none"></div>
         <div className="absolute w-4 h-4 bg-red-500 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{left: pos.x, top: pos.y}}></div>
      </div>
    </div>
  );
}
