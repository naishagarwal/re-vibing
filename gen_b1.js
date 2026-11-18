const fs = require('fs');
const path = require('path');
const w = (p, c) => { 
  fs.mkdirSync(path.dirname(p), {recursive: true}); 
  fs.writeFileSync(p, '/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n"use client";\nimport React, { useState, useEffect, useRef } from "react";\nimport Link from "next/link";\n\n' + c.trim() + '\n'); 
};
const wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// MISTY
w('src/app/misty-voice/page.tsx', `
export default function MistyVoice() {
  const [listening, setListening] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  
  const toggle = () => {
     if(!listening) {
        setListening(true);
        setTimeout(() => { setLog(l => [...l, "User: Make the buttons larger and rounded."]); }, 1500);
        setTimeout(() => { setLog(l => [...l, "System: Applied border-radius: 12px and padding: 16px."]); setListening(false); }, 3000);
     }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Misty: Voice-Driven Blending</h1>
      <p className="mb-6 text-gray-600">Design Decision: User holds a microphone button to dictate style changes conversationally, completely hands-free.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-blue-500">
         <button onClick={toggle} className={\`w-24 h-24 rounded-full text-white font-bold text-lg shadow-lg \${listening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}\`}>
            {listening ? 'Listening...' : 'Hold to Speak'}
         </button>
         <div className="mt-8 text-left bg-gray-50 p-4 rounded min-h-[150px]">
            {log.map((l,i) => <p key={i} className={\`mb-2 \${l.startsWith('User') ? 'text-blue-700 font-bold' : 'text-gray-700'}\`}>{l}</p>)}
         </div>
      </div>
    </div>
  );
}`);
wMD('src/app/misty-voice/DESIGN_DECISIONS.md', `# Misty - Voice-Driven Blending\nInstead of manual visual diffs or chat boxes, the user dictates styling tweaks via voice commands.`);

w('src/app/misty-slider/page.tsx', `
export default function MistySlider() {
  const [val, setVal] = useState(50);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Misty: Blend Intensity Slider</h1>
      <p className="mb-6 text-gray-600">Design Decision: User drags a slider to smoothly interpolate the design between the original code and the reference image.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-blue-500">
         <input type="range" min="0" max="100" value={val} onChange={e=>setVal(+e.target.value)} className="w-full mb-8" />
         <div className="flex gap-4 items-center justify-center">
            <span className="font-bold text-gray-500">WIP Code</span>
            <div className="relative w-64 h-32 bg-gray-200 rounded overflow-hidden">
               <div className="absolute inset-0 bg-blue-500 flex items-center justify-center text-white font-bold transition-all duration-75" style={{opacity: val/100, borderRadius: \`\${val/2}px\`}}>Blended Element</div>
            </div>
            <span className="font-bold text-gray-500">Reference Image</span>
         </div>
      </div>
    </div>
  );
}`);
wMD('src/app/misty-slider/DESIGN_DECISIONS.md', `# Misty - Blend Intensity Slider\nUser interpolates the weight of the styling blend continuously via a slider.`);

w('src/app/misty-lasso/page.tsx', `
export default function MistyLasso() {
  const [lasso, setLasso] = useState(false);
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Misty: Lasso Region Blending</h1>
      <p className="mb-6 text-gray-600">Design Decision: User draws a lasso around a specific region of the screen to isolate where the AI applies styling blends.</p>
      <div className="bg-white p-8 rounded shadow border-t-4 border-blue-500 relative h-96 cursor-crosshair" onMouseDown={()=>setLasso(true)} onMouseUp={()=>setLasso(false)}>
         <p className="text-gray-400 text-center uppercase">Click and drag to lasso a region</p>
         {lasso && <div className="absolute top-32 left-32 w-64 h-32 border-2 border-dashed border-blue-500 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-800 font-bold">Blend isolated to this region</div>}
      </div>
    </div>
  );
}`);
wMD('src/app/misty-lasso/DESIGN_DECISIONS.md', `# Misty - Lasso Region Blending\nUser manually selects geometric regions to apply edits to, preventing global layout disruptions.`);


