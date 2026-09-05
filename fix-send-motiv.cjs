const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const currentMotiv = `triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili kisha kulipia mtaji wa 14,500/=.\`);`;
const originalMotiv = `triggerMotivation(\`Hongera kwa kuthibitisha! Salio lako sasa ni TZS \${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kulipia mtaji wa 14,500/=.\`);`;
content = content.replace(currentMotiv, originalMotiv);

fs.writeFileSync('src/App.tsx', content);
