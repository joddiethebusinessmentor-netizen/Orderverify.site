const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldCall = `handleActionRequiresAuth("Mteja anapatikana, lakini ili aweze kupokea simu yako lazima uwe umekamilisha usajili wa akaunti kwanza.");`;
const newCall = `handleActionRequiresAuth("");`;

content = content.replace(oldCall, newCall);

fs.writeFileSync('src/App.tsx', content);
