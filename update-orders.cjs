const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Change Inapakia to Loading
content = content.replace('Inapakia...', 'Loading...');

// 2. Change THIBITISHO TAYARI to VERIFIED & SECURED
content = content.replace(
  '<CheckCircle2 className="w-3 h-3" /> THIBITISHO TAYARI',
  '<CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED & SECURED'
);
content = content.replace(
  'className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]"',
  'className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-[1px]"'
);
content = content.replace(
  'className="bg-[#00E676] text-black text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1"',
  'className="bg-slate-900 border border-[#00E676] text-[#00E676] text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,230,118,0.3)]"'
);

// 3. Change isVerified state in the card (Umelipwa...)
content = content.replace(
  '<div className="bg-[#00E676] text-black text-[9px] font-bold p-2 rounded-xl text-center shadow-lg border border-[#00E676] z-10 flex flex-col items-center gap-0.5">\n                        <span>🎉 Umelipwa TZS {order.payout.toLocaleString()}!</span>\n                      </div>',
  '<div className="bg-[#1C1D24] text-[#00E676] text-[10px] sm:text-[11px] font-bold py-2 rounded-xl text-center shadow-inner border border-slate-700 z-10 flex flex-col items-center justify-center gap-0.5">\n                        <span className="flex items-center gap-1 opacity-90"><CheckCircle2 className="w-3 h-3" /> PAID</span>\n                        <span className="text-white">+TZS {order.payout.toLocaleString()}</span>\n                      </div>'
);

// 4. Update Thibitisha Order button with runWithLoader
const oldThibitishaClick = `onClick={() => {
                          setActiveVerification(order);
                          setCallStatus('idle');
                          setVerificationText("SEND");
                        }}`;
const newThibitishaClick = `onClick={() => runWithLoader(() => {
                          setActiveVerification(order);
                          setCallStatus('idle');
                          setVerificationText("SEND");
                        })}`;
content = content.replace(oldThibitishaClick, newThibitishaClick);

// 5. Update Send Order button
content = content.replace(
  'onClick={() => handleConfirmAction(activeVerification.id, activeVerification.payout)}',
  'onClick={() => runWithLoader(() => handleConfirmAction(activeVerification.id, activeVerification.payout))}'
);

fs.writeFileSync('src/App.tsx', content);
