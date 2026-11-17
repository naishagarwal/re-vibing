const fs = require('fs');

const crossy = `
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CrossY() {
  const [path, setPath] = useState<{x:number, y:number}[]>([]);
  const [color, setColor] = useState('black');
  
  const move = (e: any) => { 
      if(e.buttons) {
          const nx = e.nativeEvent.offsetX, ny = e.nativeEvent.offsetY;
          const lx = path.length ? path[path.length-1].x : nx;
          const ly = path.length ? path[path.length-1].y : ny;
          
          if((lx <= 100 && nx >= 100) || (lx >= 100 && nx <= 100)) {
              const y = ly + (ny - ly) * (100 - lx) / (nx - lx);
              if(y >= 100 && y <= 200) setColor('red');
              if(y >= 250 && y <= 350) setColor('blue');
                                                                   }

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY</h1>
      <p className="mb-6 text-gray-600">Original: Goal-crossing UI. Cross the colored vertical lines on the left to select that ink color.</p>
      
      <div className="flex gap-4 items-center mb-4">
         Current Color: <div className="w-8 h-8 rounded border" style={{backgroundColor: color}}></div>
      </div>

      <svg width="800" height="500" className="border bg-white shadow-sm block cursor-crosshair" onMouseMove={move} onMouseUp={()=>setPath([])} onMouseLeave={()=>setPath([])}>
         <line x1="100" y1="100" x2="100" y2="200" stroke="red" strokeWidth="8" strokeLinecap="round" />
         <line x1="100" y1="250" x2="100" y2="350" stroke="blue" strokeWidth="8" strokeLinecap="round" />
         
         <line x1="100" y1="0" x2="100" y2="500" stroke="gray" strokeWidth="1" strokeDasharray="5,5" />
         
         {path.length > 0 && <polyline points={path.map(p=>\\\`\\\${p.x},\\\${p.y}\\\`).join(' ')} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"/>}
      </svg>
    </div>
  );
}
`;

const crossyDwell = `
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CrossYDwell() {
  const [path, setPath] = useState<{x:number, y:number}[]>([]);
  const [color, setColor] = useState('black');
  const [hovered, setHovered] = useState<string|null>(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
     let t: NodeJS.Timeout;
     if(hovered) {
         setProgress(0);
         const start = Date.now();
         t = setInterval(() => {
             const p = Math.min(100, ((Date.now() - start) / 1000) * 100);
             setProgress(p);
             if(p === 100) { setColor(hovered); setHovered(null); }
         }, 16);
     } else {
         setProgress(0);
     }
     return () => clearInterval(t);
  }, [hovered]);

  const move = (e: any) => { if(e.buttons) setPath([...path, {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}]); }

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Dwell Selection</h1>
      <p className="mb-6 text-gray-600">Variant: Standard hit-targets but using a 1-second hover dwell to select instead of drawing lines across boundaries.</p>
      
      <div className="flex gap-4 items-center mb-4">
         Current Color: <div className="w-8 h-8 rounded border" style={{backgroundColor: color}}></div>
      </div>

      <div className="relative inline-block">
          <div className="absolute top-8 left-8 flex flex-col gap-4">
             <div className="w-16 h-16 bg-red-500 rounded border shadow" onPointerEnter={()=>setHovered('red')} onPointerLeave={()=>setHovered(null)}>
                {hovered === 'red' && <div className="h-full bg-black/20" style={{width: \\\`\\\${progress}%\\\`}}/>}
             </div>
             <div className="w-16 h-16 bg-blue-500 rounded border shadow" onPointerEnter={()=>setHovered('blue')} onPointerLeave={()=>setHovered(null)}>
                {hovered === 'blue' && <div className="h-full bg-black/20" style={{width: \\\`\\\${progress}%\\\`}}/>}
             </div>
          </div>
          <svg width="800" height="500" className="border bg-white shadow-sm block cursor-crosshair" onMouseMove={move} onMouseUp={()=>setPath([])} onMouseLeave={()=>setPath([])}>
            {path.length > 0 && <polyline points={path.map(p=>\\\`\\\${p.x},\\\${p.y}\\\`).join(' ')} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"/>}
          </svg>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/crossy/page.tsx', crossy.trim() + '\n');
fs.writeFileSync('src/app/crossy-dwell/page.tsx', crossyDwell.trim() + '\n');
