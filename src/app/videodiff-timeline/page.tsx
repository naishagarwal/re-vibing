/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VideoDiffTimeline() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videodiff-timeline', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ transcript: "Welcome to my video. Umm, today we will talk about cats. They are cute. This video is sponsored by nobody." })
      });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-indigo-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Tim/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } fat'use client';
itime-blocks (like Premiere Pro) rather thimport { use</import Link from 'next/link';

e{g
export default function Vidcla  const [loading, setLoading] = useState(falou  const [">{loading?'Generating...':'Generate Tim
line'}</button>

      {data?.blocks && (
         setLoading(true);
    try {p-    try {
      consrf ow-x-auto        method: 'POST', headers: {'Content-Type': 'applic1         bodend">
              {data.blocks.map((b: any, i: number) =>       });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
-50"      se      } finally { setLoading(falsol  };

  return (
    <div classNamet-bold";    <div         <Link href="/" className="text-indigo-600 mb-4        <h1 className="text-3xl font-bold mb-2">VideoDiff: Tim/* eslint-disable @typescript-le'use client';
import { useState } falow-hidden shrink-0 border border-black/20`} style={{width, height: b.type==='cuimport { use0%'}}>
                     <span class
e{g
export default function Vidcla  const [loading, setLoading] = useState(falou  city-70 line'}</button>

      {data?.blocks && (
         setLoading(true);
    try {p-    try {
      consrf ow-x-auto        methiv
      {data?. </       );
}
