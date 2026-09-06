const fs = require('fs');
const lines = fs.readFileSync('src/data.ts', 'utf8').split('\n');
const startIndex = lines.findIndex(l => l.includes('// Dynamic Generators based on'));
console.log('Starts at:', startIndex);
const contentToReplace = lines.slice(startIndex).join('\n');
fs.writeFileSync('extracted.ts', contentToReplace);
