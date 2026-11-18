const fs = require('fs');
const path = require('path');
const w = (p, c) => { 
  fs.mkdirSync(path.dirname(p), {recursive: true}); 
  fs.writeFileSync(p, '/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n"use client";\nimport React, { useState, useEffect, useRef } from "react";\nimport Link from "next/link";\n\n' + c.trim() + '\n'); 
};
const wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

w('src/app/octopocus-audio/page.tsx', `
export default function OctopocusAudio() {
  const [dev, setDev] = useState(0);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-sky-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus: Audio Sonification</h1>
      <p className="mb-6 text-gray-600">Design Decision: Visual guides are replaced by an audio pitch/visual meter that increases as the user deviates from the valid gesture.</p>
      <div className="bg-white p-8 rounded shadow border-t-4 border-sky-500 cursor-crosshair h-64 flex flex-col justify-center" onMouseMove={e => setDev(Math.min(100, Math.abs(250 - e.nativeEvent.offsetX)/2))}>
         <h3 className="font-bold mb-2">Deviation Pitch:</h3>
         <div className="w-full h-8 bg-gray-200 rounded overflow-hidden">
            <div className="h-full transition-all" style={{width: \`\${dev}%\`, backgroundColor: \`hsl(\${120 - dev}, 100%, 50%)\`}}></div>
         </div>
         <p className="mt-4 text-sm text-gray-500 text-center pointer-events-none">Move mouse left/right to simulate stroke deviation</p>
      </div>
    </div>
  );
}`);
wMD('src/app/octopocus-audio/DESIGN_DECISIONS.md', `# Octopocus - Sonification\nUses non-visual auditory feedback (pitch) to warn users when their stroke is failing gesture recognition.`);

w('src/app/octopocus-haptic/page.tsx', `
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
}`);
wMD('src/app/octopocus-haptic/DESIGN_DECISIONS.md', `# Octopocus - Haptic Friction\nUses pseudo-haptic feedback by dynamically altering C-D ratio based on gesture path adherence.`);

w('src/app/octopocus-ghost/page.tsx', `
export default function OctopocusGhost() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-sky-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Octopocus: Ghost Tracing</h1>
      <p className="mb-6 text-gray-600">Design Decision: A ghost cursor animates the gesture path slightly ahead of the user's cursor to demonstrate the required action.</p>
      <div className="bg-white rounded shadow border-t-4 border-sky-500 relative h-64 cursor-crosshair overflow-hidden" 
           onMouseMove={e => setProgress(e.nativeEvent.offsetX)}>
         <svg width="100%" height="100%">
            <path d="M 50 150 Q 250 50 450 150 T 850 150" fill="none" stroke="lightgray" strokeWidth="4" />
            <circle cx={progress} cy={150 - Math.sin(progress/100)*100} r="6" fill="black" />
            <circle cx={progress+100} cy={150 - Math.sin((progress+100)/100)*100} r="8" fill="skyBlue" opacity="0.6" className="transition-all" />
         </svg>
      </div>
    </div>
  );
}`);
wMD('src/app/octopocus-ghost/DESIGN_DECISIONS.md', `# Octopocus - Ghost Tracing\nReplaces static paths with a dynamic, animating ghost cursor.`);

w('src/app/shift-fisheye/page.tsx', `
const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 text-xs flex items-center justify-center font-bold text-gray-500 hover:scale-150 hover:z-10 hover:bg-emerald-200 transition-all origin-center">{i}</button>)}</div>;
export default function ShiftFisheye() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-emerald-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Fisheye Distortion</h1>
      <p className="mb-6 text-gray-600">Design Decision: Rather than a callout, the screen bulges dynamically under the finger to magnify the targets.</p>
      <div className="bg-white border p-4 shadow-sm inline-block"><Grid /></div>
    </div>
  );
}`);
wMD('src/app/shift-fisheye/DESIGN_DECISIONS.md', `# Shift - Fisheye\nUses localized visual distortion instead of a remote callout window.`);

w('src/app/shift-transparent/page.tsx', `
const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 hover:bg-gray-400 text-xs flex items-center justify-center font-bold text-gray-500">{i}</button>)}</div>;
export default function ShiftTransparent() {
  const [pos, setPos] = useState({x:0, y:0});
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-emerald-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Transparent Finger</h1>
      <p className="mb-6 text-gray-600">Design Decision: The cursor represents a transparent finger outline, making it clear what is being occluded without a callout.</p>
      <div className="relative bg-white border p-4 shadow-sm inline-block cursor-none" onMouseMove={e=>setPos({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY})}>
         <Grid />
         <div className="absolute pointer-events-none w-16 h-24 bg-red-500/20 border-2 border-red-500 rounded-t-full rounded-b-xl backdrop-blur-sm -translate-x-1/2" style={{left: pos.x, top: pos.y}}>
             <div className="absolute top-4 left-1/2 w-1 h-1 bg-red-800 rounded-full -translate-x-1/2"></div>
         </div>
      </div>
    </div>
  );
}`);
wMD('src/app/shift-transparent/DESIGN_DECISIONS.md', `# Shift - Transparent Finger\nUses visual alpha/blur simulation of the finger itself instead of duplicating screen pixels.`);

w('src/app/shift-peel/page.tsx', `
const Grid = () => <div className="grid grid-cols-10 gap-1">{Array(100).fill(0).map((_,i)=><button key={i} className="w-10 h-10 bg-gray-200 hover:bg-gray-400 text-xs flex items-center justify-center font-bold text-gray-500">{i}</button>)}</div>;
export default function ShiftPeel() {
  const [peel, setPeel] = useState(false);
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-emerald-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Shift: Page Peel</h1>
      <p className="mb-6 text-gray-600">Design Decision: Pressing the screen literally peels back the occluded area to render it clearly to the side.</p>
      <div className="relative bg-white border p-4 shadow-sm inline-block" onMouseDown={()=>setPeel(true)} onMouseUp={()=>setPeel(false)}>
         <div className={\`transition-all duration-300 \${peel ? '-translate-y-8 translate-x-8 scale-110 shadow-2xl z-10 bg-white' : ''}\`}><Grid /></div>
      </div>
    </div>
  );
}`);
wMD('src/app/shift-peel/DESIGN_DECISIONS.md', `# Shift - Page Peel\nPhysically moves the UI layer out from under the finger temporarily.`);
