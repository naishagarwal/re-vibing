/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from 'openai';

export async function POST(req: Request) {
  try {
    const { wipCode, referenceImage, aspect, type } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not set in environment (need GEMINI_API_KEY or OPENAI_API_KEY)' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json" }
    });

    let systemPrompt = '';

    if (type === 'global') {
      systemPrompt = `Here is my react and tailwind code:
${wipCode}

Help me create a new component page that blends the content of the above code with the visual style, layout, and appearance of the reference image. Change only the source code corresponding to this, and no other sections.

Preserve the content in the UI of the code, follow the layout and visual style of the reference image, optionally add more content where the original code's content cannot fill in all fields in the reference image's layout. Do not use content from the reference image, just use its layout and visual style.

A few rules:
- First, explain in concise language the design of the reference screenshot. Use it as a basis of your generation.
- Make sure all text is legible on the background.
- Briefly summarize the differences between the reference image and the code, summarize them into a few categories of changes you want to make. Base your later generation of categorizedChanges based on these categories.
- only use tailwind, react, and lucide-react icons. Follow the current code structure, do not include any import or export statements, just use a simple component definition like \`const Component = () => { return (...) }; render(<Component />);\` so it can be evaluated by react-live. Do not include imports.
- Summarize the code changes in your response, use the format "categorizedChanges:" followed by a list of changes.
Return result in the below format, make sure you use json:
{
  "designExplanation": "explain the design of the screenshot image, focus on layout and color, be really concise, less than 30 words",
  "differences": "briefly summarize the differences between the reference image and the code",
  "updatedCode": "const App = () => { return (...) }; render(<App/>);", // return the whole component for the entire screen, with the updates, making sure to call render() at the end
  "categorizedChanges": [
    {
      "category": "Color: Changed light to dark theme",
      "changes": [
        { "type": "color", "before": "bg-black", "after": "bg-white" }
      ]
    }
  ]
}`;
    } else {
      systemPrompt = `Here is my react and tailwind code:
${wipCode}

Blend the ${aspect || 'layout and style'} of the reference image into the code. Change sections of the source code corresponding to this, as well as sections that need to be adjusted for the sake of following a layout. Preserve all original content in the UI for source code, only change/add the original content when it's really necessary for following a layout.

- only use tailwind, react, and lucide-react icons. Follow the current code structure, do not include any import or export statements, just use a simple component definition like \`const Component = () => { return (...) }; render(<Component />);\` so it can be evaluated by react-live. Do not include imports.
- Summarize the code changes in your response.
Return result in JSON format like the global blend prompt.
{
  "designExplanation": "...",
  "differences": "...",
  "updatedCode": "const App = () => { return (...) }; render(<App/>);",
  "categorizedChanges": [
    {
      "category": "...",
      "changes": [
        { "type": "...", "before": "...", "after": "..." }
      ]
    }
  ]
}`;
    }

    const base64Data = referenceImage.split(',')[1];
    const mimeMatch = referenceImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    const result = await model.generateContent([
      { text: systemPrompt },
      { inlineData: { data: base64Data, mimeType } }
    ]);
    
    const response = await result.response;
    const content = response.text();
    
    if (!content) throw new Error('No content returned');
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);

  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}