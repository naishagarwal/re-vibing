'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { LiveProvider, LivePreview } from 'react-live';
import * as LucideIcons from 'lucide-react';

export default function MistyVariants() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [img, setImg] = useState<string|null>(null);

  const code = `const App = () => <div className="p-4 bg-gray-100"><h2>Hello World</h2><p>Base UI</p></div>; render(<App/>);`;

  const onFile = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result as string);
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const generate = async () => {
    if(!img) return;
    setLoading(true);
    try {
      const res = await fetch('/api/blend-variants', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ wipCode: code, referenceImage: img })
      });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Misty: Multiple Variations (A/B/C)</h1>
      <p className="mb-6 text-gray-600">Design Decision Changed: From a semantic diff toggle to 3 distinct holistic variations.</p>
      
      <div className="flex gap-4 mb-8 items-center bg-white p-4 shadow rounded">
        <input type="file" onChange={onFile} className="border p-2 rounded" />
        <button onClick={generate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">Generate Variations</button>
        {loading && <span className="animate-pulse">Generating...</span>}
      </div>

      {data?.variations && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.variations.map((v: any, i: number) => (
            <div key={i} className="border p-4 bg-white rounded shadow-sm">
              <h3 className="font-bold mb-4 border-b pb-2 text-blue-800">{v.name}</h3>
              <LiveProvider code={v.code} scope={{ ...LucideIcons, React }} noInline>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 h-[300px] overflow-auto">
                  <LivePreview />
                </div>
              </LiveProvider>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
