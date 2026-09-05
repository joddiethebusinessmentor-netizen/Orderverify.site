const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHero = `<button 
            onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Tafadhali jisajili ili uweze kuanza kuthibitisha order na kuingiza kipato." : "Akaunti yako imesajiliwa. Kamilisha malipo ya mtaji kuanza kazi."))} 
            className="w-full bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] hover:-translate-y-1"
          >
            <UserPlus className="w-5 h-5" /> {userStatus === "visitor" ? "JISAJILI SASA" : "LIPIA AKAUNTI"}
          </button>`;

const newHero = `<button 
            onClick={() => {
              window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
            }} 
            className="w-full bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] hover:-translate-y-1"
          >
            <UserPlus className="w-5 h-5" /> JISAJILI HAPA
          </button>`;

content = content.replace(oldHero, newHero);

fs.writeFileSync('src/App.tsx', content);
