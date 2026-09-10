const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update description
code = code.replace(
  'Wasiliana na wakala wetu kupitia WhatsApp au Piga simu ya kawaida kwa msaada zaidi.',
  'Wasiliana na wakala wetu kupitia WhatsApp au Tuma Meseji (SMS) kwa msaada zaidi.'
);

// Update button
const oldPhoneStr = `<a
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
                  </a>`;

const newSmsStr = `<a
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
                  </a>`;

code = code.replace(oldPhoneStr, newSmsStr);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed SMS option");
