const fs = require('fs');

let route = fs.readFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/api/blend/route.ts', 'utf-8');
route = route.replace(/catch \(error: any\)/g, 'catch (error: unknown)');
route = route.replace(/return NextResponse\.json\(\{ error: error\.message \}/g, 'return NextResponse.json({ error: (error as Error).message }');
fs.writeFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/api/blend/route.ts', route);

let page = fs.readFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/page.tsx', 'utf-8');
page = page.replace(/catch \(err: any\)/g, 'catch (err: unknown)');
page = page.replace(/alert\(err\.message\)/g, 'alert((err as Error).message)');
page = page.replace(/_\: any/g, '_: unknown');
fs.writeFileSync('/Users/naishaagarwal/vibe-coding/misty-app/src/app/page.tsx', page);
