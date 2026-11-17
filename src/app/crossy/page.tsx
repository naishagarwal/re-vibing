'use client';

import { useState, type MouseEvent } from 'react';
import Link from 'next/link';

type Point = { x: number; y: number };

export default function CrossY() {
  const [path, setPath] = useState<Point[]>([]);
  const [color, setColor] = useState('black');

  const move = (e: MouseEvent<SVGSVGElement>) => {
    if (!e.buttons) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const nx = e.clientX - bounds.left - e.currentTarget.clientLeft;
    const ny = e.clientY - bounds.top - e.currentTarget.clientTop;
    const last = path[path.length - 1];

    if (
      last &&
      nx !== last.x &&
      ((last.x <= 100 && nx >= 100) || (last.x >= 100 && nx <= 100))
    ) {
      const y = last.y + ((ny - last.y) * (100 - last.x)) / (nx - last.x);

      if (y >= 100 && y <= 200) setColor('red');
      if (y >= 250 && y <= 350) setColor('blue');
    }

    setPath((previous) => [...previous, { x: nx, y: ny }]);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">
        ← Back to Showcase
      </Link>
      <h1 className="text-3xl font-bold mb-2">CrossY</h1>
      <p className="mb-6 text-gray-600">
        Original: Goal-crossing UI. Cross the colored vertical lines on the left
        to select that ink color.
      </p>

      <div className="flex gap-4 items-center mb-4">
        Current Color:
        <div className="w-8 h-8 rounded border" style={{ backgroundColor: color }} />
      </div>

      <svg
        width="800"
        height="500"
        className="border bg-white shadow-sm block cursor-crosshair"
        onMouseMove={move}
        onMouseUp={() => setPath([])}
        onMouseLeave={() => setPath([])}
      >
        <line x1="100" y1="100" x2="100" y2="200" stroke="red" strokeWidth="8" strokeLinecap="round" />
        <line x1="100" y1="250" x2="100" y2="350" stroke="blue" strokeWidth="8" strokeLinecap="round" />
        <line x1="100" y1="0" x2="100" y2="500" stroke="gray" strokeWidth="1" strokeDasharray="5,5" />

        {path.length > 0 && (
          <polyline
            points={path.map(({ x, y }) => `${x},${y}`).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}