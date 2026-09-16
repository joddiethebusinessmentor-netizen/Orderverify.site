const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const agriProductsEnglish = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "DAP Fertilizer (5 Bags)", price: 450000, image: "https://loremflickr.com/400/400/fertilizer,farm?random=1", description: "DAP Fertilizer (5 Bags)" },
  { name: "Irrigation Water Pump", price: 550000, image: "https://loremflickr.com/400/400/waterpump,irrigation?random=2", description: "Irrigation Water Pump" },
  { name: "Hybrid Maize Seeds (50kg)", price: 250000, image: "https://loremflickr.com/400/400/corn,seeds?random=3", description: "Hybrid Maize Seeds (50kg)" },
  { name: "Pesticide Sprayer Pump (3 Pcs)", price: 210000, image: "https://loremflickr.com/400/400/sprayer,farm?random=4", description: "Pesticide Sprayer Pump (3 Pcs)" },
  { name: "Poultry Feed (10 Bags)", price: 350000, image: "https://loremflickr.com/400/400/poultry,chicken?random=5", description: "Poultry Feed (10 Bags)" },
  { name: "Sunflower Seeds (20kg)", price: 280000, image: "https://loremflickr.com/400/400/sunflower,seeds?random=6", description: "Sunflower Seeds (20kg)" },
  { name: "Heavy Duty Drying Tarpaulin", price: 220000, image: "https://loremflickr.com/400/400/tarpaulin,farm?random=7", description: "Heavy Duty Drying Tarpaulin" },
  { name: "Mini Chaff Cutter Machine", price: 580000, image: "https://loremflickr.com/400/400/agriculture,machine?random=8", description: "Mini Chaff Cutter Machine" },
  { name: "Grain Storage Bags (50 Pcs)", price: 300000, image: "https://loremflickr.com/400/400/grain,sacks?random=9", description: "Grain Storage Bags (50 Pcs)" },
  { name: "Herbicide Chemical (20 Liters)", price: 240000, image: "https://loremflickr.com/400/400/herbicide,farm?random=10", description: "Herbicide Chemical (20 Liters)" },
  { name: "Farming Tools Kit", price: 320000, image: "https://loremflickr.com/400/400/farming,tools?random=11", description: "Farming Tools Kit" },
  { name: "UREA Fertilizer (4 Bags)", price: 400000, image: "https://loremflickr.com/400/400/fertilizer,sack?random=12", description: "UREA Fertilizer (4 Bags)" }
];`;

const solarProducts = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Complete Solar Panel System 200W", price: 450000, image: "https://loremflickr.com/400/400/solar,panel?random=13", description: "Complete Solar Panel System 200W" },
  { name: "Solar Battery 100Ah Deep Cycle", price: 350000, image: "https://loremflickr.com/400/400/battery,solar?random=14", description: "Solar Battery 100Ah Deep Cycle" },
  { name: "Solar Water Heater 100L", price: 480000, image: "https://loremflickr.com/400/400/solar,heater?random=15", description: "Solar Water Heater 100L" },
  { name: "Solar Inverter 1000W Pure Sine", price: 280000, image: "https://loremflickr.com/400/400/solar,inverter?random=16", description: "Solar Inverter 1000W Pure Sine" },
  { name: "Solar Street Light 300W (2 Pcs)", price: 220000, image: "https://loremflickr.com/400/400/solar,street,light?random=17", description: "Solar Street Light 300W (2 Pcs)" },
  { name: "Solar Garden Lights Set (10 Pcs)", price: 200000, image: "https://loremflickr.com/400/400/solar,garden,light?random=18", description: "Solar Garden Lights Set (10 Pcs)" },
  { name: "Portable Solar Generator 500W", price: 500000, image: "https://loremflickr.com/400/400/solar,generator?random=19", description: "Portable Solar Generator 500W" },
  { name: "Solar Charge Controller 60A MPPT", price: 240000, image: "https://loremflickr.com/400/400/solar,controller?random=20", description: "Solar Charge Controller 60A MPPT" },
  { name: "Foldable Solar Panel 120W (Camping)", price: 320000, image: "https://loremflickr.com/400/400/solar,panel,camping?random=21", description: "Foldable Solar Panel 120W (Camping)" },
  { name: "Solar Powered Submersible Pump", price: 420000, image: "https://loremflickr.com/400/400/waterpump,solar?random=22", description: "Solar Powered Submersible Pump" },
  { name: "Solar CCTV Camera System", price: 380000, image: "https://loremflickr.com/400/400/cctv,solar?random=23", description: "Solar CCTV Camera System" },
  { name: "Solar Fan with LED & USB (2 Pcs)", price: 210000, image: "https://loremflickr.com/400/400/solar,fan?random=24", description: "Solar Fan with LED & USB (2 Pcs)" }
];`;

content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, agriProductsEnglish);
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, solarProducts);

content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v49_real_photos_working"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated images to lorempicsum!");
