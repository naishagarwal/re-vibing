const fs = require('fs');
const path = require('path');
const w = (p, c) => { 
  fs.mkdirSync(path.dirname(p), {recursive: true}); 
  fs.writeFileSync(p, '/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n"use client";\nimport React, { useState, useEffect, useRef } from "react";\nimport Link from "next/link";\n\n' + c.trim() + '\n'); 
};
const wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

w('src/app/crossy-pinch/page.tsx', `
export default function CrossYPinch() {
  const [pinching, setPinching] = useState(false);
  const [selected, setSelected] = useState(false);
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Pinch-to-Select</h1>
      <p className="mb-6 text-gray-600">Design Decision: User selects a boundary not by crossing one line with one pointer, but by pinching two pointers across it.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-orange-500 relative h-64" onMouseDown={()=>setPinching(true)} onMouseUp={()=>{setPinching(false); setSelected(true)}}>
         <p className="text-gray-400 mb-8">Click and hold to simulate a multi-touch pinch gesture over the target.</p>
         <div className={\`mx-auto w-32 h-32 border-4 rounded-full transition-all \${selected ? 'border-green-500 bg-green-50' : 'border-orange-500'}\`}></div>
         {pinching && (
            <>
              <div className="absolute w-8 h-8 bg-gray-400/50 rounded-full top-1/2 left-1/3 animate-ping"></div>
              <div className="absolute w-8 h-8 bg-gray-400/50 rounded-full top-1/2 right-1/3 animate-ping"></div>
            </>
         )}
      </div>
    </div>
  );
}`);

w('src/app/crossy-dial/page.tsx', `
export default function CrossYDial() {
  const [color, setColor] = useState('black');
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Radial Dial</h1>
      <p className="mb-6 text-gray-600">Design Decision: Instead of vertical screen-spanning lines, user crosses pie slices outward from a center origin point.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-orange-500 flex flex-col items-center justify-center h-96 relative overflow-hidden">
         <div className="w-8 h-8 rounded-full mb-8" style={{backgroundColor: color}}></div>
         <div className="relative w-64 h-64 rounded-full border-4 border-gray-300">
             <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400">Start Here</div>
             <div onMouseLeave={()=>setColor('red')} className="absolute top-0 right-0 w-32 h-32 hover:bg-red-100 cursor-crosshair border-l border-b border-dashed"></div>
             <div onMouseLeave={()=>setColor('blue')} className="absolute bottom-0 right-0 w-32 h-32 hover:bg-blue-100 cursor-crosshair border-l border-t border-dashed"></div>
             <div onMouseLeave={()=>setColor('green')} className="absolute bottom-0 left-0 w-32 h-32 hover:bg-green-100 cursor-crosshair border-r border-t border-dashed"></div>
             <div onMouseLeave={()=>setColor('yellow')} className="absolute top-0 left-0 w-32 h-32 hover:bg-yellow-100 cursor-crosshair border-r border-b border-dashed"></div>
         </div>
      </div>
    </div>
  );
}`);

w('src/app/crossy-scratch/page.tsx', `
export default function CrossYScratch() {
  const [prog, setProg] = useState(0);
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Scratch-off</h1>
      <p className="mb-6 text-gray-600">Design Decision: User must rapidly scrub/cross over a target multiple times to select it, preventing accidental selections completely.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-orange-500 flex flex-col items-center justify-center h-96 relative">
         <div className="w-64 h-32 bg-gray-200 border-4 border-dashed border-gray-400 relative overflow-hidden flex items-center justify-center cursor-crosshair" onMouseMove={() => setProg(p => Math.min(100, p+2))}>
             <span className="relative z-10 font-bold mix-blend-difference text-white">Scrub to Select</span>
             <div className="absolute left-0 top-0 bottom-0 bg-green-500 transition-all duration-75" style={{width: \`\${prog}%\`}}></div>
         </div>
         {prog === 100 && <p className="mt-4 text-green-600 font-bold">Selected!</p>}
      </div>
    </div>
  );
}`);

w('src/app/wedge-radar/page.tsx', `
export default function WedgeRadar() {
  const [pos, setPos] = useState({x:250, y:250});
  const targets = [{x: 100, y: -200}, {x: 800, y: 150}, {x: 300, y: 700}];

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: Mini-map Radar</h1>
      <p className="mb-6 text-gray-600">Design Decision: Replaces edge wedges with a dedicated spatial mini-map overlay in the corner.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move" onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
         <div className="absolute top-4 right-4 w-32 h-32 bg-black/80 rounded border-2 border-gray-400 relative overflow-hidden">
             {targets.map((t, i) => <div key={i} className="absolute w-2 h-2 bg-red-500 rounded-full" style={{left: (t.x/1000)*128, top: ((t.y+300)/1000)*128}} />)}
             <div className="absolute w-4 h-3 border border-white" style={{left: (pos.x/1000)*128, top: ((pos.y+300)/1000)*128}}></div>
         </div>
      </div>
    </div>
  );
}`);

w('src/app/wedge-glow/page.tsx', `
export default function WedgeGlow() {
  const [pos, setPos] = useState({x:250, y:250});
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: Edge Glow</h1>
      <p className="mb-6 text-gray-600">Design Decision: Edges of the screen project a colored glow indicating proximity to targets in that direction.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move transition-all" 
           style={{boxShadow: \`inset 0 \${pos.y > 300 ? -20 : 0}px 30px rgba(255,0,0,0.5), inset \${pos.x < 200 ? 20 : 0}px 0 30px rgba(0,0,255,0.5)\`}}
           onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
           <p className="absolute bottom-4 left-4 text-xs text-gray-400">Move mouse to simulate camera pan</p>
      </div>
    </div>
  );
}`);

w('src/app/wedge-arrows/page.tsx', `
export default function WedgeArrows() {
  const [pos, setPos] = useState({x:250, y:250});
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-yellow-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Wedge: 3D Arrows</h1>
      <p className="mb-6 text-gray-600">Design Decision: Arrows float at the screen edge, scaling down in size to simulate 3D distance to the target.</p>
      <div className="relative w-[500px] h-[400px] mx-auto border-4 border-black overflow-hidden bg-gray-100 cursor-move" onMouseMove={e=>setPos({x: 500-e.nativeEvent.offsetX, y: 400-e.nativeEvent.offsetY})}>
           <div className="absolute top-0 right-1/4 text-red-500 font-bold -translate-y-1/2 rotate-[-90deg]" style={{fontSize: Math.max(10, pos.y/10) + 'px'}}>➔</div>
           <div className="absolute bottom-1/2 left-0 text-blue-500 font-bold -translate-x-1/2 rotate-180" style={{fontSize: Math.max(10, (500-pos.x)/10) + 'px'}}>➔</div>
      </div>
    </div>
  );
}`);

console.log("Crossy and Wedge generated.");
