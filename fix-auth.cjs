const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add userStatus state and rewrite balance/verifiedOrders to use localStorage
const oldStates = `
  const [balance, setBalance] = useState(0);
  const [verifiedOrders, setVerifiedOrders] = useState<number[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState("");`;

const newStates = `
  const [userStatus, setUserStatus] = useState<"visitor" | "registered" | "activated">(() => {
    const saved = localStorage.getItem('orderverify_status');
    return (saved as "visitor" | "registered" | "activated") || "visitor";
  });
  
  useEffect(() => {
    localStorage.setItem('orderverify_status', userStatus);
  }, [userStatus]);

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('orderverify_balance');
    return saved ? parseInt(saved) : 0;
  });
  
  const [verifiedOrders, setVerifiedOrders] = useState<number[]>(() => {
    const saved = localStorage.getItem('orderverify_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orderverify_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('orderverify_orders', JSON.stringify(verifiedOrders));
  }, [verifiedOrders]);

  const [authModalState, setAuthModalState] = useState<{show: boolean, type: 'register' | 'payment', message: string}>({show: false, type: 'register', message: ''});
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  
  const [topNotification, setTopNotification] = useState("");
  const [showTopNotification, setShowTopNotification] = useState(false);

  useEffect(() => {
    // Show notification on mount
    setTimeout(() => {
      if (userStatus === 'visitor') {
        if (balance > 0) {
          setTopNotification(\`Umetengeneza TZS \${balance.toLocaleString()}! Jisajili kisha ulipie 14,500 uweze kutoa pesa zako.\`);
        } else {
          setTopNotification("Karibu! Jisajili kisha ulipie mtaji wa TZS 14,500 ili uanze kulipwa kwa kuthibitisha order leo.");
        }
      } else if (userStatus === 'registered') {
        if (balance > 0) {
          setTopNotification(\`Salio lako: TZS \${balance.toLocaleString()}. Hatua ya mwisho: Lipia 14,500 uweze kutoa pesa zako!\`);
        } else {
          setTopNotification("Umefanikiwa kujisajili! Hatua iliyobaki: Lipia TZS 14,500 ili uanze kupata order na kulipwa.");
        }
      }
      setShowTopNotification(true);
      setTimeout(() => setShowTopNotification(false), 7000); // hide after 7 seconds
    }, 1500); // delay before showing
  }, []);
`;

content = content.replace(oldStates, newStates);

// 2. Update handleActionRequiresAuth
const oldAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    setModalMessage(message);
    setShowRegisterModal(true);
  };`;

const newAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      setAuthModalState({ show: true, type: 'payment', message: message + " Tafadhali lipia mtaji wa 14,500 kwanza." });
    }
  };`;

content = content.replace(oldAuthHandler, newAuthHandler);

// 3. Update top navbar button to check status
content = content.replace(
  '<button \n          onClick={() => runWithLoader(() => handleActionRequiresAuth("Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza."))}',
  '<button \n          onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza." : "Ili kupata akaunti kamili, tafadhali kamilisha malipo yako."))}'
);
content = content.replace(
  '          Jisajili\n        </button>',
  '          {userStatus === "visitor" ? "Jisajili" : "Lipia Akaunti"}\n        </button>'
);

// 4. Also update Hero Register button
content = content.replace(
  '<button \n            onClick={() => runWithLoader(() => handleActionRequiresAuth("Tafadhali jisajili ili uweze kuanza kuthibitisha order na kuingiza kipato."))}',
  '<button \n            onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Tafadhali jisajili ili uweze kuanza kuthibitisha order na kuingiza kipato." : "Akaunti yako imesajiliwa. Kamilisha malipo ya mtaji kuanza kazi."))}'
);
content = content.replace(
  '            <UserPlus className="w-5 h-5" /> JISAJILI SASA\n          </button>',
  '            <UserPlus className="w-5 h-5" /> {userStatus === "visitor" ? "JISAJILI SASA" : "LIPIA AKAUNTI"}\n          </button>'
);

// 5. Replace the Register Modal completely
const oldRegisterModal = `{showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C1D24] rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border border-slate-700 text-center"
            >
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 text-[#FFC107] p-3 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Usajili Unahitajika</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {modalMessage}
              </p>
              <div className="space-y-3">
                <a 
                  href="https://adsblog.app/page/reg.php?reg=Joddie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-4 rounded-xl transition-colors shadow-lg"
                >
                  JISAJILI SASA (14,500/=)
                </a>
                <button 
                  onClick={() => setShowRegisterModal(false)}
                  className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-4 rounded-xl transition-colors"
                >
                  FUNGA
                </button>
              </div>
            </motion.div>
          </div>
        )}`;

const newAuthModals = `{authModalState.show && (
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

content = content.replace(oldRegisterModal, newAuthModals);

// 6. Inject the top notification UI just after <div className="min-h-screen bg-[#0B0C10] text-slate-200 font-sans pb-20 relative">
const appContainerStart = `<div className="min-h-screen bg-[#0B0C10] text-slate-200 font-sans pb-20 relative">`;
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

content = content.replace(appContainerStart, appContainerStart + '\\n' + notificationUI);

fs.writeFileSync('src/App.tsx', content);
