const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Fix Congo (DRC) missing in SURNAME_MAP
if (!content.includes('"Congo (DRC)": [')) {
  content = content.replace(/"Tanzania":/, '"Congo (DRC)": ["Mwamba", "Mutombo", "Kabila", "Tshisekedi", "Lukaku", "Bolasie", "Mbuyi", "Ilunga", "Kasongo"],\n  "Tanzania":');
}

// 2. Fix Currency map for Congo (DRC)
if (!content.includes('"Congo (DRC)": { curr:')) {
  // Let's add it right after Uganda or similar
  content = content.replace(/"Uganda": { curr: "UGX", rate: 1.45 },/, '"Uganda": { curr: "UGX", rate: 1.45 },\n  "Congo (DRC)": { curr: "FC", rate: 1.15 },');
}

// 3. Rename Page 1 products to English
const agriProductsEnglish = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "DAP Fertilizer (5 Bags)", price: 450000, image: "https://images.unsplash.com/photo-1627920769840-67503cb37719?w=400", description: "DAP Fertilizer (5 Bags)" },
  { name: "Irrigation Water Pump", price: 550000, image: "https://images.unsplash.com/photo-1601566868615-1a859e951752?w=400", description: "Irrigation Water Pump" },
  { name: "Hybrid Maize Seeds (50kg)", price: 250000, image: "https://images.unsplash.com/photo-1551722652-3d75c58b4563?w=400", description: "Hybrid Maize Seeds (50kg)" },
  { name: "Pesticide Sprayer Pump (3 Pcs)", price: 210000, image: "https://images.unsplash.com/photo-1592881177699-528574a480ec?w=400", description: "Pesticide Sprayer Pump (3 Pcs)" },
  { name: "Poultry Feed (10 Bags)", price: 350000, image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400", description: "Poultry Feed (10 Bags)" },
  { name: "Sunflower Seeds (20kg)", price: 280000, image: "https://images.unsplash.com/photo-1594411139783-0943eb91f5a5?w=400", description: "Sunflower Seeds (20kg)" },
  { name: "Heavy Duty Drying Tarpaulin", price: 220000, image: "https://images.unsplash.com/photo-1587396791007-063f2518e3ec?w=400", description: "Heavy Duty Drying Tarpaulin" },
  { name: "Mini Chaff Cutter Machine", price: 580000, image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c6d98?w=400", description: "Mini Chaff Cutter Machine" },
  { name: "Grain Storage Bags (50 Pcs)", price: 300000, image: "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1c?w=400", description: "Grain Storage Bags (50 Pcs)" },
  { name: "Herbicide Chemical (20 Liters)", price: 240000, image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=400", description: "Herbicide Chemical (20 Liters)" },
  { name: "Farming Tools Kit", price: 320000, image: "https://images.unsplash.com/photo-1589886737380-0be1b635c9ad?w=400", description: "Farming Tools Kit" },
  { name: "UREA Fertilizer (4 Bags)", price: 400000, image: "https://images.unsplash.com/photo-1599827552599-2f3609cbdeec?w=400", description: "UREA Fertilizer (4 Bags)" }
];`;

content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, agriProductsEnglish);

// 4. Create Solar products for Page 2 (masterTechProducts)
const solarProducts = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Complete Solar Panel System 200W", price: 450000, image: "https://images.unsplash.com/photo-1509391366360-12009a5651c6?w=400", description: "Complete Solar Panel System 200W" },
  { name: "Solar Battery 100Ah Deep Cycle", price: 350000, image: "https://images.unsplash.com/photo-1620288627228-5aeaf72986f3?w=400", description: "Solar Battery 100Ah Deep Cycle" },
  { name: "Solar Water Heater 100L", price: 480000, image: "https://images.unsplash.com/photo-1588698188172-cd7db6eb0c24?w=400", description: "Solar Water Heater 100L" },
  { name: "Solar Inverter 1000W Pure Sine", price: 280000, image: "https://images.unsplash.com/photo-1592833159057-6dd17daeb8b0?w=400", description: "Solar Inverter 1000W Pure Sine" },
  { name: "Solar Street Light 300W (2 Pcs)", price: 220000, image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=400", description: "Solar Street Light 300W (2 Pcs)" },
  { name: "Solar Garden Lights Set (10 Pcs)", price: 200000, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400", description: "Solar Garden Lights Set (10 Pcs)" },
  { name: "Portable Solar Generator 500W", price: 500000, image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400", description: "Portable Solar Generator 500W" },
  { name: "Solar Charge Controller 60A MPPT", price: 240000, image: "https://images.unsplash.com/photo-1615598696860-84f9812dfa14?w=400", description: "Solar Charge Controller 60A MPPT" },
  { name: "Foldable Solar Panel 120W (Camping)", price: 320000, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400", description: "Foldable Solar Panel 120W (Camping)" },
  { name: "Solar Powered Submersible Pump", price: 420000, image: "https://images.unsplash.com/photo-1601566868615-1a859e951752?w=400", description: "Solar Powered Submersible Pump" },
  { name: "Solar CCTV Camera System", price: 380000, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400", description: "Solar CCTV Camera System" },
  { name: "Solar Fan with LED & USB (2 Pcs)", price: 210000, image: "https://images.unsplash.com/photo-1597843815049-7cda27668b0b?w=400", description: "Solar Fan with LED & USB (2 Pcs)" }
];`;

content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, solarProducts);

// 5. Update targetCountryList for the second page (indices 12-23)
const newCountryList = `const targetCountryList: string[] = [
    "Congo (DRC)", "Ivory Coast", "Kenya", "Uganda", "Congo (DRC)", "Rwanda", "Congo (DRC)", "Burundi", "Algeria", "Zambia", "Congo (DRC)", "Malawi",
    "Congo (DRC)", "Tanzania", "South Africa", "Nigeria", "Congo (DRC)", "Kenya", "Ghana", "Congo (DRC)", "Uganda", "Senegal", "Zambia", "Congo (DRC)",
    "Somalia", "Liberia", "Sierra Leone", "Togo", "Benin", "Guinea", "Burkina Faso", "Niger", "Chad", "Burundi", "Lesotho", "Eswatini"
  ];`;
content = content.replace(/const targetCountryList: string\[\] = \[[\s\S]*?\];/, newCountryList);

// Bump version tag
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v45_solar_congo_fix"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated everything.");
