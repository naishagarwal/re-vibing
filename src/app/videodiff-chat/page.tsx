/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function VideoDiffChat() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-rose-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Co-editor Chat Agent</h1>
      <p className="mb-6 text-gray-600">Design Decision: Instead of laying out a whole timeline, a chat agent proposes edits conversationally one by one.</p>
      <div className="bg-white p-6 rounded shadow h-[400px] flex flex-col border-t-4 border-rose-500">
         <div className="flex-1 overflow-auto flex flex-col justify-start gap-4">
            <div className="bg-gray-100 p-4 rounded-lg w-3/4">
               <strong>AI Editor:</strong> I noticed a 5-second silence at 0:15. Should I cut this out?
               <div className="mt-3 flex gap-2">
                 <button className="bg-rose-500 text-white px-3 py-1 rounded text-sm">Cut it</button>
                 <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm">Keep it</button>
               </div>
            </div>
         </div>
         <input className="border p-3 w-full rounded" placeholder="Type instructions..." disabled />
      </div>
    </div>
  );
}
