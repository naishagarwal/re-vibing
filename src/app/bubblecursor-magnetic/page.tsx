/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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
