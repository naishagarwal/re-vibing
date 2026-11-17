/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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
