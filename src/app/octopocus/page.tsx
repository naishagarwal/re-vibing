/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Octopocus() {
  const [path, setPath] = useState<{x:number, y:number}[]>([]);
  const gestures = [
    { n: 'Line', a: 0, p: 'M0 0 L150 0', c: 'red' },
    { n: 'Drop', a: Math.PI/2, p: 'M0 0 L0 150', c: 'blue' },
    { n: 'Diagonal', a: Math.PI/4, p: 'M0 0 L150 150', c: 'green' }
  ];
  
  const move = (e: any) => { if(e.buttons) setPath([...path, {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}]); }
  const angle = path.length > 5 ? Math.atan2(path[path.length-1].y - path[0].y, path[path.length-1].x - path[0].x) : null;
  const valid = gestures.filter(g => angle === null || Math.abs(g.a - angle) < 0.6);
  const cp = path.length ? path[path.length-1] : {x:400, y:300};

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-indigo-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus</h1>
      <p className="mb-6 text-gray-600">Original: Gesture templates emerge from the cursor, guiding the user in real-time. (Drag to draw)</p>
      <svg width="800" height="600" className="border bg-gray-50 shadow-sm block cursor-crosshair" onMouseMove={move} onMouseUp={()=>setPath([])} onMouseLeave={()=>setPath([])}>
         {path.length > 0 && <polyline points={path.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="black" strokeWidth="3"/>}
         {!path.length && <circle cx="400" cy="300" r="10" fill="gray" />}
         <g transform={`translate(${cp.x}, ${cp.y})`}>
            {valid.map(g => (
                <path key={g.n} d={g.p} fill="none" stroke={g.c} strokeWidth="15" strokeLinecap="round" strokeOpacity="0.2" />
            ))}
         </g>
      </svg>
    </div>
  );
}
