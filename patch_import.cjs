const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('ShoppingBag')) {
  code = code.replace(
    /} from 'lucide-react';/,
    '  ShoppingBag\n} from \'lucide-react\';'
  );
  fs.writeFileSync('src/App.tsx', code);
  console.log("Added ShoppingBag");
} else {
  console.log("ShoppingBag already exists");
}
