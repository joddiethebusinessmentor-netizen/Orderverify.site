const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update timeout to 12000 (12 seconds)
const oldTrigger = `const triggerMotivation = (message: string) => {
    setTopNotification(message);
    setShowTopNotification(true);
    setTimeout(() => setShowTopNotification(false), 7000);
  };`;
const newTrigger = `const triggerMotivation = (message: string) => {
    setTopNotification(message);
    setShowTopNotification(true);
    setTimeout(() => setShowTopNotification(false), 12000);
  };`;
content = content.replace(oldTrigger, newTrigger);

// Update motivation text
const oldConfirm = `triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kulipia mtaji wa 14,500/=.\`);`;
const newConfirm = `triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili na kulipia mtaji wa 14,500/= tu.\`);`;
content = content.replace(oldConfirm, newConfirm);

fs.writeFileSync('src/App.tsx', content);
