const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldModal = `{authModalState.show && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C1D24] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative border border-slate-700 text-center"
            >
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 text-[#FFC107] p-3 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                {authModalState.type === 'register' ? 'Usajili Unahitajika' : 'Hatua Ya Mwisho'}
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {authModalState.message}
              </p>
              
              {authModalState.type === 'register' ? (
                <div className="space-y-4">
                  <input type="text" placeholder="Jina Lako" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] outline-none" />
                  <input type="tel" placeholder="Namba ya Simu" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] outline-none" />
                  <button 
                    onClick={() => runWithLoader(() => {
                      setUserStatus('registered');
                      setAuthModalState({
                        show: true, 
                        type: 'payment', 
                        message: "Hongera kwa kujisajili! Sasa lipia mtaji wako wa TZS 14,500/= ili uanze kupata order na kutoa pesa."
                      });
                    })}
                    className="block w-full text-center bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-4 rounded-xl transition-colors shadow-lg"
                  >
                    KAMILISHA USAJILI
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <a 
                    href="https://adsblog.app/page/reg.php?reg=Joddie"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setAuthModalState({ ...authModalState, show: false })}
                    className="block w-full text-center bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-4 rounded-xl transition-colors shadow-lg"
                  >
                    LIPIA MTAJI (TZS 14,500/=)
                  </a>
                </div>
              )}
              
              <button 
                onClick={() => setAuthModalState({ ...authModalState, show: false })}
                className="block w-full mt-3 text-center bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                BAADAYE
              </button>
            </motion.div>
          </div>
        )}`;

content = content.replace(oldModal, "");

fs.writeFileSync('src/App.tsx', content);
