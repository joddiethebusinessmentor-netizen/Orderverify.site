const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldState = `  const [authModalState, setAuthModalState] = useState<{show: boolean, type: 'register' | 'payment', message: string}>({show: false, type: 'register', message: ''});\\n`;
content = content.replace(oldState, "");

fs.writeFileSync('src/App.tsx', content);
