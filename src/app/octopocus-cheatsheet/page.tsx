/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function OctopocusCheatsheet() {
  const [path, setPath] = useState<{x:number, y:number}[]>([]);
  const gestures = [
    { n: 'Line', a: 0, c: 'red' },
    { n: 'Drop', a: Math.PI/2, c: 'blue' },
    { n: 'Diagonal', a: Math.PI/4, c: 'green' }
  ];
  
  const move = (e: any) => { if(e.buttons) setPath([...path, {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}]); }
  const angle = path.length > 5 ? Math.atan2(path[path.length-1].y - path[0].y, path[path.length-1].x - path[0].x) : null;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <Link href="/" className="text-indigo-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus: Static Sidebar Cheatsheet</h1>
      <p className="mb-6 text-gray-600">Variant: Guides are decoupled from the cursor to reduce visual clutter, fading out in a static sidebar instead.</p>
      
      <div className="flex gap-8">
        <svg width="600" height="600" className="border bg-gray-50 shadow-sm block cursor-crosshair" onMouseMove={move} onMouseUp={()=>setPath([])} onMouseLeave={()=>setPath([])}>
            {path.length > 0 && <polyline points={path.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="black" strokeWidth="4"/>}
            {!path.length && <circle cx="300" cy="300" r="10" fill="gray" />}
        </svg>
        <div className="w-64 bg-white p-6 rounded shadow flex flex-col gap-6">
            <h3 className="font-bold text-lg border-b pb-2">Possible Gestures</h3>
            {gestures.map(g => {
                const valid = angle === null || Math.abs(g.a - angle) < 0.6;
                return (
                   <div key={g.n} className={`p-4 border rounded ${valid ? 'bg-white opacity-100' : 'bg-gray-100 opacity-30 grayscale'}`}>
                       <span className="font-bold mb-2 block" style={{color: g.c}}>{g.n}</span>
                       <div className="w-12 h-12 border rounded relative">
                          {g.a === 0 && <div className="absolute top-1/2 left-2 right-2 h-1 bg-black"/>}
                          {g.a === Math.PI/2 && <div className="absolute left-1/2 top-2 bottom-2 w-1 bg-black"/>}
                          {g.a === Math.PI/4 && <div className="absolute left-2 top-2 w-8 h-8 border-b-2 border-r-2 border-black"/>}
                       </div>
                   </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
