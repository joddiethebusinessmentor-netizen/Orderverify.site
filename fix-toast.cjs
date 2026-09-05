const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Change toast message string to exact example maybe?
const oldMsg = '`TZS ${payout.toLocaleString()} PAID SUCCESSFULLY`';
const newMsg = '`PAID SUCCESSFULLY: TZS ${payout.toLocaleString()}`';
content = content.replace(oldMsg, newMsg);

// Also let's make sure the triggerMotivation message isn't what they were confusing it with.
// They said: "afu yasikae mda mrefu kama inavyo Kaa ile taarifa muhimu inayo kuja kwa juu"
// Which means they understand the toast (which is in the middle) and the top motivation.

fs.writeFileSync('src/App.tsx', content);
