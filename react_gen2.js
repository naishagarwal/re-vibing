const fs = require('fs');
const path = require('path');
const w = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, '/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n' + c.trim() + '\n'); };

w('src/app/shift/page.tsx', `
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 hover:bg-gray-400 text-xs flex items-center justify-center font-bold text-gray-500">{i}</button>)}</div>;

export default function Shift() {
  const [pos, setPos] = useState({x:0, y:0});
  const [down, setDown] = useState(false);

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-teal-600 mb      <Link href="/" className="text-teal-600 mb      <Link hrefclassName="text-3xl font-bold mb-2">Shift</h1>
      <p className="mb-6 text-gray-600">Original: Callout appears above finger to solve fat-finger occlusion. (Click and drag to test)</p>
      
      <div 
        className="relative bg-white border p-4 shadow-sm inline-block"
        onPointerDown={e => { setDown(true); setPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}); e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if(down) setPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}); }}
        onPointerUp={e => { setDown(false); e.currentTarget.releasePointerCapture(e.pointerId); }}
      >
         <Grid />
         {down && (
            <div style={{position: 'absolute', left: pos.x - 70, top: pos.y - 150, width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', border: '3px solid black', pointerEvents: 'none', backgroundColor: 'white', zIndex: 50, boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
                <div style={{position: 'absolute', left: -pos.x + 70, top: -pos.y + 70, transform: 'scale(1.5)', transformOrigin: \`\${pos.x}px \${pos.y}px\`}}>
                   <Grid />
                </div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 border border-white" />
            </div>
         )}
      </div>
    </div>
  );
}
`);

w('src/app/shift-offset/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} data-id={i} className="btn-target w-10 h-10 bg-gray-200 text-xs flex items-center justify-center font-bold text-gray-500">{i}</button>)}</div>;

export default function ShiftOffset() {
  const [pos, setPos] = useState({x:0, y:0, clientX:0, clientY:0});
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState<string|null>(null);

  useEffect(() => {
     document.querySelectorAll('.btn-target').forEach(e => e.classList.remove('bg-red-400', 'text-white'));
     if(down) {
         const el = document.elementFromPoint(pos.clientX, pos.clientY - 80);
         if(el && el.classList.contains('btn-target')) {
             setHovered(el.getAttribute('data-id'));
             el.classList.add('bg-red-400', 'text-white');
         } else setHovered(null);
     }
  }, [pos, down]);

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Offset Virtual Cursor</h1>
      <p className="mb-6 text-gray-600">Variant: A virtual cursor is driven offset above the finger to completely avoid occlusion. (Click and drag to test)</p>
      
      <div className="mb-4 font-bold text-red-500 min-h-6">Targeting: {hovered ?? 'None'}</div>

      <div 
        className="relative bg-white border p-4 shadow-sm inline-block cursor-none"
        onPointerDown={e => { setDown(true); setPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, clientX: e.clientX, clientY: e.clientY}); e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if(down) setPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, clientX: e.clientX, clientY: e.clientY}); }}
        onPointerUp={e => { setDown(false); setHovered(null); document.querySelectorAll('.btn-target').forEach(el => el.classList.remove('bg-red-400', 'text-white')); e.currentTarget.releasePointerCapture(e.pointerId); }}
      >
         <Grid />
         {down && (
            <div style={{position: 'absolute', left: pos.x, top: pos.y - 80, pointerEvents: 'none', zIndex: 50}} className="flex flex-col items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                <div className="w-0.5 h-20 bg-red-200/50"></div>
            </div>
         )}
      </div>
    </div>
  );
}
`);
