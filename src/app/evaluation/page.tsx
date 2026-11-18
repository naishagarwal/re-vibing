import Link from 'next/link';

export default function Evaluation() {
  const evals = [
    {
      name: 'Misty', color: 'blue',
      problem: 'Prototyping UIs by manually looking at a reference image and writing code is tedious and time-consuming.',
      table: [
        { name: 'Original (Semantic Diff)', eff: 3, pre: 4, cog: 2, vis: 3, tot: 12 },
        { name: 'Multiple Variations (A/B)', eff: 5, pre: 2, cog: 5, vis: 4, tot: 16, bold: true },
        { name: 'Voice Driven', eff: 4, pre: 3, cog: 4, vis: 5, tot: 16, bold: true },
        { name: 'Intensity Slider', eff: 5, pre: 1, cog: 5, vis: 4, tot: 15 },
        { name: 'Lasso Region', eff: 2, pre: 5, cog: 3, vis: 3, tot: 13 }
      ],
      explanations: [
        { name: 'Original', text: 'Highly precise, but reading through categorized code diffs imposes a massive cognitive load on the user.' },
        { name: 'Multiple Variations', text: 'Generating 3 distinct aesthetic variations allows the user to explore a design space instantly (High EFF/COG), though it lacks granular fine-tuning (Low PRE).' },
        { name: 'Voice Driven', text: 'Extremely unobtrusive (High VIS) and natural, but LLM voice interpretation can occasionally miss exact spatial constraints (Med PRE).' },
        { name: 'Intensity Slider', text: 'Fun and fast, but completely blunt—you cannot target specific elements.' },
        { name: 'Lasso Region', text: 'The most precise, but manually drawing geometric boundaries over code previews is slow (Low EFF).' }
      ],
      best: 'Multiple Variations (A/B) & Voice',
      bestDesc: 'For rapid prototyping, Multiple Variations is superior for the initial exploration phase, while Voice Driven is the best interaction model for iteratively refining the chosen variation without having to parse complex UI menus.'
    },
    {
      name: 'Selenite', color: 'teal',
      problem: 'Making sense of unfamiliar topics (like comparing JS frameworks) involves sifting through massive amounts of unstructured text.',
      table: [
        { name: 'Original (Text Matrix)', eff: 2, pre: 4, cog: 2, vis: 2, tot: 10 },
        { name: 'Quantitative Scoring', eff: 5, pre: 4, cog: 5, vis: 4, tot: 18, bold: true },
        { name: 'Interactive Decision Tree', eff: 3, pre: 5, cog: 4, vis: 5, tot: 17 },
        { name: 'Conversational QA', eff: 3, pre: 4, cog: 5, vis: 5, tot: 17 },
        { name: 'Radar Chart', eff: 4, pre: 2, cog: 3, vis: 4, tot: 13 }
      ],
      explanations: [
        { name: 'Original', text: 'A giant wall of text. Takes up massive screen real estate and requires intense reading.' },
        { name: 'Quantitative Scoring', text: 'Converting text to normalized 0-100 progress bars allows instant visual comparison. Highly efficient.' },
        { name: 'Interactive Decision Tree', text: 'Very precise (High PRE), but answering questions sequentially slows the user down (Med EFF).' },
        { name: 'Conversational QA', text: 'Highly natural and unobtrusive, but requires the user to know what questions to ask.' },
        { name: 'Radar Chart', text: 'Good for evaluating the "shape" of an option, but overlapping polygons become visually confusing.' }
      ],
      best: 'Quantitative Scoring',
      bestDesc: 'Quantitative Scoring is the undeniable winner. By utilizing the LLM to process text into structured numerical scores, it perfectly offloads cognitive effort from the user to the machine, allowing for instantaneous visual sensemaking.'
    },

    {
      name: 'VideoDiff', color: 'rose',
      problem: 'Comparing multiple AI-generated video edits simultaneously is cognitively overwhelming due to the temporal nature of video.',
      table: [
        { name: 'Original (Parallel Transcripts)', eff: 3, pre: 4, cog: 2, vis: 1, tot: 10 },
        { name: 'Inline Merge UI', eff: 5, pre: 5, cog: 5, vis: 4, tot: 19, bold: true },
        { name: 'Timeline NLE', eff: 4, pre: 3, cog: 4, vis: 4, tot: 15 },
        { name: 'Rule-based Constraints', eff: 5, pre: 2, cog: 5, vis: 5, tot: 17 },
        { name: 'Storyboard Comics', eff: 4, pre: 2, cog: 5, vis: 3, tot: 14 }
      ],
      explanations: [
        { name: 'Original', text: 'Rendering 3 full transcripts side-by-side takes up massive real estate and makes cross-referencing exhausting.' },
        { name: 'Inline Merge UI', text: 'Functions like resolving a Git Merge conflict. The user sees one clean transcript with togglable edits. Extremely high efficiency, precision, and low cognitive load.' },
        { name: 'Timeline NLE', text: 'Familiar to video editors, but block structures make it difficult to know exactly what word is being cut.' },
        { name: 'Rule-based Constraints', text: 'Extremely fast and uncluttered, but the user gives up granular control.' },
        { name: 'Storyboard Comics', text: 'Great for visual pacing, but terrible for editing audio/dialogue nuances.' }
      ],
      best: 'Inline Merge UI',
      bestDesc: 'Inline Merge UI is a phenomenally better paradigm. Instead of forcing the user to mentally diff three separate documents, it compiles the AI\'s suggestions into a single, highly actionable, togglable document.'
    },
    {
      name: 'TaleBrush', color: 'amber',
      problem: 'Controlling the emotional tone of generative AI story output is difficult using standard text prompts.',
      table: [
        { name: 'Original (Fortune Sketch)', eff: 4, pre: 2, cog: 3, vis: 4, tot: 13 },
        { name: 'Discrete Emotion Sliders', eff: 3, pre: 5, cog: 4, vis: 4, tot: 16 },
        { name: 'Emoji Timeline', eff: 4, pre: 3, cog: 5, vis: 4, tot: 16 },
        { name: 'Branching Narrative', eff: 2, pre: 4, cog: 5, vis: 4, tot: 15 },
        { name: 'Story Cards', eff: 5, pre: 3, cog: 5, vis: 5, tot: 18, bold: true }
      ],
      explanations: [
        { name: 'Original', text: 'Drawing a continuous 2D curve is fluid, but it is highly abstract. A slight dip in the curve is hard for the AI to interpret precisely.' },
        { name: 'Discrete Emotion Sliders', text: 'Allows granular, exact control over multidimensional tones (High PRE), but setting sliders step-by-step is slower (Med EFF).' },
        { name: 'Emoji Timeline', text: 'Highly semantic. Dropping a skull emoji is more mentally intuitive than drawing a downward curve.' },
        { name: 'Branching Narrative', text: 'Easiest mental load (just pick 1 of 3), but building a story step-by-step is slow (Low EFF).' },
        { name: 'Story Cards', text: 'Throwing down a "Betrayal" card is blazingly fast (High EFF), extremely intuitive, and requires zero screen clutter.' }
      ],
      best: 'Story Cards',
      bestDesc: 'For creative writing, Story Cards abstract away the mathematics of fortune graphs and replace them with established narrative tropes, offering the highest efficiency and most intuitive user experience.'
    },
    {
      name: 'BubbleCursor', color: 'red',
      problem: 'Fitts\'s Law states selecting small targets is slow. How can we make hitting small, dense targets easier?',
      table: [
        { name: 'Original (Voronoi Resizing)', eff: 5, pre: 5, cog: 3, vis: 2, tot: 15 },
        { name: 'Gravity Wells (Magnetic)', eff: 5, pre: 4, cog: 5, vis: 5, tot: 19, bold: true },
        { name: 'Lens Magnification', eff: 3, pre: 4, cog: 3, vis: 2, tot: 12 },
        { name: 'Line-of-sight Snapping', eff: 5, pre: 5, cog: 2, vis: 3, tot: 15 },
        { name: 'Point & Type (Keyboard)', eff: 2, pre: 5, cog: 2, vis: 4, tot: 13 }
      ],
      explanations: [
        { name: 'Original', text: 'The constantly morphing circular cursor is visually distracting (Low VIS) and can confuse users as it rapidly expands and shrinks (Med COG).' },
        { name: 'Gravity Wells (Magnetic)', text: 'Highly efficient. The cursor remains a standard, unobtrusive dot, while targets simply warp to it. It feels magical and invisible.' },
        { name: 'Lens Magnification', text: 'Magnifying targets causes them to physically shift their boundaries, leading to target tracking problems where items "dance" away from the cursor.' },
        { name: 'Line-of-sight Snapping', text: 'Insanely fast, but the cursor teleporting across the screen breaks the user\'s continuous mental tracking (Low COG).' },
        { name: 'Point & Type (Keyboard)', text: 'Guarantees zero misclicks (High PRE), but forcing the user to switch from mouse to keyboard is very slow.' }
      ],
      best: 'Gravity Wells (Magnetic)',
      bestDesc: 'Gravity Wells achieves the exact same mathematical benefits of the original BubbleCursor (expanding target activation area) but does so completely invisibly, maximizing visual unobtrusiveness and user comfort.'
    },
    {
      name: 'Octopocus', color: 'sky',
      problem: 'Users struggle to learn continuous marking menus/gestures without visual cheat sheets.',
      table: [
        { name: 'Original (Cursor Paths)', eff: 4, pre: 4, cog: 3, vis: 2, tot: 13 },
        { name: 'Static Sidebar', eff: 3, pre: 4, cog: 4, vis: 4, tot: 15 },
        { name: 'Audio Sonification', eff: 3, pre: 2, cog: 2, vis: 5, tot: 12 },
        { name: 'Haptic Friction', eff: 4, pre: 4, cog: 3, vis: 5, tot: 16 },
        { name: 'Ghost Tracing', eff: 5, pre: 5, cog: 5, vis: 4, tot: 19, bold: true }
      ],
      explanations: [
        { name: 'Original', text: 'Drawing multiple thick lines emerging from the cursor severely clutters the screen and occludes underlying content.' },
        { name: 'Static Sidebar', text: 'Cleans up the canvas, but forces the user to dart their eyes back and forth between the cursor and the sidebar.' },
        { name: 'Audio Sonification', text: 'Zero visual clutter, but mapping a rising pitch to 2D spatial deviation is incredibly difficult for the human brain to parse.' },
        { name: 'Haptic Friction', text: 'Great invisible feedback, but assumes complex hardware.' },
        { name: 'Ghost Tracing', text: 'Animating a ghost dot ahead of the user perfectly communicates both the shape and the speed of the gesture in real-time.' }
      ],
      best: 'Ghost Tracing',
      bestDesc: 'Ghost Tracing is the superior solution. By showing how to draw the gesture dynamically rather than just painting static end-states, it acts as a real-time kinetic tutor.'
    },
    {
      name: 'Shift', color: 'emerald',
      problem: 'When using touch screens, the user\'s physical finger occludes small targets (the "fat finger" problem).',
      table: [
        { name: 'Original (Callout Window)', eff: 4, pre: 4, cog: 4, vis: 2, tot: 14 },
        { name: 'Offset Virtual Cursor', eff: 4, pre: 5, cog: 4, vis: 4, tot: 17, bold: true },
        { name: 'Fisheye Distortion', eff: 3, pre: 3, cog: 3, vis: 2, tot: 11 },
        { name: 'Transparent Finger', eff: 4, pre: 3, cog: 5, vis: 5, tot: 17, bold: true },
        { name: 'Page Peel', eff: 2, pre: 4, cog: 2, vis: 1, tot: 9 }
      ],
      explanations: [
        { name: 'Original', text: 'Effective, but the large duplicated bubble covers up other content higher on the screen (Low VIS).' },
        { name: 'Offset Virtual Cursor', text: 'Small footprint, doesn\'t duplicate UI, and offers pinpoint pixel precision (High PRE).' },
        { name: 'Fisheye Distortion', text: 'Magnifying the screen dynamically pushes targets away from their actual physical locations, causing mis-taps.' },
        { name: 'Transparent Finger', text: 'Extremely natural mapping, but relies on predictive heuristics or camera hardware, making exact pixel-targeting slightly blurry.' },
        { name: 'Page Peel', text: 'Physically translating the UI away from the finger breaks spatial memory completely and is highly jarring.' }
      ],
      best: 'Offset Virtual Cursor',
      bestDesc: 'The Offset Virtual Cursor is the most robust and deployable solution, offering maximum pixel-precision targeting without the heavy visual penalty of a massive duplicated callout window.'
    },
    {
      name: 'CrossY', color: 'orange',
      problem: 'Clicking requires stopping motion. How can we make selection a fluid, continuous motion?',
      table: [
        { name: 'Original (Line Crossing)', eff: 5, pre: 3, cog: 4, vis: 4, tot: 16 },
        { name: 'Dwell Selection', eff: 2, pre: 5, cog: 5, vis: 5, tot: 17 },
        { name: 'Pinch-to-Select', eff: 3, pre: 5, cog: 3, vis: 4, tot: 15 },
        { name: 'Radial Dial', eff: 5, pre: 4, cog: 4, vis: 4, tot: 17, bold: true },
        { name: 'Scratch-off', eff: 2, pre: 5, cog: 4, vis: 4, tot: 15 }
      ],
      explanations: [
        { name: 'Original', text: 'Extremely fast but prone to accidental selections if the user\'s cursor drifts across a boundary unintentionally.' },
        { name: 'Dwell Selection', text: 'Guarantees zero false positives and is universally understood, but forcing a 1-second wait completely destroys the speed benefits of the system.' },
        { name: 'Pinch-to-Select', text: 'Intentional, but ergonomically fatiguing for continuous use.' },
        { name: 'Radial Dial', text: 'Highly efficient marking menu structure that allows for rapid, ballistic flicks outward in different directions.' },
        { name: 'Scratch-off', text: 'Eliminates accidental crosses (High PRE), but scrubbing back and forth requires too much motor effort.' }
      ],
      best: 'Radial Dial',
      bestDesc: 'The Radial Dial perfectly encapsulates the speed of goal-crossing while arranging targets in a way that minimizes accidental collisions along a linear path.'
    },
    {
      name: 'Wedge', color: 'yellow',
      problem: 'Visualizing the exact direction and distance of POIs that are off-screen without cluttering the viewport.',
      table: [
        { name: 'Original (Isosceles Triangles)', eff: 3, pre: 4, cog: 2, vis: 3, tot: 12 },
        { name: 'Halo (Baudisch)', eff: 5, pre: 4, cog: 5, vis: 4, tot: 18, bold: true },
        { name: 'Mini-map Radar', eff: 3, pre: 5, cog: 3, vis: 2, tot: 13 },
        { name: 'Edge Glow', eff: 4, pre: 2, cog: 5, vis: 5, tot: 16 },
        { name: '3D Arrows', eff: 5, pre: 3, cog: 5, vis: 4, tot: 17 }
      ],
      explanations: [
        { name: 'Original', text: 'Interpreting the aperture base of a triangle requires mental math to calculate distance.' },
        { name: 'Halo (Baudisch)', text: 'Humans intuitively understand the curvature of a circle. A flatter arc means the center of the circle is far away. Minimal mental math required.' },
        { name: 'Mini-map Radar', text: 'Exact coordinate precision, but forces the user to take their eyes off the main canvas and obscures a corner of the screen.' },
        { name: 'Edge Glow', text: 'Extremely unobtrusive and ambient, but color intensity is a terrible proxy for exact distance.' },
        { name: '3D Arrows', text: 'Familiar iconography makes it instantly understandable, but scaling standard UI elements can look messy.' }
      ],
      best: 'Halo (Baudisch)',
      bestDesc: 'Halo remains one of the most elegant HCI solutions for off-screen visualization. It utilizes human instinct regarding geometric curvature to convey complex distance metrics entirely passively.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <Link href="/" className="text-indigo-600 hover:underline font-bold mb-4 inline-block">← Back to Showcase</Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Rubric & Evaluation</h1>
          <p className="text-xl text-gray-600 mb-8">Detailed analysis and ranking of every original prototype and its variants.</p>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h2 className="text-xl font-bold mb-4">Evaluation Rubric (Scored 1-5, higher is better)</h2>
             <ul className="list-disc pl-5 space-y-2 text-gray-700">
               <li><strong>Efficiency (EFF):</strong> Speed of interaction and reduction of physical motor steps.</li>
               <li><strong>Precision (PRE):</strong> Granularity of control and accidental error prevention.</li>
               <li><strong>Cognitive Load (COG):</strong> Ease of learnability and minimization of mental effort.</li>
               <li><strong>Visual Unobtrusiveness (VIS):</strong> Minimization of screen clutter and occlusion.</li>
             </ul>
          </div>
        </header>

        <div className="space-y-12">
          {evals.map(sys => (
            <div key={sys.name} className="bg-white rounded-xl shadow-md border overflow-hidden">
               <div className={`bg-${sys.color}-600 p-6 text-white`}>
                  <h2 className="text-3xl font-bold">{sys.name}</h2>
                  <p className="opacity-90 mt-2"><strong>The Problem:</strong> {sys.problem}</p>
               </div>
               
               <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Variant Rankings</h3>
                  <div className="overflow-x-auto mb-6 border rounded-lg">
                    <table className="w-full text-left">
                       <thead className="bg-gray-100">
                         <tr>
                           <th className="p-3">Variation</th>
                           <th className="p-3 text-center">EFF</th>
                           <th className="p-3 text-center">PRE</th>
                           <th className="p-3 text-center">COG</th>
                           <th className="p-3 text-center">VIS</th>
                           <th className="p-3 text-center bg-gray-200">Total</th>
                         </tr>
                       </thead>





                       <tbody className="divide-y">
                         {sys.table.map(row => (
                           <tr key={row.name} className={`hover:bg-gray-50 ${row.bold ? 'font-bold bg-' + sys.color + '-50 text-' + sys.color + '-900' : ''}`}>
                             <td className="p-3">{row.name}</td>
                             <td className="p-3 text-center">{row.eff}</td>
                             <td className="p-3 text-center">{row.pre}</td>
                             <td className="p-3 text-center">{row.cog}</td>
                             <td className="p-3 text-center">{row.vis}</td>
                             <td className="p-3 text-center bg-gray-100">{row.tot}</td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3">Explanations</h3>
                  <ul className="space-y-2 mb-8">
                     {sys.explanations.map(exp => (
                       <li key={exp.name} className="text-gray-700">
                         <span className="font-bold text-gray-900">{exp.name}:</span> {exp.text}
                       </li>
                     ))}
                  </ul>

                  <div className={`bg-${sys.color}-50 border border-${sys.color}-200 p-6 rounded-lg`}>
                     <h3 className={`text-lg font-bold text-${sys.color}-800 mb-2 uppercase tracking-wide`}>Holistic Best Decision</h3>
                     <p className="text-2xl font-bold text-gray-900 mb-2">{sys.best}</p>
                     <p className="text-gray-700">{sys.bestDesc}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
