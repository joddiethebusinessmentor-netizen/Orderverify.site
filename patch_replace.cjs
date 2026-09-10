const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// Replace Coffee Maker with Smart TV
code = code.replace(
  '\{ name: "Coffee Maker", price: 210000, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=80", description: "Coffee Maker" \}',
  '\{ name: "Smart TV", price: 650000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80", description: "Smart TV" \}'
);

// Replace Smart Thermostat with Digital Piano (Kinanda)
code = code.replace(
  '\{ name: "Smart Thermostat", price: 250000, image: "https://images.unsplash.com/photo-1567925066377-22d7350cb53d?auto=format&fit=crop&w=400&q=80", description: "Smart Thermostat" \}',
  '\{ name: "Kinanda (Piano)", price: 420000, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80", description: "Kinanda (Digital Piano)" \}'
);

code = code.replace(/STORAGE_VERSION_TAG = "ov_v17_final_fixes"/g, 'STORAGE_VERSION_TAG = "ov_v18_replace_coffee_thermo"');

fs.writeFileSync('src/data.ts', code);
console.log("Replaced products and bumped version");
