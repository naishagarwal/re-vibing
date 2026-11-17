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
                {hovered === 'red' && <div className="h-full bg-black/20" style={{width: \`\${progress}%\`}}/>}
             </div>
             <div className="w-16 h-16 bg-blue-500 rounded border shadow" onPointerEnter={()=>setHovered('blue')} onPointerLeave={()=>setHovered(null)}>
                {hovered === 'blue' && <div className="h-full bg-black/20" style={{width: \`\${progress}%\`}}/>}
             </div>
          </div>
          <svg width="800" height="500" className="border bg-white shadow-sm block cursor-crosshair" onMouseMove={move} onMouseUp={()=>setPath([])} onMouseLeave={()=>setPath([])}>
            {path.length > 0 && <polyline points={path.map(p=>\`\${p.x},\${p.y}\`).join(' ')} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"/>}
          </svg>
      </div>
    </div>
  );
}
