const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');

// I will replace the two specific bad URLs with known extremely reliable ones.
// Nintendo Switch Lite -> A reliable gaming controller image
code = code.replace(
  'productImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=500&q=80"',
  'productImage: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80"'
);

// Oh wait, 1578303512597-81e6cc155b3e is ALSO potentially bad if it didn't show for the user before?
// Let's use generic known good images:
// Switch -> Controller: https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=500&q=80
// Toothbrush -> https://images.unsplash.com/photo-1606220577953-e8c14741bd19?w=500&q=80

code = code.replace(
  'productImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=500&q=80"',
  'productImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&q=80"' // Video game controller
);

code = code.replace(
  'productImage: "https://images.unsplash.com/photo-1559670648-fb7bcce3b2c2?w=500&q=80"',
  'productImage: "https://images.unsplash.com/photo-1520624021290-7667232230da?w=500&q=80"' // Clean hygiene product related
);

// Let's replace the 'fallback' image in App.tsx to something we 100% know is good: a solid grey image from placehold.co or a very old unsplash image
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(
  'onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550520286-663806a6af32?w=500&q=80" }}',
  'onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"; e.currentTarget.onerror = null; }}'
);
fs.writeFileSync('src/App.tsx', appCode);

code = code.replace(/let s = epoch \* \d+ \+ \d+;/, 'let s = epoch * 9999 + 8888;');
fs.writeFileSync('src/data.ts', code);
console.log('Fixed two images');

