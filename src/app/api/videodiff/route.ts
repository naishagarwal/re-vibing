import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not set in .env' }, { status: 500 });
    }
    const { transcript } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are the VideoDiff AI. You help video creators explore multiple editing variations.
Given this raw video transcript:
"${transcript}"

Generate 3 distinct editing alternatives. For each alternative, provide:
1. "name": A short descriptive name for this edit style.
2. "edits": A list of edits applied to the transcript. Each edit has:
   - "text": the original transcript segment
   - "action": "keep", "cut", "add_broll", or "add_text"
   - "note": Explanation or   - "note": Explanation or   - "note": Explanation or   - "notext segments across all edits should roughly cover the whole original transcript.
Make the 3 alternatives very different (e.g. one very concise, one visual heavy, one text heavy).

Return strict JSON matching this structure:
{
  "alternatives": [
    {
      "name": "Alt 1",
      "edits": [
        {"text": "...", "action": "keep", "note": ""}
      ]
    }
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
