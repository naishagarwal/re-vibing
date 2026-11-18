/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function MistyVoice() {
  const [listening, setListening] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  
  const toggle = () => {
     if(!listening) {
        setListening(true);
        setTimeout(() => { setLog(l => [...l, "User: Make the buttons larger and rounded."]); }, 1500);
        setTimeout(() => { setLog(l => [...l, "System: Applied border-radius: 12px and padding: 16px."]); setListening(false); }, 3000);
     }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Misty: Voice-Driven Blending</h1>
      <p className="mb-6 text-gray-600">Design Decision: User holds a microphone button to dictate style changes conversationally, completely hands-free.</p>
      <div className="bg-white p-8 rounded shadow text-center border-t-4 border-blue-500">
         <button onClick={toggle} className={`w-24 h-24 rounded-full text-white font-bold text-lg shadow-lg ${listening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}>
            {listening ? 'Listening...' : 'Hold to Speak'}
         </button>
         <div className="mt-8 text-left bg-gray-50 p-4 rounded min-h-[150px]">
            {log.map((l,i) => <p key={i} className={`mb-2 ${l.startsWith('User') ? 'text-blue-700 font-bold' : 'text-gray-700'}`}>{l}</p>)}
         </div>
      </div>
    </div>
  );
}
