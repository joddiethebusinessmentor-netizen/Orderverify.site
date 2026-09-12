const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

code = code.replace(/STORAGE_VERSION_TAG = "ov_v19_fix_validation_bounds"/g, 'STORAGE_VERSION_TAG = "ov_v20_joined_banner"');

fs.writeFileSync('src/data.ts', code);
console.log("Bumped cache version");
