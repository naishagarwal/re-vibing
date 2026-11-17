'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SeleniteScoring() {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await fetch('/api/overview-scoring', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ topic })
      });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <Link href="/" className="text-teal-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2 text-teal-800">Selenite: Quantitative Scoring</h1>
      <p className="mb-6 text-gray-600">Design Decision Changed: From text-based evaluation matrix to visual numerical scores (0-100).</p>
      
      <div className="flex gap-4 mb-8 bg-white p-4 shadow rounded items-center">
        <input className="border p-2 flex-1 rounded" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic..." />
        <button onClick={generate} disabled={loading} className="bg-teal-600 text-white px-4 py-2 rounded disabled:opacity-50">Generate Score Matrix</button>
        {loading && <span className="animate-pulse">Loading...</span>}
      </div>

      {data?.options && (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border-b">Options</th>
                {data.criteria.map((c: string) => <th key={c} className="p-4 border-b">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.options.map((opt: string) => (
                <tr key={opt} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-bold border-r">{opt}</td>
                  {data.criteria.map((c: string) => {
                    const score = data.matrix[opt]?.[c] || 0;
                    return (
                      <td key={c} className="p-4 border-r last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400 font-mono">0</span>
                          <span className="text-sm font-bold text-teal-700">{score}</span>
                          <span className="text-xs text-gray-400 font-mono">100</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full transition-all duration-1000 ease-out" style={{width: `${score}%`}}></div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
