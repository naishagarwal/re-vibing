import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not set in .env' }, { status: 500 });
    }
    const { protagonist, starting_text, fortunes } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const fortune_text = fortunes.map((f: number) => f.toFixed(2)).join(', ');
    
    const prompt = `You are TaleBrush, an AI that co-creates stories with writers based on a sketched fortune curve.
Protagonist: ${protagonist}
Starting Text: "${starting_text}"

The user has sketched a fortune curve with ${fortunes.length} points. 
The fortune values range from -1 (terrible luck/misfortune) to 1 (great luck/success).
The values are: ${fortune_text}

Generate exactly ${fortunes.length} short sentences that logically follow the "Starting Text".
Each sentence must correspond sequentially to the fortune values provided.
If the fortune is negative, something bad happens. If positive, something good happens.

Return strict JSON matching this structure:
{
  "sentences": [
    "Sentence 1 matching fortune 1...",
    "Sentence 2 matching fortune 2..."
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content');
    return NextResponse.json(JSON.parse(content));
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
