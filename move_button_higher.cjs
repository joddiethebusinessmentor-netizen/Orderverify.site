const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<div className="fixed bottom-32 sm:bottom-28 right-4 z-[150] flex flex-col items-end gap-2 pointer-events-none">',
  '<div className="fixed bottom-48 sm:bottom-40 right-4 z-[150] flex flex-col items-end gap-2 pointer-events-none">'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Button moved higher');
