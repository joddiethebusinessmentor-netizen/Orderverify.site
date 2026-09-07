const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the audio source
code = code.replace(
  'src="/Voice.mp3"',
  'src="/AUD-20260907-WA0024.opus"'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Audio source updated to AUD-20260907-WA0024.opus');
