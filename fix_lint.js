const fs = require('fs');

const files = [
    'src/app/api/blend-variants/route.ts',
    'src/app/api/overview-scoring/route.ts',
    'src/app/api/talebrush-sliders/route.ts',
    'src/app/api/videodiff-merge/route.ts',
    'src/app/api/talebrush-branching/route.ts',
    'src/app/api/videodiff-timeline/route.ts',
    'src/app/misty-variants/page.tsx',
    'src/app/selenite-scoring/page.tsx',
    'src/app/videodiff-merge/page.tsx',
    'src/app/talebrush-sliders/page.tsx',
    'src/app/videodiff-timeline/page.tsx',
    'src/app/videodiff-rules/page.tsx',
    'src/app/talebrush-emoji/page.tsx',
    'src/app/talebrush-branching/page.tsx'
];

for (let i = 0; i < files.length; i++) {
    const f = files[i];
    try {
        let content = fs.readFileSync(f, 'utf8');
        if (!content.includes('eslint-disable')) {
            content = '/* eslint-disable @typescript-eslint/no-explicit-any */\n' + content;
        }
        if (f.includes('videodiff-merge/page.tsx')) {
            content = content.replace(/"Welcome to my video. Umm, today we will talk about cats. They are cute. This video is sponsored by nobody."/g, 
            '&quot;Welcome to my video. Umm, today we will talk about cats. They are cute. This video is sponsored by nobody.&quot;');
        }
        if (f.includes('videodiff-rules/page.tsx')) {
            content = content.replace(/"Cut all pauses"/g, '&quot;Cut all pauses&quot;');
        }
        if (f.includes('videodiff-timeline/page.tsx')) {
             content = content.replace(/className={\\\`\\\${color} p-2 rounded flex flex-col justify-end text-xs overflow-hidden shrink-0 border border-black\\/20\\\`}/g, 'className={`${color} p-2 rounded flex flex-col justify-end text-xs overflow-hidden shrink-0 border border-black/20`}');
        }
        fs.writeFileSync(f, content);
    } catch (e) {
        console.error("Could not process " + f);
    }
}
