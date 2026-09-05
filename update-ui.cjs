const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Welcome Notification
const oldWelcome = `  useEffect(() => {
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
  }, []);`;

const newWelcome = `  useEffect(() => {
    setTimeout(() => {
      setTopNotification("Karibu kwenye jukwaa letu salama na la uhakika. Tafadhali soma maelekezo yote kwa umakini ili uelewe jinsi ya kuthibitisha order, kujisajili, kisha kulipia mtaji na kuingiza kipato.");
      setShowTopNotification(true);
      setTimeout(() => setShowTopNotification(false), 8000);
    }, 1500);
  }, []);`;
content = content.replace(oldWelcome, newWelcome);

// 2. Top Button
const oldTopBtn = `<button 
          onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza." : "Ili kupata akaunti kamili, tafadhali kamilisha malipo yako."))}
          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs"
        >
          {userStatus === "visitor" ? "Jisajili" : "Lipia Akaunti"}
        </button>`;
const newTopBtn = `<button 
          onClick={() => {
            window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
          }}
          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-[0_0_10px_rgba(0,230,118,0.5)] animate-pulse"
        >
          Jisajili Hapa
        </button>`;
content = content.replace(oldTopBtn, newTopBtn);

// 3. Install App Button
const oldInstallBtn = `<button 
            onClick={() => runWithLoader(() => handleActionRequiresAuth("Ili ku-install App, tafadhali jisajili kwanza."))} 
            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
          >
            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App
          </button>`;
const newInstallBtn = `<button 
            onClick={() => {
              triggerMotivation("Ili ku-install App yetu, tafadhali jisajili kisha ulipie mtaji wa 14,500/=. Tunakupeleka kwenye ukurasa wa usajili...");
              setTimeout(() => {
                window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
              }, 3000);
            }} 
            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
          >
            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App
          </button>`;
content = content.replace(oldInstallBtn, newInstallBtn);

// 4. Withdraw "Tuma Maombi" Button inside Modal
const oldTumaMaombi = `<button 
                onClick={() => {
                  setShowWithdrawModal(false);
                  handleActionRequiresAuth("Ili kuruhusiwa kutoa pesa kwenda kwenye namba yako, lazima uwe umekamilisha usajili wa akaunti kwanza.");
                }}
                className="w-full bg-[#00E676] text-black font-black py-4 rounded-xl hover:bg-[#00C260] transition-colors uppercase tracking-wider text-sm shadow-lg shadow-[#00E676]/20"
              >
                TUMA MAOMBI YA PESA
              </button>`;
const newTumaMaombi = `<button 
                onClick={() => {
                  setShowWithdrawModal(false);
                  triggerMotivation("Ili kuruhusiwa kutoa pesa zote kwenda kwenye namba yako, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.");
                  setTimeout(() => {
                    window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
                  }, 3000);
                }}
                className="w-full bg-[#00E676] text-black font-black py-4 rounded-xl hover:bg-[#00C260] transition-colors uppercase tracking-wider text-sm shadow-lg shadow-[#00E676]/20"
              >
                TUMA MAOMBI YA PESA
              </button>`;
content = content.replace(oldTumaMaombi, newTumaMaombi);

// 5. Withdraw Card click motivation
const oldWithdrawCardClick = `onClick={() => runWithLoader(() => {
              setShowWithdrawModal(true);
              setTimeout(() => {
                triggerMotivation(userStatus === 'visitor' 
                  ? "Ili kutoa pesa zako leo, unapaswa kujisajili na kulipia mtaji wa 14,500/=."
                  : "Umebakisha hatua moja tu! Kamilisha malipo ya mtaji wako wa 14,500/= ili uweze kutoa pesa zako zote.");
              }, 1000);
            })}`;
const newWithdrawCardClick = `onClick={() => runWithLoader(() => {
              setShowWithdrawModal(true);
              setTimeout(() => {
                triggerMotivation("Jaza namba yako kisha utume maombi. Kumbuka: Ili kutoa pesa zako leo, unapaswa kujisajili kisha kulipia mtaji wa 14,500/=.");
              }, 1000);
            })}`;
content = content.replace(oldWithdrawCardClick, newWithdrawCardClick);

// 6. Confirm Action motivation
const oldConfirmMotiv = `triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kulipia mtaji wa 14,500/=.\`);`;
const newConfirmMotiv = `triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili kisha kulipia mtaji wa 14,500/=.\`);`;
content = content.replace(oldConfirmMotiv, newConfirmMotiv);

// 7. Hero Register Button
const oldHeroBtn = `<button 
            onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Tafadhali jisajili ili uweze kuanza kuthibitisha order na kuingiza kipato." : "Akaunti yako imesajiliwa. Kamilisha malipo ya mtaji kuanza kazi."))} 
            className="w-full bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] hover:-translate-y-1"
          >
            <UserPlus className="w-5 h-5" /> {userStatus === "visitor" ? "JISAJILI SASA" : "LIPIA AKAUNTI"}
          </button>`;
const newHeroBtn = `<button 
            onClick={() => {
              window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
            }} 
            className="w-full bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] hover:-translate-y-1"
          >
            <UserPlus className="w-5 h-5" /> JISAJILI HAPA
          </button>`;
content = content.replace(oldHeroBtn, newHeroBtn);

// 8. handleActionRequiresAuth fallback
const oldAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      setAuthModalState({ show: true, type: 'payment', message: message + " Tafadhali lipia mtaji wa 14,500 kwanza." });
    }
  };`;
const newAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    triggerMotivation("Tafadhali jisajili kisha ulipie mtaji wa 14,500/= ili uweze kuendelea na hatua hii.");
    setTimeout(() => {
      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
    }, 2500);
  };`;
content = content.replace(oldAuthHandler, newAuthHandler);

fs.writeFileSync('src/App.tsx', content);
