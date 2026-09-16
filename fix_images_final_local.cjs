const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// Ensure SURNAME_MAP has Congo
if (!content.includes('"Congo (DRC)": [')) {
  content = content.replace(/"Tanzania":/, '"Congo (DRC)": ["Mwamba", "Mutombo", "Kabila", "Tshisekedi", "Lukaku", "Bolasie", "Mbuyi", "Ilunga", "Kasongo"],\n  "Tanzania":');
}

// Ensure currency map has Congo
if (!content.includes('"Congo (DRC)": { curr:')) {
  content = content.replace(/"Uganda": { curr: "UGX", rate: 1.45 },/, '"Uganda": { curr: "UGX", rate: 1.45 },\n  "Congo (DRC)": { curr: "FC", rate: 1.15 },');
}

const imports = `
import imgDap from './assets/images/dap_fertilizer_bag_1789537001954.jpg';
import imgPump from './assets/images/irrigation_water_pump_1789537012954.jpg';
import imgMaize from './assets/images/maize_seeds_bag_1789537024362.jpg';
import imgSprayer from './assets/images/backpack_sprayer_1789537034152.jpg';
import imgPoultry from './assets/images/poultry_feed_sack_1789537045322.jpg';
import imgSunflowers from './assets/images/sunflower_seeds_1789537055135.jpg';
import imgTarpaulin from './assets/images/blue_tarpaulin_1789537065716.jpg';
import imgChaffCutter from './assets/images/chaff_cutter_1789537075638.jpg';
import imgGrainBags from './assets/images/grain_storage_bags_1789537087191.jpg';
import imgHerbicide from './assets/images/herbicide_jerrycan_1789537098028.jpg';
import imgFarmTools from './assets/images/farming_tools_kit_1789537108300.jpg';
import imgUrea from './assets/images/urea_fertilizer_sack_1789537119091.jpg';

import imgSolar200W from './assets/images/solar_panel_200w_1789537129783.jpg';
import imgSolarBattery from './assets/images/solar_battery_100ah_1789537140689.jpg';
import imgSolarHeater from './assets/images/solar_water_heater_1789537151734.jpg';
import imgSolarInverter from './assets/images/solar_inverter_1000w_1789537161233.jpg';
import imgSolarStreet from './assets/images/solar_street_light_1789537172548.jpg';
import imgSolarGarden from './assets/images/solar_garden_lights_1789537183127.jpg';
import imgSolarGen from './assets/images/portable_solar_generator_1789537195320.jpg';
import imgSolarMppt from './assets/images/mppt_charge_controller_1789537205902.jpg';
import imgSolarFoldable from './assets/images/foldable_solar_panel_1789537216344.jpg';
import imgSolarSubPump from './assets/images/submersible_solar_pump_1789537226900.jpg';
import imgSolarCctv from './assets/images/solar_cctv_camera_1789537236789.jpg';
import imgSolarFan from './assets/images/solar_standing_fan_1789537246446.jpg';

// Re-map images in procedural generator just in case
const genericFarmImg = imgFarmTools;
const genericSolarImg = imgSolar200W;
`;

if (!content.includes('import imgDap')) {
  content = content.replace(/import \{ storageGet, storageSet, storageRemove \} from '\.\/utils\/storage';/, `import { storageGet, storageSet, storageRemove } from './utils/storage';\n${imports}`);
}

const agriProductsEnglish = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "DAP Fertilizer (5 Bags)", price: 450000, image: imgDap, description: "DAP Fertilizer (5 Bags)" },
  { name: "Irrigation Water Pump", price: 550000, image: imgPump, description: "Irrigation Water Pump" },
  { name: "Hybrid Maize Seeds (50kg)", price: 250000, image: imgMaize, description: "Hybrid Maize Seeds (50kg)" },
  { name: "Pesticide Sprayer Pump (3 Pcs)", price: 210000, image: imgSprayer, description: "Pesticide Sprayer Pump (3 Pcs)" },
  { name: "Poultry Feed (10 Bags)", price: 350000, image: imgPoultry, description: "Poultry Feed (10 Bags)" },
  { name: "Sunflower Seeds (20kg)", price: 280000, image: imgSunflowers, description: "Sunflower Seeds (20kg)" },
  { name: "Heavy Duty Drying Tarpaulin", price: 220000, image: imgTarpaulin, description: "Heavy Duty Drying Tarpaulin" },
  { name: "Mini Chaff Cutter Machine", price: 580000, image: imgChaffCutter, description: "Mini Chaff Cutter Machine" },
  { name: "Grain Storage Bags (50 Pcs)", price: 300000, image: imgGrainBags, description: "Grain Storage Bags (50 Pcs)" },
  { name: "Herbicide Chemical (20 Liters)", price: 240000, image: imgHerbicide, description: "Herbicide Chemical (20 Liters)" },
  { name: "Farming Tools Kit", price: 320000, image: imgFarmTools, description: "Farming Tools Kit" },
  { name: "UREA Fertilizer (4 Bags)", price: 400000, image: imgUrea, description: "UREA Fertilizer (4 Bags)" }
];`;

const solarProducts = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Complete Solar Panel System 200W", price: 450000, image: imgSolar200W, description: "Complete Solar Panel System 200W" },
  { name: "Solar Battery 100Ah Deep Cycle", price: 350000, image: imgSolarBattery, description: "Solar Battery 100Ah Deep Cycle" },
  { name: "Solar Water Heater 100L", price: 480000, image: imgSolarHeater, description: "Solar Water Heater 100L" },
  { name: "Solar Inverter 1000W Pure Sine", price: 280000, image: imgSolarInverter, description: "Solar Inverter 1000W Pure Sine" },
  { name: "Solar Street Light 300W (2 Pcs)", price: 220000, image: imgSolarStreet, description: "Solar Street Light 300W (2 Pcs)" },
  { name: "Solar Garden Lights Set (10 Pcs)", price: 200000, image: imgSolarGarden, description: "Solar Garden Lights Set (10 Pcs)" },
  { name: "Portable Solar Generator 500W", price: 500000, image: imgSolarGen, description: "Portable Solar Generator 500W" },
  { name: "Solar Charge Controller 60A MPPT", price: 240000, image: imgSolarMppt, description: "Solar Charge Controller 60A MPPT" },
  { name: "Foldable Solar Panel 120W (Camping)", price: 320000, image: imgSolarFoldable, description: "Foldable Solar Panel 120W (Camping)" },
  { name: "Solar Powered Submersible Pump", price: 420000, image: imgSolarSubPump, description: "Solar Powered Submersible Pump" },
  { name: "Solar CCTV Camera System", price: 380000, image: imgSolarCctv, description: "Solar CCTV Camera System" },
  { name: "Solar Fan with LED & USB (2 Pcs)", price: 210000, image: imgSolarFan, description: "Solar Fan with LED & USB (2 Pcs)" }
];`;

content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, agriProductsEnglish);
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, solarProducts);

content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v55_final_generated_images"');

// Fix the procedural generator to use the generic images instead of undefined external URLs
content = content.replace(/return \{\n\s*name: `\$\{m\} \$\{b\}`,\n\s*price: num,\n\s*image: `https[^\n]+`,\n\s*description: `\$\{m\} \$\{b\}`\n\s*\};/g, 
  'return {\n      name: `${m} ${b}`,\n      price: num,\n      image: category === "home" ? genericFarmImg : category === "tech" ? genericSolarImg : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ford_8N.jpg/500px-Ford_8N.jpg",\n      description: `${m} ${b}`\n    };');

fs.writeFileSync('src/data.ts', content);
console.log("Updated data.ts to use precise local AI-generated images!");
