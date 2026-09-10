const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state
code = code.replace(
  'const [showInstallAppModal, setShowInstallAppModal] = useState(false);',
  'const [showInstallAppModal, setShowInstallAppModal] = useState(false);\n  const [showContactModal, setShowContactModal] = useState(false);'
);

// 2. Modify Button 1
code = code.replace(
  /<a\s*\n\s*href="sms:0740463671\?body=Habari%20Naomba[^>]*>\s*<MessageSquare className="w-3\.5 h-3\.5 text-\[#00E676\] shrink-0" \/>\s*<span>Wasiliana na Wakala<\/span>\s*<span className="text-xs sm:text-sm leading-none">🇹🇿<\/span>\s*<\/a>/s,
  `<button
            onClick={() => setShowContactModal(true)}
            className="flex-1 bg-[#0A0C14] hover:bg-[#151722] text-white border border-[#00E676] font-extrabold text-[11px] sm:text-xs py-2 sm:py-2.5 px-3 rounded-xl shadow-[0_0_12px_rgba(0,230,118,0.4)] animate-pulse flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
            <span>Wasiliana na Wakala</span>
            <span className="text-xs sm:text-sm leading-none">🇹🇿</span>
          </button>`
);

// 3. Modify Button 2
code = code.replace(
  /<a \s*\n\s*href="sms:\+255740463671\?body=Habari%20nimesha[^>]*>\s*<MessageSquare className="w-5 h-5" \/>\s*<span>Wasiliana na Wakala<\/span>\s*<\/a>/s,
  `<button
                  onClick={() => setShowContactModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Wasiliana na Wakala</span>
                </button>`
);

// 4. Add the Modal component right before closing App component</div> }
const contactModalStr = `      {/* Contact Options Modal */}
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
                <p className="text-slate-400 text-sm mb-8">Wasiliana na wakala wetu kupitia WhatsApp au Piga simu ya kawaida kwa msaada zaidi.</p>
                
                <div className="flex flex-col gap-3 w-full">
                  <a
                    href="https://wa.me/255689912898"
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
                    href="tel:0689912898"
                    className="w-full flex items-center justify-between bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold px-5 py-4 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-base">Piga Simu (Kawaida)</span>
                        <span className="text-xs opacity-80">0689 912 898</span>
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
}`;

code = code.replace(/    <\/div>\n  \);\n}/, contactModalStr);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched contact options");
