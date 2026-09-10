const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const newCountryList = `const targetCountryList: string[] = [
    // Page 1 (10 orders)
    "Tanzania", "Kenya", "Uganda", "Rwanda", "Tanzania", "Burundi",
    "DR Congo", "Kenya", "South Africa", "Tanzania",

    // Page 2 (10 orders)
    "Kenya", "Tanzania", "Uganda", "Rwanda", "DR Congo", "Tanzania",
    "Burundi", "Kenya", "South Africa", "Tanzania",

    // Page 3 (10 orders)
    "Tanzania", "Kenya", "Uganda", "DR Congo", "Tanzania", "Rwanda",
    "Nigeria", "Burundi", "South Africa", "Tanzania"
  ];

  for (let i = 0; i < 30; i++) {`;

code = code.replace(/const targetCountryList: string\[\] = \[.*?for \(let i = 0; i < 36; i\+\+\) \{/s, newCountryList);

code = code.replace(/const all36Templates =/g, 'const all30Templates =');
code = code.replace(/all36Templates\[i\]/g, 'all30Templates[i]');
code = code.replace(/STORAGE_VERSION_TAG = "ov_v12_no_duplicates"/g, 'STORAGE_VERSION_TAG = "ov_v13_fixed_count"');

fs.writeFileSync('src/data.ts', code);
console.log("Fixed the loop bound to 30.");
