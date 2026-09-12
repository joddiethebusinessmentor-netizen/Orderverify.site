const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Modify LiveClock to include the text next to Activity icon
const oldLiveClockStart = `<div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="bg-[#00E676]/20 p-2 rounded-lg">
          <Activity className="w-5 h-5 text-[#00E676] animate-pulse" />
        </div>
      </div>`;

const newLiveClockStart = `<div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="bg-[#00E676]/20 p-2 rounded-lg shrink-0">
          <ShoppingBag className="w-5 h-5 text-[#00E676] animate-bounce" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-extrabold text-sm leading-tight">
            Order <span className="text-[#00E676]">36</span> za wateja wetu ziko live sasa
          </span>
          <span className="text-slate-400 text-[11px] sm:text-xs mt-0.5 font-medium leading-snug">
            Thibitisha ili tukulipe sasa hivi
          </span>
        </div>
      </div>`;

code = code.replace(oldLiveClockStart, newLiveClockStart);

// Remove the banner from Dashboard, and restore LiveClock styles
const bannerRegex = /<div className="flex flex-col gap-0">\s*\{\/\* Order Notification Banner \*\/\}[\s\S]*?<LiveClock \/>\s*<\/div>/;

if (bannerRegex.test(code)) {
  code = code.replace(bannerRegex, '<LiveClock />');
}

// Revert LiveClock styles to standard standalone card
code = code.replace(
  'className="bg-[#1C1D24] border border-slate-700 border-t border-t-slate-800 rounded-b-2xl rounded-t-none p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-0"',
  'className="bg-[#1C1D24] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-0"'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated LiveClock and removed separate banner");
