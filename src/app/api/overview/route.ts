import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not set in .env (need GEMINI_API_KEY)' }, { status: 500 });
    }
    const { topic } = await req.json();
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are the Selenite system. Your goal is to scaffold online sensemaking by providing a comprehensive overview of options and criteria for a given topic.
Topic: ${topic}
Generate a JSON response containing:
1. A list of 4 "options" for this topic.
2. A list of 4 "criteria" to evaluate them.
3. A "matrix" (dictionary of option -> dictionary of criteria -> short text evaluating that option on that criteria).
Use this exact JSON structure:
{
    "options": ["Opt1", "Opt2", "Opt3", "Opt4"],
    "criteria": ["Crit1", "Crit2", "Crit3", "Crit4"],
    "matrix": {
        "Opt1": {"Crit1": "...", "Crit2": "...", "Crit3": "...", "Crit4": "..."}
    }
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