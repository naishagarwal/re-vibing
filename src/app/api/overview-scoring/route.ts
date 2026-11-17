/* eslint-disable @typescript-eslint/no-explicit-any */import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    const { topic } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Topic: ${topic}
Generate a JSON response containing 4 options and 4 criteria. Instead of text, provide a score from 0 to 100 for each intersection.
{
    "options": ["Opt1", "Opt2", "Opt3", "Opt4"],
    "criteria": ["Crit1", "Crit2", "Crit3", "Crit4"],
    "matrix": {
        "Opt1": {"Crit1": 85, "Crit2": 40, "Crit3": 90, "Crit4": 60}
    }
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
