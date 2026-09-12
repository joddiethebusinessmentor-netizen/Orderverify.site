const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCards = `<div className="bg-[#141624] border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[12px] sm:text-[13px] mb-2 text-slate-300">Balance</span>
            <span className="bg-[#0B0C12] border border-emerald-500/40 text-[#00E676] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              TZS {balance.toLocaleString()}
            </span>
          </div>
          
          <div className="bg-[#141624] border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[12px] sm:text-[13px] mb-2 text-slate-300">Net Profit</span>
            <span className="bg-[#0B0C12] border border-amber-500/40 text-[#FFB800] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              TZS {balance.toLocaleString()}
            </span>
          </div>`;

const newCards = `<div className="bg-[#141624] border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl relative group">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="font-bold text-[12px] sm:text-[13px] text-slate-300">Balance</span>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-slate-400 hover:text-[#00E676] transition-colors p-1 -m-1"
                aria-label={showBalance ? "Ficha balance" : "Onyesha balance"}
              >
                {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="bg-[#0B0C12] border border-emerald-500/40 text-[#00E676] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              {showBalance ? \`TZS \${balance.toLocaleString()}\` : 'TZS ******'}
            </span>
          </div>
          
          <div className="bg-[#141624] border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl relative group">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="font-bold text-[12px] sm:text-[13px] text-slate-300">Net Profit</span>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-slate-400 hover:text-[#FFB800] transition-colors p-1 -m-1"
                aria-label={showBalance ? "Ficha net profit" : "Onyesha net profit"}
              >
                {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="bg-[#0B0C12] border border-amber-500/40 text-[#FFB800] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              {showBalance ? \`TZS \${balance.toLocaleString()}\` : 'TZS ******'}
            </span>
          </div>`;

if (code.includes('mb-2 text-slate-300">Balance</span>')) {
  code = code.replace(oldCards, newCards);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated Balance and Net Profit cards with privacy toggles");
} else {
  console.log("Could not find the target codeblock.");
}
