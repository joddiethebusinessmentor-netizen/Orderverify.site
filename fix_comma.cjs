const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<, ShoppingBag/g, '<ShoppingBag');

fs.writeFileSync('src/App.tsx', code);
