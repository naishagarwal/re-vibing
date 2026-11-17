const fs = require('fs');
const path = require('path');
const w = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, '/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n' + c.trim() + '\n'); };

w('src/app/bubblecursor/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BubbleCursor() {
  const [pos, setPos] = useState({x: 250, y: 250});
  const [targets, setTargets] = useState<{x:number, y:number, id:number}[]>([]);
  useEffect(() => setTargets(Array.from({length: 25}, (_, i) => ({x: Math.random()*700+50, y: Math.random()*500+50, id: i}))), []);

  let d1 = Infinity, d2 = Infinity, t1: any = null;
  targets.forEach(t => {
    const d = Math.hypot(t.x - pos.x, t.y - pos.y);
    if(d < d1) { d2 = d1; d1 = d; t1 = t; }
    else if(d < d2) d2 = d;
  });
  const r = t1 ? Math.min(d1 + 15, Math.max(d1, d2 - 15)) : 10;

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">BubbleCursor</h1>
      <p className="mb-6 text-gray-600">Original: Cursor radius dynamically resizes to encapsulate exactly one target (red).</p>
      <svg width="800" height="600" className="border bg-white cursor-none shadow-sm block" onMouseMove={e => setPos({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY})}>
        {targets.map(t => <circle key={t.id} cx={t.x} cy={t.y} r="15" fill={t === t1 ? "red" : "gray"} />)}
        <circle cx={pos.x} cy={pos.y} r={r} fill="rgba(255,0,0,0.15)" stroke="red" strokeWidth="2" pointerEvents="none" />
        <circle cx={pos.x} cy={pos.y} r="3" fill="black" pointerEvents="none" />
      </svg>
    </div>
  );
}
`);

w('src/app/bubblecursor-magnetic/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BubbleCursorMagnetic() {
  const [pos, setPos] = useState({x: 250, y: 250});
  const [targets, setTargets] = useState<{x:number, y:number, id:number}[]>([]);
  useEffect(() => setTargets(Array.from({length: 25}, (_, i) => ({x: Math.random()*700+50, y: Math.random()*500+50, id: i}))), []);

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back to Showcase</Link>
      <h1 className="text-3xl font-bold mb-2">BubbleCursor: Gravity Wells (Magnetic)</h1>
      <p className="mb-6 text-gray-600">Variant: Cursor remains standard size, but targets within 100px physically pull toward the cursor.</p>
      <svg width="800" height="600" className="border bg-white cursor-crosshair shadow-sm block" onMouseMove={e => setPos({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY})}>
        {targets.map(t => {
           const d = Math.hypot(t.x - pos.x, t.y - pos.y);
           const pull = d < 100 ? 0.4 : 0;
           const cx = t.x + (pos.x - t.x) * pull;
           const cy = t.y + (pos.y - t.y) * pull;
           return <circle key={t.id} cx={cx} cy={cy} r="15" fill={d < 30 ? "red" : "gray"} className="transition-all duration-75" />
        })}
      </svg>
    </div>
  );
}
`);

w('src/app/octopocus/page.tsx', `
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
         {path.length > 0 && <polyline points={path.map(p=>\`\${p.x},\${p.y}\`).join(' ')} fill="none" stroke="black" strokeWidth="3"/>}
         {!path.length && <circle cx="400" cy="300" r="10" fill="gray" />}
         <g transform={\`translate(\${cp.x}, \${cp.y})\`}>
            {valid.map(g => (
                <path key={g.n} d={g.p} fill="none" stroke={g.c} strokeWidth="15" strokeLinecap="round" strokeOpacity="0.2" />
            ))}
         </g>
      </svg>
    </div>
  );
}
`);

w('src/app/octopocus-cheatsheet/page.tsx', `
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
            {path.length > 0 && <polyline points={path.map(p=>\`\${p.x},\${p.y}\`).join(' ')} fill="none" stroke="black" strokeWidth="4"/>}
            {!path.length && <circle cx="300" cy="300" r="10" fill="gray" />}
        </svg>
        <div className="w-64 bg-white p-6 rounded shadow flex flex-col gap-6">
            <h3 className="font-bold text-lg border-b pb-2">Possible Gestures</h3>
            {gestures.map(g => {
                const valid = angle === null || Math.abs(g.a - angle) < 0.6;
                return (
                   <div key={g.n} className={\`p-4 border rounded \${valid ? 'bg-white opacity-100' : 'bg-gray-100 opacity-30 grayscale'}\`}>
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
`);
console.log('React Group 1 generated.');
