/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
             <div className="p-3 text-sm bg-gray-50 flex-1">&quot;"Welcome to the channel. Today we...&quot;"</div>
           </div>
         ))}
      </div>
    </div>
  );
}
