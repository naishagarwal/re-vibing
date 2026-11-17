/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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
                <div style={{position: 'absolute', left: -pos.x + 70, top: -pos.y + 70, transform: 'scale(1.5)', transformOrigin: `${pos.x}px ${pos.y}px`}}>
                   <Grid />
                </div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 border border-white" />
            </div>
         )}
      </div>
    </div>
  );
}
