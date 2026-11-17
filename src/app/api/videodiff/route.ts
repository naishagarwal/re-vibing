import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not set in .env (need GEMINI_API_KEY)' }, { status: 500 });
    }
    const { transcript } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `You are the VideoDiff AI. You help video creators explore multiple editing variations.
Given this raw video transcript:
"${transcript}"

Generate 3 distinct editing alternatives. For each alternative, provide:
1. "name": A short descriptive name for this edit style.
2. "edits": A list of edits a2. "edits": A list of edits a2. "edits": A list of edits a2. "edal transcript segment
   - "action": "keep", "cut", "add_broll", or "add_text"
   - "note": Explanation or description (e.g. "B-roll of city skyline")
   
The combined text segments across all edits should roughly cover the whole original transcript.
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
}
Make sure to return only JSON without markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();
    
    if (!content) throw new Error('No content');
    
    if (content.startsWith('\`\`\`json')) {
      content = content.replace(/\`\`\`json\n?/, '').replace(/\`\`\`$/, '');
    }
    return NextResponse.json(JSON.parse(content));
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
