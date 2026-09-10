const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'href="https://wa.me/255689912898"',
  'href="https://wa.me/255689912898?text=Habari%20Naomba%20kujiunga%20na%20OrderVerify"'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated WhatsApp link in App.tsx");
