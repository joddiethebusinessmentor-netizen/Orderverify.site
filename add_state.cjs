const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'const [balance, setBalance] = useState(0);',
  'const [balance, setBalance] = useState(0);\n  const [showBalance, setShowBalance] = useState(false);'
);

fs.writeFileSync('src/App.tsx', code);
