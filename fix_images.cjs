const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The procedural generator was still using homeBases (headphones, speakers) if there weren't enough products.
// We have exactly 12 products in masterHomeProducts and masterTechProducts.
// Let's make sure the procedural bases are updated to match the new themes just in case it falls back,
// OR just rely on the version bump which should force it to use the new master arrays instead of cached local storage.

// Let's also update the procedural bases just to be safe so it NEVER generates headphones again
content = content.replace(/const homeBases = \["Bluetooth Speaker", "Wireless Earbuds", "Smartwatch", "LED Lights", "Spy Camera", "Luxury Watch"\];/, 'const homeBases = ["Tractor Part", "Water Hose", "Farm Tools", "Seed Pack", "Harvest Sack", "Irrigation Pipe"];');
content = content.replace(/const techBases = \["Makeup Brush", "Hair Oil", "Massage Cream", "Press-on Nails", "Jewelry Set", "Yin-Yang Bracelet"\];/, 'const techBases = ["Solar Panel", "Solar Battery", "Solar Inverter", "Solar Light", "Solar Fan", "Solar Pump"];');

fs.writeFileSync('src/data.ts', content);
