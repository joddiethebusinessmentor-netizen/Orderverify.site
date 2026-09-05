const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Revert Balance and Orders memory
const oldStateBlock = `  const [balance, setBalance] = useState(() => {
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
  }, [verifiedOrders]);`;

const newStateBlock = `  const [balance, setBalance] = useState(0);
  const [verifiedOrders, setVerifiedOrders] = useState<number[]>([]);`;

content = content.replace(oldStateBlock, newStateBlock);

// 2. Revert Top Button
const oldTopBtn = `<button \n          onClick={() => {\n            if (userStatus === 'visitor') setUserStatus('registered');\n            window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");\n            setTimeout(() => triggerMotivation("Usajili ni hatua ya kwanza, hakikisha umelipia mtaji wa 14,500/= kule ili uweze kutoa pesa zako hapa!"), 1000);\n          }}\n          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(0,230,118,0.4)] animate-pulse"\n        >\n          {userStatus === "visitor" ? "Jisajili Hapa" : "Lipia Akaunti"}\n        </button>`;
const newTopBtn = `<button \n          onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza." : "Ili kupata akaunti kamili, tafadhali kamilisha malipo yako."))}\n          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs"\n        >\n          {userStatus === "visitor" ? "Jisajili" : "Lipia Akaunti"}\n        </button>`;

content = content.replace(oldTopBtn, newTopBtn);

// 3. Revert Install App Button
const oldInstallBtn = `<button \n            onClick={() => {\n              if (userStatus === 'visitor') setUserStatus('registered');\n              window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");\n              setTimeout(() => triggerMotivation("Ili ku-install App, kamilisha usajili na ulipie mtaji wa 14,500/= kwanza."), 1000);\n            }} \n            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"\n          >\n            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App\n          </button>`;
const newInstallBtn = `<button \n            onClick={() => runWithLoader(() => handleActionRequiresAuth("Ili ku-install App, tafadhali jisajili kwanza."))} \n            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"\n          >\n            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App\n          </button>`;

content = content.replace(oldInstallBtn, newInstallBtn);

// 4. Revert handleActionRequiresAuth
const oldAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      triggerMotivation("Tafadhali kamilisha malipo yako ya mtaji 14,500/= ili uweze kuendelea kutoa pesa au kuthibitisha.");
      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
    }
  };`;
const newAuthHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      setAuthModalState({ show: true, type: 'payment', message: message + " Tafadhali lipia mtaji wa 14,500 kwanza." });
    }
  };`;

content = content.replace(oldAuthHandler, newAuthHandler);

fs.writeFileSync('src/App.tsx', content);
