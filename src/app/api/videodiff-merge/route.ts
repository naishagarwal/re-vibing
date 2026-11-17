/* eslint-disable @typescript-eslint/no-explicit-any */import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    const { transcript } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Video transcript: "${transcript}"
Provide a single, heavily edited version of this transcript. Break the transcript into segments. For each segment, assign an action: 'keep', 'cut', 'add_broll', or 'add_text'.
Return JSON:
{
  "edits": [
    {"text": "Welcome to my vlog.", "action": "keep", "note": ""},
    {"text": "Umm, today...", "action": "cut", "note": "Filler"},
    {"text": "We are in Tokyo!", "action": "add_broll", "note": "Tokyo skyline"}
  ]
}`;

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
