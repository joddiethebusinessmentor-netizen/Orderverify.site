const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The modal at line 159 is inside AgeVerification! We need to remove it from there.
const regex = /\{\/\* Contact Options Modal \*\/\}.*?<\/AnimatePresence>/s;
code = code.replace(regex, '');

fs.writeFileSync('src/App.tsx', code);
console.log("Removed rogue modal from AgeVerification");