// SELENITE
w('src/app/selenite-radar/page.tsx', `
export default function SeleniteRadar() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Selenite: Radar Chart Overview</h1>
      <p className="mb-6 text-gray-600">Design Decision: Options are plotted on a multidimensional radar chart instead of a text matrix for quick visual shape comparison.</p>
      <div className="bg-white p-8 rounded shadow flex items-center justify-center border-t-4 border-teal-500 h-96 relative">
         <svg width="300" height="300" className="bg-gray-50 rounded-full border">
            {/* Mock Radar */}
            <polygon points="150,20 280,100 250,250 50,250 20,100" fill="teal" opacity="0.3" stroke="teal" strokeWidth="3" />
            <polygon points="150,50 240,120 200,200 100,200 60,120" fill="orange" opacity="0.3" stroke="orange" strokeWidth="3" />
            <line x1="150" y1="150" x2="150" y2="0" stroke="gray" strokeDasharray="4" />
            <line x1="150" y1="150" x2="300" y2="100" stroke="gray" strokeDasharray="4" />
            <line x1="150" y1="150" x2="250" y2="300" stroke="gray" strokeDasharray="4" />
         </svg>
         <div className="absolute top-10 left-10 text-sm font-bold text-teal-800 bg-teal-100 px-2 rounded">Option A</div>
         <div className="absolute bottom-10 right-10 text-sm font-bold text-orange-800 bg-orange-100 px-2 rounded">Option B</div>
      </div>
    </div>
  );
}`);
wMD('src/app/selenite-radar/DESIGN_DECISIONS.md', `# Selenite - Radar Chart\nVisualizes multiple criteria axes simultaneously as a 2D shape.`);

w('src/app/selenite-kanban/page.tsx', `
export default function SeleniteKanban() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Selenite: Kanban Board Comparison</h1>
      <p className="mb-6 text-gray-600">Design Decision: Options are automatically grouped into categorical columns based on their strongest traits.</p>
      <div className="grid grid-cols-3 gap-4">
         <div className="bg-gray-100 p-4 rounded shadow-sm border-t-4 border-green-500">
            <h3 className="font-bold text-lg mb-4 text-center">Highest Performance</h3>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">SolidJS</div>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">Svelte</div>
         </div>
         <div className="bg-gray-100 p-4 rounded shadow-sm border-t-4 border-blue-500">
            <h3 className="font-bold text-lg mb-4 text-center">Largest Ecosystem</h3>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">React</div>
         </div>
         <div className="bg-gray-100 p-4 rounded shadow-sm border-t-4 border-purple-500">
            <h3 className="font-bold text-lg mb-4 text-center">Easiest Learning Curve</h3>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">Vue</div>
         </div>
      </div>
    </div>
  );
}`);
wMD('src/app/selenite-kanban/DESIGN_DECISIONS.md', `# Selenite - Kanban Board\nGroups options by their dominant strengths rather than forcing a 1:1 tabular comparison.`);

w('src/app/selenite-swipe/page.tsx', `
export default function SeleniteSwipe() {
  const [idx, setIdx] = useState(0);
  const options = ['React', 'Vue', 'Svelte', 'SolidJS', 'Done!'];
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Selenite: Tinder-style Swiping</h1>
      <p className="mb-6 text-gray-600">Design Decision: User evaluates options sequentially via Keep/Discard actions to quickly build a shortlist.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-teal-500 h-96 flex flex-col items-center justify-center">
         <div className="w-64 h-64 bg-gray-100 rounded-xl shadow-lg border-2 flex items-center justify-center text-3xl font-bold mb-8">
            {options[idx]}
         </div>
         {idx < 4 && (
            <div className="flex gap-8">
               <button onClick={()=>setIdx(i=>i+1)} className="w-16 h-16 rounded-full bg-red-100 text-red-600 font-bold border-2 border-red-600 hover:bg-red-200">NO</button>
               <button onClick={()=>setIdx(i=>i+1)} className="w-16 h-16 rounded-full bg-green-100 text-green-600 font-bold border-2 border-green-600 hover:bg-green-200">YES</button>
            </div>
         )}
      </div>
    </div>
  );
}`);
wMD('src/app/selenite-swipe/DESIGN_DECISIONS.md', `# Selenite - Swipe Triage\nReduces cognitive load by forcing binary keep/discard decisions on one option at a time.`);

