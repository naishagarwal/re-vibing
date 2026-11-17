/* eslint-disable @typescript-eslint/no-explicit-any */'use client';

import { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';

export default function TaleBrush() {
  const [protagonist, setProtagonist] = useState('Melissa');
  const [startingText, setStartingText] = useState('Melissa fought a dragon.');
  const [loading, setLoading] = useState(false);
  const [sentences, setSentences] = useState<{text: string, fortune: number}[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    clearCanvas();
    const rect = canvasRef.current!.getBoundingClientRect();
    setPoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (points.length > 0 && x <= points[points.length - 1].x) return;
    
    const newPoints = [...points, { x, y }];
    setPoints(newPoints);
    
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const generate = async () => {
    if (points.length < 10) return alert('Please sketch a longer curve left to right.');
    
    const canvas = canvasRef.current!;
    const fortunes: number[] = [];
    for (let i = 0; i < 5; i++) {
      const targetX = (canvas.width / 5) * i + (canvas.width / 10);
      let closest = points[0];
      let minDist = Math.abs(points[0].x - targetX);
      for (const p of points) {
        if (Math.abs(p.x - targetX) < minDist) {
          minDist = Math.abs(p.x - targetX);
          closest = p;
        }
      }
      const normalizedY = ((150 - closest.y) / 150);
      fortunes.push(normalizedY);
    }

    setLoading(true);
    setSentences([]);
    try {
      const res = await fetch('/api/talebrush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ protagonist, starting_text: startingText, fortunes })
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      
      setSentences(json.sentences.map((t: string, i: number) => ({ text: t, fortune: fortunes[i] })));
    } catch (e: any) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-green-600 hover:underline">← Back to Showcase</Link>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-green-800">TaleBrush</h1>
        <p className="text-gray-600 mb-8">Sketching Stories with Generative Pretrained Language Models</p>

        <div className="bg-white p-6 rounded shadow-md mb-8 flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Protagonist Name</label>
              <input 
                type="text" 
                value={protagonist}
                onChange={e => setProtagonist(e.target.value)}
                className="border p-2 w-full rounded" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Starting Text</label>
              <input 
                type="text" 
                value={startingText}
                onChange={e => setStartingText(e.target.value)}
                className="border p-2 w-full rounded" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Sketch Fortune (Left to Right, Top = Good Luck, Bottom = Bad Luck)</label>
            <div className="relative w-[600px] h-[300px] rounded-lg border-2 border-gray-300" style={{ background: 'linear-gradient(to bottom, #e0ffe0 0%, #ffffff 50%, #ffe0e0 100%)' }}>
              <canvas 
                ref={canvasRef}
                width={600} 
                height={300}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                className="cursor-crosshair absolute top-0 left-0"
              />
              <span className="absolute top-2 left-2 text-xs text-green-800 font-bold pointer-events-none">Good Fortune (+1)</span>
              <span className="absolute bottom-2 left-2 text-xs text-red-800 font-bold pointer-events-none">Bad Fortune (-1)</span>
            </div>
            <button onClick={clearCanvas} className="text-sm text-gray-500 underline mt-2">Clear Sketch</button>
          </div>

          <button 
            onClick={generate} 
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-fit disabled:opacity-50"
          >
            Generate Story
          </button>
          {loading && <p className="text-gray-500 mt-2 animate-pulse">Generating story based on fortune curve...</p>}
        </div>

        {sentences.length > 0 && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="font-bold text-xl mb-4">Generated Story:</h2>
            <div className="space-y-4">
              <p className="text-gray-500 italic mb-2">{startingText}</p>
              {sentences.map((s, i) => (
                <div key={i} className={`p-4 border rounded flex items-center justify-between ${s.fortune >= 0 ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'}`}>
                  <span>{s.text}</span>
                  <span className="font-mono font-bold ml-4">Fortune: {s.fortune.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
