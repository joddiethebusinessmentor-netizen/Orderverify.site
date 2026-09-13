const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Add new imports
const newImports = `import shapewearBrasImg from "./assets/images/shapewear_bras_1789290994990.jpg";
import phoneCaseRingImg from "./assets/images/phone_case_ring_1789291007947.jpg";
import facialKitImg from "./assets/images/facial_kit_1789291018164.jpg";
import butterflyWatchSetImg from "./assets/images/butterfly_watch_set_1789291028718.jpg";
import pressOnNailsImg from "./assets/images/press_on_nails_1789291049824.jpg";
import batanaOilImg from "./assets/images/batana_oil_1789291060745.jpg";
import makeupBrushSet13pcsImg from "./assets/images/makeup_brush_set_13pcs_1789291072315.jpg";`;

content = content.replace('import phoneTripodImg', newImports + '\nimport phoneTripodImg');

// Replace URLs with variable names
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1615486171448-4fb003ef21ee\?w=400"/, 'shapewearBrasImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1601784551446-20c9e07cd8d3\?w=400"/, 'phoneCaseRingImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1556228720-192a87262f01\?w=400"/, 'facialKitImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1599643478514-4a410f060f42\?w=400"/, 'butterflyWatchSetImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1519014816548-bf5fe059e98b\?w=400"/, 'pressOnNailsImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1611078487771-419b48b11116\?w=400"/, 'batanaOilImg');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1592657788481-678c42b012eb\?w=400"/, 'makeupBrushSet13pcsImg');

// Force version bump again to guarantee user gets fresh data
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v36_final_real_assets"');

fs.writeFileSync('src/data.ts', content);
console.log("Images replaced successfully");
