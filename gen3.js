const fs = require('fs');
const path = require('path');

function write(p, content) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    if (p.endsWith('.tsx') || p.endsWith('.ts')) content = '/* eslint-disable @typescript-eslint/no-explicit-any */\n' + content.trim();
    fs.writeFileSync(p, content.trim() + '\n');
}

write('src/app/videodiff-timeline/DESIGN_DECISIONS.md', \`
# VideoDiff - Timeline-centric NLE View (Variant 2)
Instead of comparing text transcripts, the UI simulates a traditional Non-Linear Editor (NLE) timeline block view, allowing users to visually see where B-rolls and cuts happen over time.
\`);

write('src/app/api/videodiff-timeline/route.ts', \`
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    const { transcript } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = \\\`Video transcript: "\\\${transcript}"
Create a timeline-based representation of an edited video. Break it into consecutive time blocks.
Return JSON:
{
  "blocks": [
    {"type": "video", "text": "Welcome to my vlog.", "duration_sec": 3},
    {"type": "cut", "text": "Umm", "duration_sec": 1},
    {"type": "broll", "note": "Tokyo skyline", "duration_sec": 4}
  ]
}\\\`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }]
    });
    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
\`);

write('src/app/videodiff-timeline/page.tsx', \`
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
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Timeline NLE View</h1>
      <p className="mb-6 text-gray-600">Design Decision: Represent variations as visual time-blocks (like Premiere Pro) rather than a script.</p>
      
      <button onClick={generate} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded mb-8">{loading?'Generating...':'Generate Timeline'}</button>

      {data?.blocks && (
        <div className="bg-gray-900 p-8 rounded shadow overflow-x-auto whitespace-nowrap">
           <div className="flex gap-1 h-32 items-end">
              {data.blocks.map((b: any, i: number) => {
                 let color = "bg-indigo-500 text-white";
                 if(b.type==='cut') color = "bg-red-900/50 text-red-300 line-through opacity-50";
                 if(b.type==='broll') color = "bg-blue-400 text-blue-900 font-bold";
                 const width = (b.duration_sec * 30) + 'px';
                 return (
                   <div key={i} className={\\\`\${color} p-2 rounded flex flex-col justify-end text-xs overflow-hidden shrink-0 border border-black/20\\\`} style={{width, height: b.type==='cut'?'30%':'100%'}}>
                     <span className="truncate">{b.note || b.text}</span>
                     <span className="opacity-70 mt-1">{b.duration_sec}s</span>
                   </div>
                 );
              })}
           </div>
        </div>
      )}
    </div>
  );
}
\`);

write('src/app/videodiff-rules/DESIGN_DECISIONS.md', \`
# VideoDiff - Rule-based Constraints (Variant 3)
Instead of generating generic alternatives, the user specifies high-level editing rules (e.g., "Cut all pauses") and the system applies them deterministically to output a single conforming video edit.
\`);

write('src/app/videodiff-rules/page.tsx', \`
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VideoDiffRules() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-indigo-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">VideoDiff: Rule-based Constraints</h1>
      <p className="mb-6 text-gray-600">Design Decision: User selects explicit deterministic rules rather than relying on unconstrained generative variations.</p>
      <div className="bg-white p-8 rounded shadow border-l-4 border-indigo-500">
         <h2 className="text-lg font-bold mb-4 text-gray-400 uppercase">Select Global Rules:</h2>
         <label className="flex items-center gap-2 mb-2"><input type="checkbox" defaultChecked /> Cut all &quot;Umm&quot;s and filler words</label>
         <label className="flex items-center gap-2 mb-2"><input type="checkbox" defaultChecked /> Insert B-Roll on location mentions</label>
         <label className="flex items-center gap-2 mb-6"><input type="checkbox" /> Add huge text overlays for emphasis</label>
         <button className="bg-indigo-600 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed">Apply Rules &amp; Generate</button>
      </div>
    </div>
  );
}
\`);

write('src/app/talebrush-emoji/DESIGN_DECISIONS.md', \`
# TaleBrush - Emoji Timeline (Variant 2)
Instead of drawing a line, the user drags and drops semantic emoji onto a timeline to dictate specific events or tones.
\`);

write('src/app/talebrush-emoji/page.tsx', \`
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TaleBrushEmoji() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-green-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">TaleBrush: Emoji Timeline</h1>
      <p className="mb-6 text-gray-600">Design Decision: Using semantic discrete symbols (emoji) mapped on a 1D timeline instead of a 2D line graph.</p>
      <div className="bg-white p-8 rounded shadow text-center border-dashed border-2">
         <div className="flex justify-center gap-4 text-4xl mb-8">
            <span className="cursor-grab">💀</span>
            <span className="cursor-grab">❤️</span>
            <span className="cursor-grab">💰</span>
            <span className="cursor-grab">🏃</span>
         </div>
         <div className="h-16 bg-gray-100 border rounded flex items-center justify-center text-gray-400">
            [ Drop Emojis Here to Build Story Arc ]
         </div>
      </div>
    </div>
  );
}
\`);

write('src/app/talebrush-branching/DESIGN_DECISIONS.md', \`
# TaleBrush - Branching Narrative (Variant 3)
Instead of pre-planning a whole sequence, the AI generates 3 different continuations for the next step, allowing the user to select their favorite and build a story tree step-by-step.
\`);

write('src/app/api/talebrush-branching/route.ts', \`
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    const { context } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = \\\`Story Context: "\\\${context}"
Generate 3 distinct possible next sentences for this story. Make them go in very different directions.
Return JSON: { "options": ["...", "...", "..."] }\\\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }]
    });
    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
\`);

write('src/app/talebrush-branching/page.tsx', \`
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TaleBrushBranching() {
  const [context, setContext] = useState('Melissa fought a dragon.');
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true); setOptions([]);
    try {
      const res = await fetch('/api/talebrush-branching', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ context })
      });
      const data = await res.json();
      if(data.options) setOptions(data.options);
    } finally { setLoading(false); }
  };

  const select = (opt: string) => {
    setContext(c => c + ' ' + opt);
    setOptions([]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-green-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2 text-green-800">TaleBrush: Branching Narrative</h1>
      <p className="mb-6 text-gray-600">Design Decision: Generative options at each step instead of a pre-planned visual arc.</p>
      
      <div className="bg-white p-6 shadow rounded mb-6 border-l-4 border-green-500">
        <h2 className="font-bold mb-4 text-gray-400 uppercase tracking-widest text-sm">Story So Far</h2>
        <p className="text-lg leading-relaxed">{context}</p>
      </div>

      {!options.length && (
         <button onClick={generate} disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded">
           {loading ? 'Thinking...' : 'Generate Branches'}
         </button>
      )}

      {options.length > 0 && (
         <div className="grid gap-4 mt-4">
            {options.map((opt, i) => (
               <button key={i} onClick={()=>select(opt)} className="text-left p-4 border rounded hover:bg-green-50 hover:border-green-300 transition-colors">
                 {opt}
               </button>
            ))}
         </div>
      )}
    </div>
  );
}
\`);
