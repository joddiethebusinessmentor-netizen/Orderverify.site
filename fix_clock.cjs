const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove mb-2 from LiveClock
code = code.replace(
  'className="bg-[#1C1D24] border border-slate-800 rounded-2xl p-4 mb-2 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"',
  'className="bg-[#1C1D24] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"'
);

// Reduce gap in the wrapper and maybe tweak the banner's margin
code = code.replace(
  '<div className="flex flex-col gap-1.5">',
  '<div className="flex flex-col gap-1">'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed LiveClock and banner gap");
