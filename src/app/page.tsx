import Link from 'next/link';

export default function Home() {
  const systems = [
    { id: 'misty', name: 'Misty', desc: 'UI Prototyping Through Interactive Conceptual Blending.', c1: 'blue', o: 'Semantic Diff', vId: 'misty-variants', v: 'Multiple Variations', c2: 'blue' },
    { id: 'selenite', name: 'Selenite', desc: 'Scaffolding Online Sensemaking Overviews.', c1: 'teal', o: 'Text Comparison Matrix', vId: 'selenite-scoring', v: 'Quantitative Scoring', c2: 'teal' },
    { id: 'videodiff', name: 'VideoDiff', desc: 'Human-AI Video Co-Creation with Alternatives.', c1: 'indigo', o: 'Parallel Transcripts', vId: 'videodiff-merge', v: 'Inline Merge UI', c2: 'rose' },
    { id: '    { id: '    { id: '    { id: '    { id: '    { id: '    { id:erative Models.', c1: 'green', o: 'Continuous Fortune Sketch', vId: 'talebrush-sliders', v: 'Discrete Emotion Sliders', c2: 'amber' },
    { id: 'bubblecursor', name: 'BubbleCursor', desc: 'Targeting facilitation technique using area cursors.', c1: 'red', o: 'Voronoi Dynamic Resizing', vId: 'bubblecursor-magnetic', v: 'Gravity Wells (Magnetic)', c2: 'red' },
    { id: 'octopocus', name: 'Octopocus', desc: 'Dynamic guide for continuous gesture recognition.', c1: 'sky', o: 'Continuous Cursor Paths', vId: 'octopocus-cheatsheet', v: 'Static Sidebar Cheat Sheet', c2: 'sky' },
    { id: 'shift', name: 'Shift', desc: 'Solving fat-finger occlusion on touch screens.', c1: 'emerald', o: 'Shifted Callout Window', vId: 'shift-offset', v: 'Offset Virtual Cursor', c2: 'emerald' },
    { id: 'crossy', name: 'CrossY', desc: 'Crossing-based interfaces instead of point-and-click.', c1: 'orange', o: 'Line Segment Crossing', vId: 'crossy-dwell', v: 'Dwell-Time Selection', c2: 'orange' },
    { id: 'wedge', name: 'Wedge', desc: 'Visualizing off-screen targets.', c1: 'yellow', o: 'Screen-Edge Isosceles Triangles', vId: 'wedge-halo', v: 'Halo (Circle Arcs)', c2: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">HCI Research Prototypes Showcase</h1>
          <p className="text-xl text-gray-600">Original systems + Alternative Design Decision implementations.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systems.map(s => (
            <div key={s.id} className="bg-white rounded-xl shadow border p-6 flex flex-col">
              <h2 className={`text-2xl font-bold text-${s.c1}-700 mb-2`}>{s.name}</h2>
              <p className="text-gray-700 mb-6 flex-1">{s.desc}</p>
              <div className="flex gap-4">
                <Link href={`/${s.id}`} className={`bg-${s.c1}-100 text-${s.c1}-800 px-4 py-2 rounded text-sm hover:bg-${s.c1}-200 flex-1 text-center font-bold`}>Original: {s.o}</Link>
                <Link href={`/${s.vId}`} className={`bg-${s.c2}-100 text-${s.c2}-800 px-4 py-2 rounded text-sm hover:bg-${s.c2}-200 flex-1 text-center font-bold`}>Variant: {s.v}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
