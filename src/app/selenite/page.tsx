/* eslint-disable @typescript-eslint/no-explicit-any */'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Selenite() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const generate = async () => {
    if (!topic) return alert('Please enter a topic');
    setLoading(true);
    setData(null);
    try {
      const res = await fetch('/api/overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (e: any) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-teal-600 hover:underline">← Back to Showcase</Link>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-teal-800">Selenite</h1>
        <p className="text-gray-600 mb-8">Scaffolding Online Sensemaking with Comprehensive Overviews Elicited from Large Language Models</p>
        
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl mb-4 font-semibold">What do you want to compare?</h2>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="border p-2 flex-1 rounded" 
              placeholder="e.g. Baby Strollers, JavaScript Frameworks" 
            />
            <button 
              onClick={generate} 
              disabled={loading}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
            >
              Generate Overview
            </button>
          </div>
          {loading && <p className="text-gray-500 mt-4 animate-pulse">Thinking... Analyzing criteria and options...</p>}
        </div>

        {data && (
          <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Overview for: {topic}</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">Options \\ Criteria</th>
                  {data.criteria.map((c: string) => (
                    <th key={c} className="border p-3 font-semibold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.options.map((opt: string) => (
                  <tr key={opt}>
                    <td className="border p-3 font-bold bg-gray-50">{opt}</td>
                    {data.criteria.map((c: string) => (
                      <td key={c} className="border p-3 text-sm text-gray-700">
                        {data.matrix[opt]?.[c] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
