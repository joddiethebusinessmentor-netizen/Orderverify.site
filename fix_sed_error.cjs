const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Undo the sed change for the component usage
code = code.replace(
  '<ShoppingBag, Eye, EyeOff className="w-5 h-5 text-[#00E676] animate-bounce" />',
  '<ShoppingBag className="w-5 h-5 text-[#00E676] animate-bounce" />'
);

// If there are other places (like imports, it was correct).
fs.writeFileSync('src/App.tsx', code);
