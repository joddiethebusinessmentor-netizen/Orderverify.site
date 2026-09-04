const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const clockComponent = `
function LiveClock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateString = time.toLocaleDateString('sw-TZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className="bg-[#1C1D24] border border-slate-800 rounded-2xl p-4 mb-2 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="bg-[#00E676]/20 p-2 rounded-lg">
          <Activity className="w-5 h-5 text-[#00E676] animate-pulse" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Mfumo Upo Live</p>
          <p className="text-white text-sm font-bold">Data Hubadilika Kila Baada ya Masaa 12</p>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
          <span className="text-xs text-slate-400 font-bold block mb-0.5">Tarehe</span>
          <span className="text-sm text-white font-black">{dateString}</span>
        </div>
        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
          <span className="text-xs text-slate-400 font-bold block mb-0.5">Saa (Live)</span>
          <span className="text-sm text-[#00E676] font-black">{timeString}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Dashboard ---
`;

content = content.replace('// --- Main Dashboard ---', clockComponent);

const mainDashboardInjection = `
      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <LiveClock />
`;

content = content.replace('      </header>\n\n      <div className="p-4 max-w-4xl mx-auto space-y-6">', mainDashboardInjection);

// Clean up Date objects if previously added statically inside Dashboard
content = content.replace(/  const now = new Date\(\);\n/g, '');
content = content.replace(/  const dateString = .*\n/g, '');
content = content.replace(/  const timeString = .*\n/g, '');

fs.writeFileSync('src/App.tsx', content);
