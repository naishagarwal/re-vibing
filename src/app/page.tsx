import Link from 'next/link';

export default function Home() {
  const systems = [
  {
    "id": "misty",
    "name": "Misty",
    "desc": "UI Prototyping Through Interactive Conceptual Blending.",
    "c1": "blue",
    "v": [
      {
        "path": "misty",
        "name": "Semantic Diff"
      },
      {
        "path": "misty-variants",
        "name": "Multiple Variations"
      },
      {
        "path": "misty-voice",
        "name": "Voice Driven"
      },
      {
        "path": "misty-slider",
        "name": "Intensity Slider"
      },
      {
        "path": "misty-lasso",
        "name": "Lasso Region"
      }
    ]
  },
  {
    "id": "selenite",
    "name": "Selenite",
    "desc": "Scaffolding Online Sensemaking Overviews.",
    "c1": "teal",
    "v": [
      {
        "path": "selenite",
        "name": "Text Matrix"
      },
      {
        "path": "selenite-scoring",
        "name": "Quantitative Scoring"
      },
      {
        "path": "selenite-radar",
        "name": "Radar Chart"
      },
      {
        "path": "selenite-kanban",
        "name": "Kanban Board"
      },
      {
        "path": "selenite-swipe",
        "name": "Swipe Sorting"
      }
    ]
  },
  {
    "id": "videodiff",
    "name": "VideoDiff",
    "desc": "Human-AI Video Co-Creation with Alternatives.",
    "c1": "indigo",
    "v": [
      {
        "path": "videodiff",
        "name": "Parallel Transcripts"
      },
      {
        "path": "videodiff-merge",
        "name": "Inline Merge UI"
      },
      {
        "path": "videodiff-timeline",
        "name": "NLE Timeline Block"
      },
      {
        "path": "videodiff-storyboard",
        "name": "Storyboard Comics"
      },
      {
        "path": "videodiff-heatmap",
        "name": "Engagement Heatmap"
      },
      {
        "path": "videodiff-chat",
        "name": "Co-editor Chat"
      },
      {
        "path": "videodiff-rules",
        "name": "Rule-based"
      }
    ]
  },
  {
    "id": "talebrush",
    "name": "TaleBrush",
    "desc": "Sketching Stories with Generative Models.",
    "c1": "green",
    "v": [
      {
        "path": "talebrush",
        "name": "Continuous Fortune Sketch"
      },
      {
        "path": "talebrush-sliders",
        "name": "Emotion Sliders"
      },
      {
        "path": "talebrush-emoji",
        "name": "Emoji Timeline"
      },
      {
        "path": "talebrush-branching",
        "name": "Branching Options"
      },
      {
        "path": "talebrush-cards",
        "name": "Story Cards"
      },
      {
        "path": "talebrush-map",
        "name": "Geographic Map"
      },
      {
        "path": "talebrush-audio",
        "name": "Musical Mood"
      }
    ]
  },
  {
    "id": "bubblecursor",
    "name": "BubbleCursor",
    "desc": "Targeting facilitation technique using area cursors.",
    "c1": "red",
    "v": [
      {
        "path": "bubblecursor",
        "name": "Voronoi Resizing"
      },
      {
        "path": "bubblecursor-magnetic",
        "name": "Magnetic Target"
      },
      {
        "path": "bubblecursor-zoom",
        "name": "Lens Magnification"
      },
      {
        "path": "bubblecursor-snapping",
        "name": "Line-of-sight Snapping"
      },
      {
        "path": "bubblecursor-keyboard",
        "name": "Point & Type"
      }
    ]
  },
  {
    "id": "octopocus",
    "name": "Octopocus",
    "desc": "Dynamic guide for continuous gesture recognition.",
    "c1": "sky",
    "v": [
      {
        "path": "octopocus",
        "name": "Cursor Paths"
      },
      {
        "path": "octopocus-cheatsheet",
        "name": "Static Sidebar"
      },
      {
        "path": "octopocus-audio",
        "name": "Audio Sonification"
      },
      {
        "path": "octopocus-haptic",
        "name": "Haptic Friction"
      },
      {
        "path": "octopocus-ghost",
        "name": "Ghost Tracing"
      }
    ]
  },
  {
    "id": "shift",
    "name": "Shift",
    "desc": "Solving fat-finger occlusion on touch screens.",
    "c1": "emerald",
    "v": [
      {
        "path": "shift",
        "name": "Callout Window"
      },
      {
        "path": "shift-offset",
        "name": "Offset Virtual Cursor"
      },
      {
        "path": "shift-fisheye",
        "name": "Fisheye Distortion"
      },
      {
        "path": "shift-transparent",
        "name": "Transparent Finger"
      },
      {
        "path": "shift-peel",
        "name": "Page Peel"
      }
    ]
  },
  {
    "id": "crossy",
    "name": "CrossY",
    "desc": "Crossing-based interfaces instead of point-and-click.",
    "c1": "orange",
    "v": [
      {
        "path": "crossy",
        "name": "Line Crossing"
      },
      {
        "path": "crossy-dwell",
        "name": "Dwell Selection"
      },
      {
        "path": "crossy-pinch",
        "name": "Pinch-to-Select"
      },
      {
        "path": "crossy-dial",
        "name": "Radial Dial"
      },
      {
        "path": "crossy-scratch",
        "name": "Scratch-off"
      }
    ]
  },
  {
    "id": "wedge",
    "name": "Wedge",
    "desc": "Visualizing off-screen targets.",
    "c1": "yellow",
    "v": [
      {
        "path": "wedge",
        "name": "Isosceles Triangles"
      },
      {
        "path": "wedge-halo",
        "name": "Halo Arcs"
      },
      {
        "path": "wedge-radar",
        "name": "Mini-map Radar"
      },
      {
        "path": "wedge-glow",
        "name": "Edge Glow"
      },
      {
        "path": "wedge-arrows",
        "name": "3D Arrows"
      }
    ]
  }
];
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">HCI Research Prototypes Showcase</h1>
          <p className="text-xl text-gray-600 mb-6">Original systems + Alternative Design Decision implementations.</p>
          <Link href="/evaluation" className="inline-block bg-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md">
             View Evaluation Rubric & Rankings →
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systems.map(s => (
            <div key={s.id} className="bg-white rounded-xl shadow border p-6 flex flex-col">
              <h2 className={`text-2xl font-bold text-${s.c1}-700 mb-2`}>{s.name}</h2>
              <p className="text-gray-700 mb-4 flex-1">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.v.map((v, i) => (
                   <Link key={v.path} href={`/${v.path}`} className={`${i===0 ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-gray-100 text-gray-800 border hover:bg-gray-200'} px-3 py-1.5 rounded text-xs font-bold transition-all`}>
                     {i===0 ? 'Original: ' : 'Variant: '}{v.name}
                   </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
