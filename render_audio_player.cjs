const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '  if (!isAgeVerified) {\n    return <AgeVerification onVerify={() => setIsAgeVerified(true)} />;\n  }\n\n  return <Dashboard />;\n}',
  '  if (!isAgeVerified) {\n    return (\n      <>\n        <AgeVerification onVerify={() => setIsAgeVerified(true)} />\n        <GlobalAudioPlayer />\n      </>\n    );\n  }\n\n  return (\n    <>\n      <Dashboard />\n      <GlobalAudioPlayer />\n    </>\n  );\n}'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Modified App returns to include GlobalAudioPlayer');
