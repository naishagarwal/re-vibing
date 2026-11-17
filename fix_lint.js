const fs = require('fs');

const files = [
    'src/app/videodiff-timeline/page.tsx'
];

for (let i = 0; i < files.length; i++) {
    const f = files[i];
    try {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/className={\`\\\${color} p-2 rounded flex flex-col justify-end text-xs overflow-hidden shrink-0 border border-black\\/20\`}/g, 'className={`${color} p-2 rounded flex flex-col justify-end text-xs overflow-hidden shrink-0 border border-black/20`}');
        fs.writeFileSync(f, content);
    } catch (e) {
        console.error("Could not process " + f);
    }
}