// VIDEODIFF
w('src/app/videodiff-storyboard/page.tsx', `
export default function VideoDiffStoryboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <Link href="/" className="text-rose-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Comic-book Storyboard</h1>
      <p className="mb-6 text-gray-600">Design Decision: Editing variants are presented as sequential thumbnail grids, looking like a comic book storyboard.</p>
      <div className="bg-white p-8 rounded shadow border-t-4 border-rose-500 grid grid-cols-4 gap-4">
         {[1,2,3,4].map(i => (
           <div key={i} className="flex flex-col border rounded overflow-hidden shadow-sm">
             <div className="bg-gray-800 h-32 flex items-center justify-center text-gray-400 text-sm">B-Roll {i}</div>
             <div className="p-3 text-sm bg-gray-50 flex-1">"Welcome to the channel. Today we..."</div>
           </div>
         ))}
      </div>
    </div>
  );
}`);
wMD('src/app/videodiff-storyboard/DESIGN_DECISIONS.md', `# VideoDiff - Storyboard\nFocuses heavily on the spatial-visual representation of clips rather than text timelines.`);

w('src/app/videodiff-heatmap/page.tsx', `
export default function VideoDiffHeatmap() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-rose-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Audience Retention Heatmap</h1>
      <p className="mb-6 text-gray-600">Design Decision: Overlays a predictive heatmap over the video timeline to show where viewers are likely to drop off if an edit isn't made.</p>
      <div className="bg-gray-900 p-8 rounded shadow border-t-4 border-rose-500">
         <p className="text-gray-400 mb-2 uppercase text-xs font-bold">Predicted Audience Retention</p>
         <div className="w-full h-12 bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 rounded-t opacity-80" />
         <div className="w-full flex gap-1 h-24 items-start pt-2 bg-gray-800 rounded-b p-2">
             <div className="bg-blue-500 w-1/3 h-full rounded text-white text-xs p-2">Intro</div>
             <div className="bg-red-900/50 w-1/6 h-1/2 rounded text-red-300 text-xs p-2">Long Pause (Drop-off risk)</div>
             <div className="bg-purple-500 w-1/2 h-full rounded text-white text-xs p-2">Main Content</div>
         </div>
      </div>
    </div>
  );
}`);
wMD('src/app/videodiff-heatmap/DESIGN_DECISIONS.md', `# VideoDiff - Engagement Heatmap\nUses predictive AI to show exactly *why* a cut should be made based on audience attention spans.`);

w('src/app/videodiff-chat/page.tsx', `
export default function VideoDiffChat() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-rose-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Co-editor Chat Agent</h1>
      <p className="mb-6 text-gray-600">Design Decision: Instead of laying out a whole timeline, a chat agent proposes edits conversationally one by one.</p>
      <div className="bg-white p-6 rounded shadow h-[400px] flex flex-col border-t-4 border-rose-500">
         <div className="flex-1 overflow-auto flex flex-col justify-start gap-4">
            <div className="bg-gray-100 p-4 rounded-lg w-3/4">
               <strong>AI Editor:</strong> I noticed a 5-second silence at 0:15. Should I cut this out?
               <div className="mt-3 flex gap-2">
                 <button className="bg-rose-500 text-white px-3 py-1 rounded text-sm">Cut it</button>
                 <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm">Keep it</button>
               </div>
            </div>
         </div>
         <input className="border p-3 w-full rounded" placeholder="Type instructions..." disabled />
      </div>
    </div>
  );
}`);
wMD('src/app/videodiff-chat/DESIGN_DECISIONS.md', `# VideoDiff - Chat Agent\nRemoves the burden of timeline navigation by having an AI agent walk the user through recommended edits conversationally.`);

