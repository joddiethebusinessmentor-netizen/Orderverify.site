const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update banner wrapper to gap-0
code = code.replace(
  '<div className="flex flex-col gap-1">',
  '<div className="flex flex-col gap-0">'
);

// Update banner styling to be rounded-t-2xl and remove bottom border
code = code.replace(
  'className="bg-gradient-to-r from-[#1C1D24] to-[#1C1D24]/80 border border-[#00E676]/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,230,118,0.15)] flex items-center justify-between relative overflow-hidden"',
  'className="bg-gradient-to-r from-[#1C1D24] to-[#1C1D24]/80 border border-slate-700 border-b-0 rounded-t-2xl rounded-b-none p-4 shadow-[0_0_20px_rgba(0,230,118,0.15)] flex items-center justify-between relative overflow-hidden z-10"'
);

// Update LiveClock styling to be rounded-b-2xl and no top border radius, with border-t-0 or simple border
code = code.replace(
  'className="bg-[#1C1D24] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"',
  'className="bg-[#1C1D24] border border-slate-700 rounded-b-2xl rounded-t-none p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-0"'
);

// Let's add a thin separator line if needed, or the border-slate-700 on top of LiveClock will act as the separator.
// Actually, border-t-0 on LiveClock would be better so they don't double up borders.
code = code.replace(
  'rounded-b-2xl rounded-t-none p-4 shadow-xl',
  'border-t border-t-slate-800 rounded-b-2xl rounded-t-none p-4 shadow-xl'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Joined Banner and LiveClock");
