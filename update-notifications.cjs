const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Welcome Message - shorter, no mention of capital
const oldWelcome = `setTopNotification("Karibu kwenye jukwaa letu salama na la uhakika. Tafadhali soma maelekezo yote kwa umakini ili uelewe jinsi ya kuthibitisha order, kujisajili, kisha kulipia mtaji na kuingiza kipato.");`;
const newWelcome = `setTopNotification("Karibu! Jukwaa letu ni salama na la uhakika kwa 100%. Soma maelekezo kisha anza kuthibitisha order ili uingize kipato chako leo.");`;
content = content.replace(oldWelcome, newWelcome);

// 2. Adjust Send Order timing and wording slightly for "kiufundi"
const oldSendMotiv = `setTimeout(() => {
      triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili kisha kulipia mtaji wa 14,500/=.\`);
    }, 2000);`;
const newSendMotiv = `setTimeout(() => {
      triggerMotivation(\`Hongera! Umeingiza TZS \${(balance + payout).toLocaleString()}. Ili uweze kutoa pesa hii na zingine, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.\`);
    }, 500);`;
content = content.replace(oldSendMotiv, newSendMotiv);

fs.writeFileSync('src/App.tsx', content);
