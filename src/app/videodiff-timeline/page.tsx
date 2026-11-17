'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VideoDiffTimeline() {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videodiff-timeline', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ transcript: "Welcome to my video. Umm, today we will talk about cats. They are cute. This video is sponsored by nobody." })
      });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-indigo-600 mb-4 block hover:underline">?     <Link href="/" className="text-indigo-600 mb-old mb-2">VideoDiff: Timeline NLE View</h1>
      <p className="mb-6 text-gray-600">Design Decision: Represent variations as visual time-blocks (like Premiere Pro) rather than a script.</p>

      <button onClick={generate} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded mb-8">{loading?'Generating...':'Generate Timeline'}</button>

      {data?.blocks && (
        <div className="bg-gray-900 p-8 rounded shadow overflow-x-auto whitespace-nowrap">
           <div className="flex gap-1 h-32 items-end">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.blocks.map((b: any, i: number) => {
                 let color = "bg-indigo-500 text-white";
                 if(b.type==='cut') color = "bg-red-900/50 text-red-300 line-through opacity-50";
                 if(b.type==='broll') color = "bg-blue-400 text-blue-900 font-bold";
                 const width = (b.duration_sec * 30) + 'px';
                 return (
                   <div key={i} className={`${color} p-2 rounded flex flex-col justify-end text-xs overflow-hidden shrink-0 border border-black/20`} style={{width, height: b.type==='cut'?'30%':'100%'}}>
                     <span className="truncate">{b.note || b.text}</span>
                     <span className="opacity-70 mt-1">{b.duration_sec}s</span>
                   </div>
                 );
              })}
           </div>
        </div>
      )}
    </div>
  );
}
