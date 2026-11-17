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
         <label className="flex items-center gap-2 mb-2"><input type="checkbox" defaultChecked /> Cut all &         <label className="flex items-center gap-2 mb-2"><input me="flex items-center gap-2 mb-2"><input type="checkbox" defaultChecked /> Insert B-Roll on location mentions</label>
         <label className="flex items-center gap-2 mb-6"><input type="checkbox" /> Add huge text overlays for emphasis</label>
         <button className="bg-indigo-600 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed">Apply Rules &amp; Generate</button>
      </div>
    </div>
  );
}
