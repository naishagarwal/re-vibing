/* eslint-disable @typescript-eslint/no-explicit-any */'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TaleBrushSliders() {
  const [context, setContext] = useState('Melissa walked into the dark cave.');
  const [joy, setJoy] = useState(50);
  const [danger, setDanger] = useState(50);
  const [mystery, setMystery] = useState(50);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/talebrush-sliders', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ context, joy, danger, mystery })
      });
      const data = await res.json();
      if(data.sentence) setContext(c => c + ' ' + data.sentence);
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-amber-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2 text-amber-800">TaleBrush: Discrete Emotion Sliders</h1>
      <p className="mb-6 text-gray-600">Design Decision Changed: From continuous pre-sketched 2D fortune line to discrete, iterative multidimensional emotion sliders.</p>
      
      <div className="bg-white p-6 shadow rounded mb-6 border-l-4 border-amber-500">
        <h2 className="font-bold mb-4 text-gray-400 uppercase tracking-widest text-sm">Story So Far</h2>
        <p className="text-lg leading-relaxed text-gray-800">{context}</p>
      </div>

      <div className="bg-white p-8 shadow rounded grid gap-8">
        <div>
          <div className="flex justify-between font-bold text-yellow-600 mb-2">
            <label>Joy / Happiness</label>
            <span>{joy}%</span>
          </div>
          <input type="range" min="0" max="100" value={joy} onChange={e=>setJoy(+e.target.value)} className="w-full accent-yellow-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        
        <div>
          <div className="flex justify-between font-bold text-red-600 mb-2">
            <label>Danger / Action</label>
            <span>{danger}%</span>
          </div>
          <input type="range" min="0" max="100" value={danger} onChange={e=>setDanger(+e.target.value)} className="w-full accent-red-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        
        <div>
          <div className="flex justify-between font-bold text-purple-600 mb-2">
            <label>Mystery / Intrigue</label>
            <span>{mystery}%</span>
          </div>
          <input type="range" min="0" max="100" value={mystery} onChange={e=>setMystery(+e.target.value)} className="w-full accent-purple-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        
        <button onClick={generate} disabled={loading} className="bg-amber-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-amber-700 disabled:opacity-50 transition-colors mt-4 shadow">
          {loading ? 'Writing next sentence...' : 'Generate Next Sentence'}
        </button>
      </div>
    </div>
  );
}
