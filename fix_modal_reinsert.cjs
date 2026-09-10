const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const modalStr = `      {/* Contact Options Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0C10]/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#1C1D24] border border-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 relative flex flex-col items-center text-center">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-[#0B0C10] border-2 border-slate-800 rounded-full flex items-center justify-center mb-4 text-[#00E676] shadow-inner">
                  <PhoneCall className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">Chagua Njia ya Mawasiliano</h3>
                <p className="text-slate-400 text-sm mb-8">Wasiliana na wakala wetu kupitia WhatsApp au Tuma Meseji (SMS) kwa msaada zaidi.</p>
                
                <div className="flex flex-col gap-3 w-full">
                  <a
                    href="https://wa.me/255689912898?text=Habari%20Naomba%20kujiunga%20na%20OrderVerify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold px-5 py-4 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-6 h-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-base">WhatsApp</span>
                        <span className="text-xs opacity-80">+255 689 912 898</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </a>

                  <a
                    href="sms:0740463671?body=Habari%20Naomba%20kujiunga%20na%20OrderVerify"
                    className="w-full flex items-center justify-between bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold px-5 py-4 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-base">Tuma Meseji (SMS)</span>
                        <span className="text-xs opacity-80">0740 463 671</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- Global Audio Player Component ---`;

code = code.replace(/    <\/div>\n  \);\n}\n\n\/\/ --- Global Audio Player Component ---/g, modalStr);

fs.writeFileSync('src/App.tsx', code);
console.log("Reinserted modal in Dashboard");
