/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Wedge() {
  const [pos, setPos] = useState({x:250, y:250});
  const targets = [{x: 100, y: -200}, {x: 800, y: 150}, {x: 300, y: 700}];

  const drawWedge = (t: {x:number, y:number}) => {
     const dx = t.x - pos.x, dy = t.y - pos.y;
     const rx = 250, ry = 200; // Half-width/height of viewport frame (500x400)
     const t_scale = Math.min(Math.abs(rx/dx), Math.abs(ry/dy));
     const ix = t_scale < 1 ? t_scale * dx : dx;
     const iy = t_scale < 1 ? t_s     const iy = t_scale < 1 ? t_s     const iy = t_scale < 1 ? tpos.x + ix} cy={pos.y + iy} r="10" fill="red" />;

     const a = Math.atan2(dy, dx) * 180 / Math.PI;
     const dist = Math.hypot(dx, dy);
     const aperture = Math.max(10, 60 - dist/15); 
     return (
       <g transform={`translate(${pos.x + ix}, ${pos.y + iy}) rotate(${a})`}>
          <polygon points={`0,0 -30,-${aperture} -30,${aperture}`} fill="blue" opacity="0.6" stroke="white" strokeWidth="2"/>
       </g>
     );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge</h1>
      <p className="mb-6 text-gray-600">Original: Isosceles triangles on the screen edge pointing to off-screen targets. (Move mouse to pan camera)</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move" onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
         <svg width="500" height="400" className="absolute top-0 left-0">
            {targets.map((t, i) => <React.Fragment key={i}>{drawWedge(t)}</React.Fragment>)}
            <circle cx="250" cy="200" r="5" fill="black" />
         </svg>
      </div>
    </div>
  );
}
