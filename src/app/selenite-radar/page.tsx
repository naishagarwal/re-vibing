/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SeleniteRadar() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Selenite: Radar Chart Overview</h1>
      <p className="mb-6 text-gray-600">Design Decision: Options are plotted on a multidimensional radar chart instead of a text matrix for quick visual shape comparison.</p>
      <div className="bg-white p-8 rounded shadow flex items-center justify-center border-t-4 border-teal-500 h-96 relative">
         <svg width="300" height="300" className="bg-gray-50 rounded-full border">
            {/* Mock Radar */}
            <polygon points="150,20 280,100 250,250 50,250 20,100" fill="teal" opacity="0.3" stroke="teal" strokeWidth="3" />
            <polygon points="150,50 240,120 200,200 100,200 60,120" fill="orange" opacity="0.3" stroke="orange" strokeWidth="3" />
            <line x1="150" y1="150" x2="150" y2="0" stroke="gray" strokeDasharray="4" />
            <line x1="150" y1="150" x2="300" y2="100" stroke="gray" strokeDasharray="4" />
            <line x1="150" y1="150" x2="250" y2="300" stroke="gray" strokeDasharray="4" />
         </svg>
         <div className="absolute top-10 left-10 text-sm font-bold text-teal-800 bg-teal-100 px-2 rounded">Option A</div>
         <div className="absolute bottom-10 right-10 text-sm font-bold text-orange-800 bg-orange-100 px-2 rounded">Option B</div>
      </div>
    </div>
  );
}
