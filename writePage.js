const fs = require('fs');

const content = `// page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import * as LucideIcons from 'lucide-react';
import { Loader2, UploadCloud, SplitSquareVertical, Blend } from 'lucide-react';

const defaultCode = \`const App = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">My Park App</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Yosemite National Park</h2>
          <p className="text-sm text-gray-600 mt-2">California, USA</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Details</button>
        </div>
      </div>
    </div>
  );
};
render(<App />);\`;

type CodeChange = { type: string; before: string; after: string };
type CategorizedChange = { category: string; changes: CodeChange[] };
type BlendResponse = {
  designExplanation: string;
  differences: string;
  updatedCode: string;
  categorizedChanges: CategorizedChange[];
};

export default function MistyApp() {
  const [code, setCode] = useState(defaultCode);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [loading, setLoading] = useState(false);
  const [aspect, setAspect] = useState('Layout');
  const [blendResponse, setBlendResponse] = useState<BlendResponse | null>(null);
  const [toggledCategories, setToggledCategories] = useState<Set<number>>(new Set());

  const imageRef = useRef<HTMLImageElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = (): string | null => {
    if (!imageRef.current || !crop || crop.width === 0 || crop.height === 0) return imageSrc;
    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0, 0, crop.width, crop.height
    );
    return canvas.toDataURL('image/jpeg');
  };

  const handleBlend = async (type: 'global' | 'drag-and-drop') => {
    if (!imageSrc) return alert('Please upload a reference image first.');
    const imgData = type === 'drag-and-drop' ? getCroppedImg() : imageSrc;
    if (!imgData) return alert('Failed to get image data.');

    setLoading(true);
    setBlendResponse(null);
    try {
      const res = await fetch('/api/blend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wipCode: code, referenceImage: imgData, aspect, type }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setBlendResponse(data);
      setCode(data.updatedCode);
      setToggledCategories(new Set(data.categorizedChanges.map((_: any, i: number) => i)));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (index: number) => {
    const newSet = new Set(toggledCategories);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setToggledCategories(newSet);

    if (!blendResponse) return;
    let modifiedCode = blendResponse.updatedCode;
    
    blendResponse.categorizedChanges.forEach((cat, i) => {
      if (!newSet.has(i)) {
        cat.changes.forEach((ch) => {
          if (ch.after && ch.before !== undefined) {
             const regex = new RegExp(\`\\\\b\${ch.after}\\\\b\`, 'g');
             modifiedCode = modifiedCode.replace(regex, ch.before);
          }
        });
      }
    });
    setCode(modifiedCode);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <Blend className="text-blue-600 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Misty Prototype</h1>
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 flex flex-col border-r bg-white">
          <LiveProvider code={code} scope={{ ...LucideIcons, React }} noInline>
            <div className="h-1/2 flex flex-col border-b">
              <div className="p-2 bg-gray-100 border-b text-sm font-semibold">Code Editor</div>
              <div className="flex-1 overflow-auto bg-[#1e1e1e] p-2">
                <LiveEditor onChange={setCode} className="font-mono text-sm !bg-transparent" style={{fontFamily: '"Fira Code", monospace'}} />
              </div>
            </div>
            <div className="h-1/2 flex flex-col">
              <div className="p-2 bg-gray-100 border-b text-sm font-semibold">Live Preview</div>
              <div className="flex-1 overflow-auto relative bg-white">
                <LiveError className="text-red-500 p-4 font-mono text-sm bg-red-50" />
                <LivePreview className="w-full h-full" />
              </div>
            </div>
          </LiveProvider>
        </div>

        <div className="w-1/2 flex flex-col bg-gray-50">
          <div className="p-4 border-b bg-white flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-50 bg-white">
                <UploadCloud className="w-4 h-4" /> Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
              </label>
              
              <select value={aspect} onChange={(e) => setAspect(e.target.value)} className="px-4 py-2 border rounded bg-white">
                <option value="Layout">Layout</option>
                <option value="Visual Style">Visual Style</option>
                <option value="Color Theme">Color Theme</option>
              </select>

              <button onClick={() => handleBlend('global')} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Global Blend
              </button>
              <button onClick={() => handleBlend('drag-and-drop')} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Blend Cropped Area
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
            <div className="bg-white border rounded p-2 min-h-[300px] flex items-center justify-center relative overflow-hidden shadow-sm">
              {!imageSrc && <span className="text-gray-400">No image uploaded</span>}
              {imageSrc && (
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                  <img ref={imageRef} src={imageSrc} alt="Ref" className="max-h-[500px]" />
                </ReactCrop>
              )}
            </div>

            {blendResponse && (
              <div className="bg-white border rounded shadow-sm flex flex-col">
                <div className="p-3 border-b bg-gray-100 flex items-center gap-2">
                  <SplitSquareVertical className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Semantic Diff</h3>
                </div>
                <div className="p-4 text-sm text-gray-700">
                  <p><strong>Design:</strong> {blendResponse.designExplanation}</p>
                  <p className="mt-1"><strong>Diff:</strong> {blendResponse.differences}</p>
                </div>
                <div className="border-t p-4 flex flex-col gap-2 bg-gray-50">
                  {blendResponse.categorizedChanges.map((cat, i) => (
                    <label key={i} className="flex items-start gap-2 p-2 border rounded bg-white hover:bg-blue-50 cursor-pointer">
                      <input type="checkbox" className="mt-1" checked={toggledCategories.has(i)} onChange={() => handleToggle(i)} />
                      <div>
                        <span className="font-medium text-gray-800">{cat.category}</span>
                        <div className="text-xs text-gray-500 mt-1 space-y-1">
                          {cat.changes.map((c, idx) => (
                            <div key={idx}><span className="line-through text-red-400">{c.before || '(none)'}</span> → <span className="text-green-500">{c.after}</span></div>
                          ))}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
`;

fs.writeFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/page.tsx', content);
