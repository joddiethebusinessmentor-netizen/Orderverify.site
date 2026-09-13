const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace the hardcoded reply names with dynamically generated distinct ones
content = content.replace(
  /name: r\.name,/g,
  'name: generateDistinctCustomer(usedBaseNames, usedFullNames, "Tanzania").name,'
);

// Version bump
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v39_reply_dynamic_names"');

fs.writeFileSync('src/data.ts', content);
console.log("Fixed reply names");
