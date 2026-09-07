const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The current code is:
/*
  if (!isAgeVerified) {
    return (
      <>
        <AgeVerification onVerify={() => setIsAgeVerified(true)} />
        <GlobalAudioPlayer />
      </>
    );
  }

  return (
    <>
      <Dashboard />
      <GlobalAudioPlayer />
    </>
  );
}
*/

const searchStr = `  if (!isAgeVerified) {
    return (
      <>
        <AgeVerification onVerify={() => setIsAgeVerified(true)} />
        <GlobalAudioPlayer />
      </>
    );
  }`;

const replaceStr = `  if (!isAgeVerified) {
    return <AgeVerification onVerify={() => setIsAgeVerified(true)} />;
  }`;

if (code.includes(searchStr)) {
    code = code.replace(searchStr, replaceStr);
    fs.writeFileSync('src/App.tsx', code);
    console.log('Successfully removed GlobalAudioPlayer from AgeVerification');
} else {
    console.log('Could not find the exact string to replace');
}
