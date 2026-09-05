const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const appContainerStart = '<div className="min-h-screen bg-[#0B0C10] text-white font-sans pb-32 relative">';
const notificationUI = `
      {/* Top Floating Notification */}
      <AnimatePresence>
        {showTopNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-4 right-4 z-[200] max-w-md mx-auto"
          >
            <div className="bg-gradient-to-r from-slate-900 to-[#1C1D24] border-2 border-[#00E676] rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,230,118,0.2)] flex items-start gap-4">
              <div className="bg-[#00E676]/20 p-2 rounded-full mt-1">
                <AlertCircle className="w-6 h-6 text-[#00E676] animate-pulse" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-black text-sm uppercase mb-1">Taarifa Muhimu</h4>
                <p className="text-slate-300 text-xs font-medium leading-relaxed">{topNotification}</p>
              </div>
              <button onClick={() => setShowTopNotification(false)} className="text-slate-500 hover:text-white mt-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
`;

if (!content.includes('Top Floating Notification')) {
  content = content.replace(appContainerStart, appContainerStart + '\\n' + notificationUI);
}

fs.writeFileSync('src/App.tsx', content);
