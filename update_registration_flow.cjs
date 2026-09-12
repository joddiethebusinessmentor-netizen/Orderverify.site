const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add showAlreadyRegisteredModal state
code = code.replace(
  "const [showPaymentGuide, setShowPaymentGuide] = useState(false);",
  "const [showPaymentGuide, setShowPaymentGuide] = useState(false);\n  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);"
);

// 2. Update openRegisterModal
const oldOpenRegisterModal = `const openRegisterModal = () => {
    setShowTopNotification(false);
    setRegisterModalStep('confirm');
    setShowRegisterConfirmModal(true);
  };`;

const newOpenRegisterModal = `const openRegisterModal = () => {
    setShowTopNotification(false);
    if (userStatus === 'registered') {
      setShowAlreadyRegisteredModal(true);
    } else {
      setRegisterModalStep('confirm');
      setShowRegisterConfirmModal(true);
    }
  };`;
code = code.replace(oldOpenRegisterModal, newOpenRegisterModal);

// 3. Update window.open part to set userStatus
const oldWindowOpen = `setShowRegisterConfirmModal(false);
                      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");`;

const newWindowOpen = `setShowRegisterConfirmModal(false);
                      setUserStatus('registered');
                      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");`;
code = code.replace(oldWindowOpen, newWindowOpen);

// 4. Add the showAlreadyRegisteredModal JSX right before the showPaymentGuide modal
const paymentGuideIndex = code.indexOf('{/* Payment Guide Modal */}');

const alreadyRegisteredJSX = `      {/* Already Registered Modal */}
      <AnimatePresence>
        {showAlreadyRegisteredModal && (
          <div 
            onClick={() => setShowAlreadyRegisteredModal(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-[#0B0C10]/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141624] border-2 border-[#00E676] w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-center my-auto"
            >
              <button 
                type="button"
                onClick={() => setShowAlreadyRegisteredModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
                aria-label="Funga"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 rounded-full bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center mx-auto mb-4 text-[#00E676] shadow-[0_0_25px_rgba(0,230,118,0.35)]">
                <UserCheck className="w-8 h-8 stroke-[2.2]" />
              </div>
              
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide mb-3">
                TAARIFA
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Tayari wewe umesha jisajili, fuata haya maelekezo ili uweze kulipia.
              </p>
              
              <button 
                type="button"
                onClick={() => {
                  setShowAlreadyRegisteredModal(false);
                  setShowPaymentGuide(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#00E676] via-[#00C853] to-[#00963F] hover:brightness-110 active:scale-95 text-black font-black px-6 py-3.5 rounded-2xl text-sm shadow-[0_0_25px_rgba(0,230,118,0.4)] transition-all cursor-pointer uppercase tracking-wider"
              >
                <CreditCard className="w-5 h-5" />
                <span>Njia Za Malipo</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      `;

code = code.substring(0, paymentGuideIndex) + alreadyRegisteredJSX + code.substring(paymentGuideIndex);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated registration flow with persistence");
