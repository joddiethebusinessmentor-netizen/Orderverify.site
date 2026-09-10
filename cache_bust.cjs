const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

code = code.replace(/STORAGE_VERSION_TAG = "ov_v16_added_more_products"/g, 'STORAGE_VERSION_TAG = "ov_v17_final_fixes"');

fs.writeFileSync('src/data.ts', code);
console.log("Bumped cache version to force data reload");
