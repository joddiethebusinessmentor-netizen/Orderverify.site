const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('UserCheck')) {
  // It is in the jsx, but not in imports. Wait, let me just add it.
}
code = code.replace(
  'import {',
  'import { UserCheck,'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed imports");
