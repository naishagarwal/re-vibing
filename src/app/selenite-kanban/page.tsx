/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SeleniteKanban() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Selenite: Kanban Board Comparison</h1>
      <p className="mb-6 text-gray-600">Design Decision: Options are automatically grouped into categorical columns based on their strongest traits.</p>
      <div className="grid grid-cols-3 gap-4">
         <div className="bg-gray-100 p-4 rounded shadow-sm border-t-4 border-green-500">
            <h3 className="font-bold text-lg mb-4 text-center">Highest Performance</h3>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">SolidJS</div>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">Svelte</div>
         </div>
         <div className="bg-gray-100 p-4 rounded shadow-sm border-t-4 border-blue-500">
            <h3 className="font-bold text-lg mb-4 text-center">Largest Ecosystem</h3>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">React</div>
         </div>
         <div className="bg-gray-100 p-4 rounded shadow-sm border-t-4 border-purple-500">
            <h3 className="font-bold text-lg mb-4 text-center">Easiest Learning Curve</h3>
            <div className="bg-white p-4 rounded shadow mb-2 font-semibold">Vue</div>
         </div>
      </div>
    </div>
  );
}
