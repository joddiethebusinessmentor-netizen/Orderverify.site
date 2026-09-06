const fs = require('fs');
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// Find export default function App
const appIndex = lines.findIndex(l => l.includes('export default function App() {'));
let startIndex = appIndex - 1;
// Search backwards for the start of the leftover code
while (startIndex > 0 && !lines[startIndex].includes('function Dashboard')) {
  startIndex--;
}

// We need to keep everything up to the end of Dashboard
// Let's find the closing brace of Dashboard.
let dashboardEnd = startIndex;
let braceCount = 0;
let started = false;
for (let i = startIndex; i < appIndex; i++) {
  if (lines[i].includes('{')) {
    braceCount += (lines[i].match(/\{/g) || []).length;
    started = true;
  }
  if (lines[i].includes('}')) {
    braceCount -= (lines[i].match(/\}/g) || []).length;
  }
  if (started && braceCount === 0) {
    dashboardEnd = i;
    break;
  }
}

// Ensure we delete between dashboardEnd + 1 and appIndex - 1
const toKeep = [];
for (let i = 0; i <= dashboardEnd; i++) {
  toKeep.push(lines[i]);
}
for (let i = appIndex; i < lines.length; i++) {
  toKeep.push(lines[i]);
}

fs.writeFileSync('src/App.tsx', toKeep.join('\n'));
console.log('Fixed syntax by removing leftover garbage.');
