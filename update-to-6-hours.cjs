const fs = require('fs');

// 1. Update src/data.ts
let data = fs.readFileSync('src/data.ts', 'utf8');
data = data.replace(/2 \* 60 \* 60 \* 1000/g, '6 * 60 * 60 * 1000');
data = data.replace(/2Hour/g, '6Hour');
fs.writeFileSync('src/data.ts', data);

// 2. Update src/App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/2 \* 60 \* 60 \* 1000/g, '6 * 60 * 60 * 1000');
app = app.replace(/2Hour/g, '6Hour');
app = app.replace(/2-hour/g, '6-hour');
fs.writeFileSync('src/App.tsx', app);

console.log('Updated to 6 hours');
