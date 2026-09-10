const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const newHome = `,
  { name: "Electric Blender", price: 185000, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80", description: "Electric Blender" },
  { name: "Coffee Maker", price: 210000, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=80", description: "Coffee Maker" }
];`;
code = code.replace(/  \{ name: "Water Boiler".*?\n\];/s, '  { name: "Water Boiler", price: 195000, image: waterBoilerImg, description: "Water Boiler" }' + newHome);


const newTech = `,
  { name: "Wireless Earbuds", price: 85000, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80", description: "Wireless Earbuds" },
  { name: "Smart Thermostat", price: 250000, image: "https://images.unsplash.com/photo-1567925066377-22d7350cb53d?auto=format&fit=crop&w=400&q=80", description: "Smart Thermostat" }
];`;
code = code.replace(/  \{ name: "Wireless Charger".*?\n\];/s, '  { name: "Wireless Charger", price: 125000, image: wirelessChargerImg, description: "Wireless Charger" }' + newTech);

code = code.replace(/STORAGE_VERSION_TAG = "ov_v15_added_clothes"/g, 'STORAGE_VERSION_TAG = "ov_v16_added_more_products"');

fs.writeFileSync('src/data.ts', code);
console.log("Added 2 home and 2 tech products to avoid procedural duplicates.");
