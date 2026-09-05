const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Revert the Motivation msg after clicking "Send Order" (leave it as it was originally)
const oldSendMotiv = `setTimeout(() => {
      triggerMotivation(\`Hongera! Umeingiza TZS \${(balance + payout).toLocaleString()}. Ili uweze kutoa pesa hii na zingine, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.\`);
    }, 500);`;
const newSendMotiv = `setTimeout(() => {
      triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili kisha kulipia mtaji wa 14,500/=.\`);
    }, 2000);`;
content = content.replace(oldSendMotiv, newSendMotiv);

// 2. Change the Welcome Notification to sound highly human and natural
const oldWelcome = `setTopNotification("Karibu! Jukwaa letu ni salama na la uhakika kwa 100%. Soma maelekezo kisha anza kuthibitisha order ili uingize kipato chako leo.");`;
const newWelcome = `setTopNotification("Karibu kwenye site yetu ya kuthibitisha order za wateja na kulipwa! Lengo letu ni kuhakikisha unatimiza ndoto zako huku tukishirikiana na kukua kwa pamoja.");`;
content = content.replace(oldWelcome, newWelcome);

fs.writeFileSync('src/App.tsx', content);
