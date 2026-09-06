const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Change epoch from 12 to 2
data = data.replace(/12 \* 60 \* 60 \* 1000/g, '2 * 60 * 60 * 1000');
data = data.replace(/12Hour/g, '2Hour');

// Fix dynamic payout generation to NOT split and mix names
// Find this section:
const oldPayoutLogic = `  // --- 2. Generate dynamic livePayouts perfectly proportional to actual products ---
  const firstNames = tanzanianMembersList.map(m => m.name.split(" ")[0]);
  const lastNames = tanzanianMembersList.map(m => m.name.split(" ")[1]);
  const dynamicPayouts = [];
  
  for (let i = 0; i < 500; i++) {
    const fn = firstNames[Math.floor(rnd() * firstNames.length)];
    const ln = lastNames[Math.floor(rnd() * lastNames.length)];
    const randomProduct = products[Math.floor(rnd() * products.length)];
    
    // Exactly 5% of the product value
    const rawTzsAmount = Math.floor(randomProduct.productValue * percentage);
    
    dynamicPayouts.push({
      id: i + 1,
      name: \`\${fn} \${ln}\`,
      rawTzsAmount,
      amountStr: \`TZS \${rawTzsAmount.toLocaleString()}\`,
      tzsStr: \`TZS \${rawTzsAmount.toLocaleString()}\`
    });
  }`;

const newPayoutLogic = `  // --- 2. Generate dynamic livePayouts without mixing names to guarantee 100% uniqueness ---
  const dynamicPayouts = [];
  const payoutMembers = [...tanzanianMembersList];
  shuffle(payoutMembers); // Shuffle them so they appear differently every 2 hours
  
  for (let i = 0; i < payoutMembers.length; i++) {
    const member = payoutMembers[i];
    const randomProduct = products[Math.floor(rnd() * products.length)];
    
    // Exactly 5% of the product value
    const rawTzsAmount = Math.floor(randomProduct.productValue * percentage);
    
    dynamicPayouts.push({
      id: i + 1,
      name: member.name,
      rawTzsAmount,
      amountStr: \`TZS \${rawTzsAmount.toLocaleString()}\`,
      tzsStr: \`TZS \${rawTzsAmount.toLocaleString()}\`
    });
  }`;

data = data.replace(oldPayoutLogic, newPayoutLogic);

fs.writeFileSync('src/data.ts', data);
console.log('Fixed epoch and payout logic');
