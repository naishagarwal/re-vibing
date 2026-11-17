import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    const { context, joy, danger, mystery } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Story Context so far: "${context}"
Generate exactly ONE next sentence for this story. 
Incorporate these emotional intensities (0 to 100):
Joy: ${joy}
Danger: ${danger}
Mystery: ${mystery}
Return JSON: { "sentence": "..." }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }]
    });
    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
