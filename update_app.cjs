const fs = require('fs');

// 1. Replace Electric Toothbrush
let dataCode = fs.readFileSync('src/data.ts', 'utf8');

// The item is "Electric Toothbrush". We will replace it with "Digital Smart Scale" or "Bluetooth Soundbar"
dataCode = dataCode.replace(
  'product: "Electric Toothbrush",\n    productValue: 135000,\n    payout: 6750,\n    avatar: "https://randomuser.me/api/portraits/women/14.jpg",\n    productImage: "https://images.unsplash.com/photo-1520624021290-7667232230da?w=500&q=80"',
  'product: "Bluetooth Soundbar",\n    productValue: 135000,\n    payout: 6750,\n    avatar: "https://randomuser.me/api/portraits/women/14.jpg",\n    productImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80"'
);

// Force refresh
dataCode = dataCode.replace(/let s = epoch \* \d+ \+ \d+;/, 'let s = epoch * 5555 + 6666;');

fs.writeFileSync('src/data.ts', dataCode);


// 2. Replace Whatsapp Links
let tutorialCode = fs.readFileSync('src/components/TutorialVideoSection.tsx', 'utf8');
tutorialCode = tutorialCode.replace(
  'whatsappUrl = "https://chat.whatsapp.com/D1b8NV1tkMo0uPGHdE4rjR?s=cl&p=a&mlu=4&ilr=4"',
  'whatsappUrl = "https://chat.whatsapp.com/KYgkbVx5HmA55PkJAg5fLp?s=cl&p=a&mlu=4&ilr=4"'
);
fs.writeFileSync('src/components/TutorialVideoSection.tsx', tutorialCode);

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(
  'whatsappUrl="https://chat.whatsapp.com/D1b8NV1tkMo0uPGHdE4rjR?s=cl&p=a&mlu=4&ilr=4"',
  'whatsappUrl="https://chat.whatsapp.com/KYgkbVx5HmA55PkJAg5fLp?s=cl&p=a&mlu=4&ilr=4"'
);
fs.writeFileSync('src/App.tsx', appCode);

console.log('Done updating data and whatsapp links');
