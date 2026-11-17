/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VideoDiffRules() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-indigo-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Rule-based Constraints</h1>
      <p className="mb-6 text-gray-600">Design Decision: User selects explicit deterministic rules rather than relying on unconstrained generative variations.</p>
      <div className="bg-white p-8 rounded shadow border-l-4 border-indigo-500">
         <h2 className="text-lg font-bold mb-4 text-gray-400 uppercase">Select Global Rules:</h2>
         <label className="flex items-center gap-2 mb-2"><input type="checkbox" defaultChecked /> Cut all &quot;Umm&quot;s and filler words</label>
         <label classNam/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState on'use client';
import { useState } from 'react';
importflimport { useter gap-2 mb-6"><input type="checkbox" /> Add huge text overlays for emphasis</label>
         <button classNa    <div di      <Link href="/" className="text-indigo-600 mb-4r-      <h1 className="tes &amp; Generate</button>
      </div>
    </div>
  );
}
