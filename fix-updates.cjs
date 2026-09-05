const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Change Thibitisha order message
content = content.replace(
  '"Hatua nzuri! Piga simu na uthibitishe ili uingize kamisheni yako sasa hivi."',
  '"Bonyeza send order au piga simu na uthibitishe ili uingize kamisheni yako sasa hivi."'
);

// 2. Change View Comments message
content = content.replace(
  '"Wakala wenzako wote unaowaona hapa walianza kwa mtaji wa 14,500/= tu. Na wewe unaweza kuanza leo na kubadilisha maisha yako!"',
  '"Wanachama wenzako wote unaowaona hapa walianza kwa mtaji wa 14,500/= tu. Na wewe unaweza kuanza leo na kubadilisha maisha yako!"'
);

// 3. Update top button to NOT use runWithLoader so it opens instantly
const oldTopBtn = `<button \n          onClick={() => runWithLoader(() => {\n            if (userStatus === 'visitor') setUserStatus('registered');\n            window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");\n            setTimeout(() => triggerMotivation("Usajili ni hatua ya kwanza, hakikisha umelipia mtaji wa 14,500/= kule ili uweze kutoa pesa zako hapa!"), 2000);\n          })}\n          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(0,230,118,0.4)] animate-pulse"\n        >`;

const newTopBtn = `<button \n          onClick={() => {\n            if (userStatus === 'visitor') setUserStatus('registered');\n            window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");\n            setTimeout(() => triggerMotivation("Usajili ni hatua ya kwanza, hakikisha umelipia mtaji wa 14,500/= kule ili uweze kutoa pesa zako hapa!"), 1000);\n          }}\n          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(0,230,118,0.4)] animate-pulse"\n        >`;
content = content.replace(oldTopBtn, newTopBtn);

// 4. Update Install App button
const oldInstallBtn = `<button \n            onClick={() => runWithLoader(() => handleActionRequiresAuth("Ili ku-install App, tafadhali jisajili kwanza."))} \n            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"\n          >\n            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App\n          </button>`;

const newInstallBtn = `<button \n            onClick={() => {\n              if (userStatus === 'visitor') setUserStatus('registered');\n              window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");\n              setTimeout(() => triggerMotivation("Ili ku-install App, kamilisha usajili na ulipie mtaji wa 14,500/= kwanza."), 1000);\n            }} \n            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"\n          >\n            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App\n          </button>`;
content = content.replace(oldInstallBtn, newInstallBtn);

// 5. Redirect on Registered status in handleActionRequiresAuth
const oldAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      setAuthModalState({ show: true, type: 'payment', message: message + " Tafadhali lipia mtaji wa 14,500 kwanza." });
    }
  };`;

const newAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      triggerMotivation("Tafadhali kamilisha malipo yako ya mtaji 14,500/= ili uweze kuendelea kutoa pesa au kuthibitisha.");
      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
    }
  };`;
content = content.replace(oldAuthHandler, newAuthHandler);

fs.writeFileSync('src/App.tsx', content);
