import Link from 'next/link';

export default function Evaluation() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <Link href="/" className="text-indigo-600 hover:underline font-bold mb-4 inline-block">← Back to Showcase</Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Rubric & Evaluation</h1>
          <p className="text-xl text-gray-600 mb-8">Detailed analysis and ranking of every original prototype and its variants.</p>
        </header>
      </div>
    </div>
  );
}