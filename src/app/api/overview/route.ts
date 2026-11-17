import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not set in .env' }, { status: 500 });
    }
    const { topic } = await req.json();
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are the Selenite system. Your goal is to scaffold online sensemaking by providing a comprehensive overview of options and criteria for a given topic.
Topic: ${topic}
Generate a JSON response containing:
1. A list of 4 "options" for this topic.
2. A list of 4 "criteria" to evaluate them.
3. A "matrix" (dictionary of option -> dictionary of criteria -> short text3. A "matrix" (dictionary of option -> dictionary of criteria ->tructure:
{
    "options": ["Opt1", "Opt2", "Opt3", "Opt4"],
    "criteria": ["Crit1", "Crit2", "Crit3", "Crit4"],
    "matrix": {
        "Opt1": {"Crit1": "...", "Crit2": "...", "Crit3": "...", "Crit4": "..."}
    }
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
