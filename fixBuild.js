const fs = require('fs');

let route = fs.readFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/api/blend/route.ts', 'utf-8');
route = route.replace(`const openai = new OpenAI({\n  apiKey: process.env.OPENAI_API_KEY,\n});`, '');
route = route.replace(`if (!process.env.OPENAI_API_KEY) {\n      return NextResponse.json({ error: 'OPENAI_API_KEY is not set in .env' }, { status: 500 });\n    }`, `if (!process.env.OPENAI_API_KEY) {\n      return NextResponse.json({ error: 'OPENAI_API_KEY is not set in .env' }, { status: 500 });\n    }\n\n    const openai = new OpenAI({\n      apiKey: process.env.OPENAI_API_KEY,\n    });`);

fs.writeFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/api/blend/route.ts', route);
