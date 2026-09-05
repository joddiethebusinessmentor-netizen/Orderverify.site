const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldBtn = `        <button 
          onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza." : "Ili kupata akaunti kamili, tafadhali kamilisha malipo yako."))} 
          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs"
        >
          {userStatus === "visitor" ? "Jisajili" : "Lipia Akaunti"}
        </button>`;

const newBtn = `        <button 
          onClick={() => runWithLoader(() => {
            if (userStatus === 'visitor') setUserStatus('registered');
            window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
            setTimeout(() => triggerMotivation("Usajili ni hatua ya kwanza, hakikisha umelipia mtaji wa 14,500/= kule ili uweze kutoa pesa zako hapa!"), 2000);
          })}
          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(0,230,118,0.4)] animate-pulse"
        >
          {userStatus === "visitor" ? "Jisajili Hapa" : "Lipia Akaunti"}
        </button>`;

content = content.replace(oldBtn, newBtn);

fs.writeFileSync('src/App.tsx', content);
