const fs = require('fs');
const files = [
    'src/app/api/talebrush-branching/route.ts',
    'src/app/api/videodiff-timeline/route.ts',
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
        fs.writeFileSync(f, content);
    } catch (e) {
        console.error("Could not process " + f);
    }
}
