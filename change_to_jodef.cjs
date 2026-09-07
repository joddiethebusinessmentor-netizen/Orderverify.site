const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the audio source
code = code.replace(
  'src="/AUD-20260907-WA0024.opus"',
  'src="/Jodef.mp3"'
);

// Replace the button text
code = code.replace(
  '<span className="text-xs font-black uppercase tracking-wide">Washa Sauti</span>',
  '<span className="text-xs font-black uppercase tracking-wide">BONYEZA KUSIKILIZA</span>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Audio source updated to Jodef.mp3 and button text updated');
