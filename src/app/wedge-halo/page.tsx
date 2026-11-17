/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function WedgeHalo() {
  const [pos, setPos] = useState({x:250, y:250});
  const targets = [{x: 100, y: -200}, {x: 800, y: 150}, {x: 300, y: 700}];

  const drawHalo = (t: {x:number, y:number}) => {
     const cx = pos.x, cy = pos.y;
     const dx = t.x < cx-250 ? (cx-250)-t.x : (t.x > cx+250 ? t.x-(cx+250) : 0);
     const dy = t.y < cy-200 ? (cy-200)-t.y : (t.y > cy+200 ? t.y-(cy+200) : 0);
     const dist = Math.hypot(dx, dy);
     
     if (dist === 0) return <circle cx={t.x - cx + 250} cy={t.y - cy + 200} r="10" fill="red" />;
     
     return <circle cx={t.x - cx + 250} cy={t.y - cy + 200} r={dist + 20} fill="none" stroke="red" strokeWidth="4" opacity="0.6" />;
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: Halo</h1>
      <p className="mb-6 text-gray-600">Variant: Large circles centered on the off-screen targets where the curvature conveys distance naturally.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move" onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
         <svg width="500" height="400" className="absolute top-0 left-0">
            {targets.map((t, i) => <React.Fragment key={i}>{drawHalo(t)}</React.Fragment>)}
            <circle cx="250" cy="200" r="5" fill="black" />
         </svg>
      </div>
    </div>
  );
}
