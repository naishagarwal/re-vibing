import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not set in .env (need GEMINI_API_KEY)' }, { status: 500 });
    }
    
    const { protagonist, starting_text, fortunes } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    if (!content) throw new Error('No content');
    return NextResponse.json(JSON.parse(content));
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}