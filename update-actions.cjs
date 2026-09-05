const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add motivation function
const motivationFunc = `
  const triggerMotivation = (message: string) => {
    setTopNotification(message);
    setShowTopNotification(true);
    setTimeout(() => setShowTopNotification(false), 7000);
  };
`;

content = content.replace(
  'const handleConfirmAction = (orderId: number, payout: number) => {',
  motivationFunc + '\\n  const handleConfirmAction = (orderId: number, payout: number) => {'
);

// 2. Change the top button to use window.open and update state
const oldTopButton = `<button \n          onClick={() => runWithLoader(() => handleActionRequiresAuth(userStatus === "visitor" ? "Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza." : "Ili kupata akaunti kamili, tafadhali kamilisha malipo yako."))}\n          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs"\n        >\n          {userStatus === "visitor" ? "Jisajili" : "Lipia Akaunti"}\n        </button>`;

const newTopButton = `<button \n          onClick={() => runWithLoader(() => {\n            if (userStatus === 'visitor') setUserStatus('registered');\n            window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");\n            setTimeout(() => triggerMotivation("Usajili ni hatua ya kwanza, hakikisha umelipia mtaji wa 14,500/= kule ili uweze kutoa pesa zako hapa!"), 2000);\n          })}\n          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(0,230,118,0.4)] animate-pulse"\n        >\n          {userStatus === "visitor" ? "Jisajili Hapa" : "Lipia Akaunti"}\n        </button>`;

content = content.replace(oldTopButton, newTopButton);

// 3. Update handleConfirmAction to show a motivation popup after success
const oldConfirmEnd = `    setActiveVerification(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };`;
const newConfirmEnd = `    setActiveVerification(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    setTimeout(() => {
      triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kulipia mtaji wa 14,500/=.\`);
    }, 2000);
  };`;
content = content.replace(oldConfirmEnd, newConfirmEnd);

// 4. Update order click (setActiveVerification)
const oldOrderClick = `onClick={() => runWithLoader(() => {
                          setActiveVerification(order);
                          setCallStatus('idle');
                          setVerificationText("SEND");
                        })}`;
const newOrderClick = `onClick={() => runWithLoader(() => {
                          setActiveVerification(order);
                          setCallStatus('idle');
                          setVerificationText("SEND");
                          setTimeout(() => {
                            triggerMotivation("Hatua nzuri! Piga simu na uthibitishe ili uingize kamisheni yako sasa hivi.");
                          }, 1000);
                        })}`;
content = content.replace(oldOrderClick, newOrderClick);

// 5. Update Withdraw click
const oldWithdrawClick = `onClick={() => runWithLoader(() => setShowWithdrawModal(true))}`;
const newWithdrawClick = `onClick={() => runWithLoader(() => {
              setShowWithdrawModal(true);
              setTimeout(() => {
                triggerMotivation(userStatus === 'visitor' 
                  ? "Ili kutoa pesa zako leo, unapaswa kujisajili na kulipia mtaji wa 14,500/=."
                  : "Umebakisha hatua moja tu! Kamilisha malipo ya mtaji wako wa 14,500/= ili uweze kutoa pesa zako zote.");
              }, 1000);
            })}`;
content = content.replace(oldWithdrawClick, newWithdrawClick);

// 6. Comments interaction
const oldShowComments = `onClick={() => runWithLoader(() => setShowAllComments(true))}`;
const newShowComments = `onClick={() => runWithLoader(() => {
                setShowAllComments(true);
                triggerMotivation("Wakala wenzako wote unaowaona hapa walianza kwa mtaji wa 14,500/= tu. Na wewe unaweza kuanza leo na kubadilisha maisha yako!");
              })}`;
content = content.replace(oldShowComments, newShowComments);

fs.writeFileSync('src/App.tsx', content);
