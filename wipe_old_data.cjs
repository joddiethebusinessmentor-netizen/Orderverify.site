const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The version tag was already bumped to ov_v55_final_generated_images by fix_images_final_local.cjs,
// but the browser might be stubborn or React hot reload might be stubborn.
// Let's force it to 56 just to be absolutely sure.
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v57_clear_all_and_use_real"');

fs.writeFileSync('src/data.ts', content);
