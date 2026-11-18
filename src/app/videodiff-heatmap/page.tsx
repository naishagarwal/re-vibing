/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function VideoDiffHeatmap() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-rose-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Audience Retention Heatmap</h1>
      <p className="mb-6 text-gray-600">Design Decision: Overlays a predictive heatmap over the video timeline to show where viewers are likely to drop off if an edit isn&apos;t made.</p>
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
}
