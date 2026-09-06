const fs = require('fs');
const data = fs.readFileSync('src/data.ts', 'utf8');
console.log(data.length);
