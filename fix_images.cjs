const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Add imports
const imports = `import phoneTripodImg from "./assets/images/phone_tripod_stand_1789290638423.jpg";
import cameraMugImg from "./assets/images/camera_lens_mug_1789290655544.jpg";`;

content = content.replace('import floorScrubberImg', imports + '\nimport floorScrubberImg');

// Replace usages
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1527581559868-e67c8be24eeb\?w=400"/, 'phoneTripodImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1514846328220-4a81b22fb4d2\?w=400"/, 'cameraMugImg');

// Bump version
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v34_kikuu_real_images"');

fs.writeFileSync('src/data.ts', content);
console.log("Images replaced");
