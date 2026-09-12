const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const banner = `        {/* Order Notification Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#1C1D24] to-[#1C1D24]/80 border border-[#00E676]/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,230,118,0.15)] flex items-center justify-between relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E676]/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center shrink-0 shadow-inner">
              <ShoppingBag className="w-6 h-6 text-[#00E676] animate-bounce" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-sm sm:text-base leading-tight">
                Kuna Oda <span className="text-[#00E676]">36</span> Zilizowekwa Leo!
              </span>
              <span className="text-slate-400 text-xs mt-1 font-medium leading-snug pr-2">
                Thibitisha oda zote sasa ili upate kipato chako cha leo leo.
              </span>
            </div>
          </div>
        </motion.div>

        <LiveClock />`;

code = code.replace(/<LiveClock \/>/, banner);

fs.writeFileSync('src/App.tsx', code);
console.log("Injected Order Notification Banner");
