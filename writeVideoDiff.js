const fs = require('fs');
const content = `\'use client\';

import { useState } from \'react\';
import Link from \'next/link\';

export default function VideoDiff() {
  const [transcript, setTranscript] = useState(\'\');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const getActionStyle = (action: string) => {
    switch (action) {
      case \'cut\': return \'line-through text-red-500 bg-red-50\';
      case \'keep\': return \'text-gray-800\';
      case \'add_broll\': return \'text-blue-600 border-b-2 border-blue-400 bg-blue-50\';
      case \'add_text\': return \'text-purple-600 border-b-2 border-purple-400 bg-purple-50 font-bold\';
      default: return \'\';
    }
  };

  const getActionBadge = (action: string, note: string) => {
    if (action === \'add_broll\') return <span className="text-xs bg-blue-200 text-bl    if (action === \'add_broll\') return <span className="text-xction === \'add_text\') return <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded ml-1" title={note}>+Text</span>;
    if (action === \'cut\') return <span className="text-xs bg-red-200 text-red-800 px-1 rounded ml-1">Cut</span>;
    return null;
  };

  const generate = async () => {
    if (!transcript) return alert(\'Please enter a transcript\');
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(\'/api/videodiff\', {
        method: \'POST\',
        headers: { \'Content-Type\': \'application/json\' },
        body: JSON.stringify({ transcript }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-indigo-600 hover:underline">← Back to Showcase</Link>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-indigo-800">VideoDiff</h1>
        <p className="text-gray-600 mb-8">Human-AI Video Co-Creation with Alternatives</p>

        <div className="bg-white p-6 rounded shadow-md mb-8 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Enter Raw Video Transcript</h2>
          <textarea 
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            className="border p-3 w-full rounded h-32 resize-none" 
            placeholder="e.g. Welcome to my vlog! Today we\'re going to explore Tokyo. It\'s so busy here, there are lots of people..." 
          />
          <button 
            onClick={generate} 
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 w-fit disabled:opacity-50"
          >
            Generate Edit Alternatives
          </button>
          {loading && <p className="text-gray-500 mt-2 animate-pulse">Generating 3 unique AI video editing alternatives...</p>}
        </div>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.alternatives.map((alt: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded shadow-md border-t-4 border-indigo-500">
                <h3 className="font-bold text-xl mb-4">{alt.name}</h3>
                <div className="space-y-2 leading-relaxed">
                  {alt.edits.map((edit: any, idx: number) => (
                    <span key={idx} className={\`p-1 rounded inline-block \${getActionStyle(edit.action)} mr-1 mb-1\`}>
                      {edit.text} {getActionBadge(edit.action, edit.note)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('/Users/naishaagarwal/vibe-coding/showcase/src/app/videodiff/page.tsx', content);
