const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const agriProductsEnglish = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "DAP Fertilizer (5 Bags)", price: 450000, image: "https://image.pollinations.ai/prompt/bags%20of%20agricultural%20fertilizer?width=400&height=400&nologo=true", description: "DAP Fertilizer (5 Bags)" },
  { name: "Irrigation Water Pump", price: 550000, image: "https://image.pollinations.ai/prompt/irrigation%20water%20pump%20machine%20agriculture?width=400&height=400&nologo=true", description: "Irrigation Water Pump" },
  { name: "Hybrid Maize Seeds (50kg)", price: 250000, image: "https://image.pollinations.ai/prompt/sack%20of%20hybrid%20maize%20corn%20seeds?width=400&height=400&nologo=true", description: "Hybrid Maize Seeds (50kg)" },
  { name: "Pesticide Sprayer Pump (3 Pcs)", price: 210000, image: "https://image.pollinations.ai/prompt/backpack%20pesticide%20sprayer%20agriculture?width=400&height=400&nologo=true", description: "Pesticide Sprayer Pump (3 Pcs)" },
  { name: "Poultry Feed (10 Bags)", price: 350000, image: "https://image.pollinations.ai/prompt/bags%20of%20chicken%20poultry%20feed?width=400&height=400&nologo=true", description: "Poultry Feed (10 Bags)" },
  { name: "Sunflower Seeds (20kg)", price: 280000, image: "https://image.pollinations.ai/prompt/sack%20of%20sunflower%20seeds%20agriculture?width=400&height=400&nologo=true", description: "Sunflower Seeds (20kg)" },
  { name: "Heavy Duty Drying Tarpaulin", price: 220000, image: "https://image.pollinations.ai/prompt/large%20blue%20agricultural%20drying%20tarpaulin?width=400&height=400&nologo=true", description: "Heavy Duty Drying Tarpaulin" },
  { name: "Mini Chaff Cutter Machine", price: 580000, image: "https://image.pollinations.ai/prompt/agricultural%20chaff%20cutter%20machine?width=400&height=400&nologo=true", description: "Mini Chaff Cutter Machine" },
  { name: "Grain Storage Bags (50 Pcs)", price: 300000, image: "https://image.pollinations.ai/prompt/empty%20woven%20grain%20storage%20bags?width=400&height=400&nologo=true", description: "Grain Storage Bags (50 Pcs)" },
  { name: "Herbicide Chemical (20 Liters)", price: 240000, image: "https://image.pollinations.ai/prompt/jerrycan%20of%20agricultural%20herbicide?width=400&height=400&nologo=true", description: "Herbicide Chemical (20 Liters)" },
  { name: "Farming Tools Kit", price: 320000, image: "https://image.pollinations.ai/prompt/collection%20of%20hand%20farming%20tools?width=400&height=400&nologo=true", description: "Farming Tools Kit" },
  { name: "UREA Fertilizer (4 Bags)", price: 400000, image: "https://image.pollinations.ai/prompt/white%20bags%20of%20urea%20fertilizer?width=400&height=400&nologo=true", description: "UREA Fertilizer (4 Bags)" }
];`;

const solarProducts = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Complete Solar Panel System 200W", price: 450000, image: "https://image.pollinations.ai/prompt/complete%20solar%20panel%20system?width=400&height=400&nologo=true", description: "Complete Solar Panel System 200W" },
  { name: "Solar Battery 100Ah Deep Cycle", price: 350000, image: "https://image.pollinations.ai/prompt/large%20deep%20cycle%20solar%20battery?width=400&height=400&nologo=true", description: "Solar Battery 100Ah Deep Cycle" },
  { name: "Solar Water Heater 100L", price: 480000, image: "https://image.pollinations.ai/prompt/rooftop%20solar%20water%20heater%20tank?width=400&height=400&nologo=true", description: "Solar Water Heater 100L" },
  { name: "Solar Inverter 1000W Pure Sine", price: 280000, image: "https://image.pollinations.ai/prompt/solar%20power%20inverter%20device?width=400&height=400&nologo=true", description: "Solar Inverter 1000W Pure Sine" },
  { name: "Solar Street Light 300W (2 Pcs)", price: 220000, image: "https://image.pollinations.ai/prompt/solar%20powered%20led%20street%20light?width=400&height=400&nologo=true", description: "Solar Street Light 300W (2 Pcs)" },
  { name: "Solar Garden Lights Set (10 Pcs)", price: 200000, image: "https://image.pollinations.ai/prompt/outdoor%20solar%20garden%20lights?width=400&height=400&nologo=true", description: "Solar Garden Lights Set (10 Pcs)" },
  { name: "Portable Solar Generator 500W", price: 500000, image: "https://image.pollinations.ai/prompt/portable%20solar%20power%20generator%20station?width=400&height=400&nologo=true", description: "Portable Solar Generator 500W" },
  { name: "Solar Charge Controller 60A MPPT", price: 240000, image: "https://image.pollinations.ai/prompt/mppt%20solar%20charge%20controller%20device?width=400&height=400&nologo=true", description: "Solar Charge Controller 60A MPPT" },
  { name: "Foldable Solar Panel 120W (Camping)", price: 320000, image: "https://image.pollinations.ai/prompt/foldable%20portable%20solar%20panel?width=400&height=400&nologo=true", description: "Foldable Solar Panel 120W (Camping)" },
  { name: "Solar Powered Submersible Pump", price: 420000, image: "https://image.pollinations.ai/prompt/solar%20powered%20water%20submersible%20pump?width=400&height=400&nologo=true", description: "Solar Powered Submersible Pump" },
  { name: "Solar CCTV Camera System", price: 380000, image: "https://image.pollinations.ai/prompt/solar%20powered%20outdoor%20cctv%20camera?width=400&height=400&nologo=true", description: "Solar CCTV Camera System" },
  { name: "Solar Fan with LED & USB (2 Pcs)", price: 210000, image: "https://image.pollinations.ai/prompt/solar%20powered%20standing%20fan?width=400&height=400&nologo=true", description: "Solar Fan with LED & USB (2 Pcs)" }
];`;

content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, agriProductsEnglish);
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, solarProducts);

content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v50_pollinations_images"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated images to pollinations.ai!");
