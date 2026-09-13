const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const fallbackReplace = `  // Fallback unique procedural name
  const fallbackNum = proceduralCustomerSeed++;
  const tzSurnames = SURNAME_MAP["Tanzania"];
  const tzFirsts = ["Juma", "Asha", "Baraka", "Neema", "John", "Mary", "Daudi", "Zuhura", "Emmanuel", "Grace", "Kelvin", "Rehema", "Jackson", "Fatuma", "Peter", "Salome", "Joseph", "Mariam", "Michael", "Amina", "David", "Zainab", "Frank", "Halima", "Charles", "Hawa"];
  
  const fName = tzFirsts[fallbackNum % tzFirsts.length];
  const sName = tzSurnames[(fallbackNum * 3) % tzSurnames.length];
  const name = \`\${fName} \${sName}\`;
  const base = fName.toLowerCase() + fallbackNum;
  usedBaseNames.add(base);
  usedFullNames.add(name.toLowerCase() + fallbackNum);
  
  return {
    name,
    gender: fallbackNum % 2 === 0 ? "male" : "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    avatar: resolveAvatar(fallbackNum % 2 === 0 ? "male" : "female", fallbackNum)
  };`;

content = content.replace(/  \/\/ Fallback unique procedural name[\s\S]*?avatar: resolveAvatar\("male", fallbackNum\)\n  \};/m, fallbackReplace);

// Also let's clear the version again
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v41_final_no_mwanachama"');

fs.writeFileSync('src/data.ts', content);
console.log("Fallback fixed.");
