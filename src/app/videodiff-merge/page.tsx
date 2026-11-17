'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VideoDiffMerge() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState<Set<number>>(new Set());

  const generate = async () => {
    setLoading(true); setRejected(new Set());
    try {
      const res = await fetch('/api/videodiff-merge', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ transcript: "Welcome to my video. Umm, today we will talk about cats. They are cute. This video is sponsored by nobody." })
      });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  const toggle = (i: number) => {
    const next = new Set(rejected);
    if(next.has(i)) next.delete(i); else next.add(i);
    if(next.has(i)) next.delete(i); else next.add(i);
 my video.max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-rose-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2 text-rose-800">VideoDiff: Inline Merge UI</h1>
      <p className="mb-6 text-gray-600">Design Decision Changed: From 3 parallel alternatives to 1 unified sequence with inline accept/reject toggles.</p>
      
      <div className="bg-white p-6 shadow rounded mb-8 flex gap-4 items-center">
         <span className="flex-1 text-gray-600">Raw Transcript: &quot;Welcome to my video. Umm, today we will talk about cats. They are cute. This video is sponsored by nobody.&quot;</span>
         <button onClick={generate} disabled={loading} className="bg-rose-600 text-white px-6 py-2 rounded disabled:opacity-50 flex-shrink-0">
           {loading ? 'Generating...' : 'Generate AI Edits'}
         </button>
      </div>

      {data?.edits && (
        <div className="bg-white p-8 rounded shadow text-lg leading-loose border-t-4 border-rose-500">
          <p className="text-sm text-gray-400 mb-4 font-bold uppercase tracking-wider">Click any edit to reject/accept it</p>
          {data.edits.map((e: any, i: number) => {
            const isRej = rejected.has(i);
            const baseClass = "mx-1 px-1 rounded cursor-pointer transition-all border-b-2 ";
            let style = "border-transparent hover:bg-gray-100 ";
            
            if (e.action === 'cut') style = "border-red-200 bg-red-50 text-red-700 line-through ";
            if (e.action === 'add_broll') style = "border-blue-200 bg-blue-50 text-blue-800 ";
            if (e.action === 'add_text') style = "border-purple-200 bg-purple-50 font-bold text-purple-800 ";

            if (isRej) {
                style = "opacity-40 grayscale line-through decoration-gray-400 border-transparent hover:opacity-80 ";
            }

            return (
              <span key={i} onClick={()=>toggle(i)} className={`${baseClass} ${style}`} title={e.note}>
                {e.text}
                {!isRej && e.action !== 'keep' && <span className="ml-2 text-[10px] align-middle uppercase bg-gray-800 text-white px-1.5 py-0.5 rounded-full">{e.action}</span>}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
