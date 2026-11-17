/* eslint-disable @typescript-eslint/no-explicit-any */import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    const { wipCode, referenceImage } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Given this react code:
${wipCode}
And the provided reference image, generate 3 DISTINCT aesthetic variations of the code that blend the reference image's layout/style into the React component. 
Return JSON:
{
  "variations": [
    { "name": "Minimalist", "code": "const App = () => { return (...) }; render(<App/>);" },
    { "name": "Playful", "code": "..." },
    { "name": "Corporate", "code": "..." }
  ]
}
Ensure 'code' is self-contained for react-live.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'user', content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: referenceImage } }
        ]}
      ]
    });
    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
