const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Remove InAppBrowserWarning component
app = app.replace(/\/\/ --- In-App Browser Warning Component ---[\s\S]*?function InAppBrowserWarning\(\) \{[\s\S]*?\}\n/, '');

// Remove state and effect
app = app.replace(/const \[isInAppBrowser, setIsInAppBrowser\] = useState\(false\);\n/, '');
app = app.replace(/  useEffect\(\(\) => \{\n    \/\/ Check for TikTok or other in-app browsers\n    const userAgent = navigator\.userAgent \|\| navigator\.vendor \|\| window\.opera;\n    const inAppRegex = \/TikTok\|Bytedance\|FBAV\|FBAN\|Instagram\|Line\|Snapchat\/i;\n    if \(inAppRegex\.test\(userAgent\)\) \{\n      setIsInAppBrowser\(true\);\n    \}\n  \}, \[\]\);\n\n/, '');

// Remove conditional render
app = app.replace(/  if \(isInAppBrowser\) \{\n    return <InAppBrowserWarning \/>;\n  \}\n\n/, '');

fs.writeFileSync('src/App.tsx', app);
console.log('Reverted in-app browser warning.');
