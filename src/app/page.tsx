import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">HCI Research Prototypes Showcase</h1>
          <p className="text-xl text-gray-600">A collection of revibed interactive systems based on recent research papers.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/misty" className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border overflow-hidden">
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-800">Misty</h2>
              <p className="text-gray-700 mb-4 flex-1">UI Prototyping Through Interactive Conceptual Blending. Blend layouts and styles from reference images into your WIP React code.</p>
              <div className="text-blue-600 font-medium text-sm flex items-center">Try Prototype →</div>
            </div>
          </Link>

          <Link href="/selenite" className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border overflow-hidden">
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-teal-700 mb-2 group-hover:text-teal-800">Selenite</h2>
              <p className="text-gray-700 mb-4 flex-1">Scaffolding Online Sensemaking. Automatically generate comprehensive overviews and comparison matrices for unfamiliar topics.</p>
              <div className="text-teal-600 font-medium text-sm flex items-center">Try Prototype →</div>
            </div>
          </Link>

          <Link href="/videodiff" className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border overflow-hidden">
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2 group-hover:text-indigo-800">VideoDiff</h2>
              <p className="text-gray-700 mb-4 flex-1">Human-AI Video Co-Creation with Alternatives. Compare distinct editing variations of transcripts with AI-suggested B-rolls and cuts.</p>
              <div className="text-indigo-600 font-medium text-sm flex items-center">Try Prototype →</div>
            </div>
          </Link>

          <Link href="/talebrush" className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border overflow-hidden">
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-green-800">TaleBrush</h2>
              <p className="text-gray-700 mb-4 flex-1">Sketching Stories with LLMs. Co-create a story with AI by sketching a protagonist&apos;s changing fortune curve on a graph.</p>
              <div className="text-green-600 font-medium text-sm flex items-center">Try Prototype →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}