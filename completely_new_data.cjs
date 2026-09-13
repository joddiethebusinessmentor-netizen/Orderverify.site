const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Page 1: Completely New Beauty
const beauty1 = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Gold Infused Face Mask", price: 250000, image: "https://images.unsplash.com/photo-1596755389378-c11c750e30d1?w=400", description: "Mask ya Uso ya Dhahabu (Gold Infused Face Mask)" },
  { name: "Bamboo Makeup Brushes", price: 120000, image: "https://images.unsplash.com/photo-1629853900989-1cc67d4cc741?w=400", description: "Begi la Brashi za Urembo (Bamboo Makeup Brushes)" },
  { name: "Laser Hair Remover", price: 450000, image: "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?w=400", description: "Mashine ya Kuondoa Nywele (Laser Hair Remover)" },
  { name: "Ultrasonic Skin Scrubber", price: 185000, image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=400", description: "Mashine ya Kusafisha Ngozi (Ultrasonic Skin Scrubber)" },
  { name: "Vegan Lip Tints Bundle", price: 105000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "Lipstick za Asili (Vegan Lip Tints Bundle)" },
  { name: "Rose Quartz Roller Set", price: 140000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Kifaa cha Kumasaji Uso (Rose Quartz Roller Set)" },
  { name: "Keratin Hair Treatment", price: 215000, image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=400", description: "Dawa ya Kutunza Nywele (Keratin Hair Treatment)" },
  { name: "LED Makeup Mirror", price: 165000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Kioo cha Makeup chenye Taa (LED Makeup Mirror)" },
  { name: "Hyaluronic Acid Serum", price: 195000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Seramu ya Asidi (Hyaluronic Acid Serum)" },
  { name: "Gel Nail Polish Kit", price: 135000, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400", description: "Seti ya Rangi za Kucha (Gel Nail Polish Kit)" },
  { name: "Charcoal Teeth Whitener", price: 115000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Dawa ya Kung'arisha Meno (Charcoal Teeth Whitener)" },
  { name: "Essential Oils Collection", price: 220000, image: "https://images.unsplash.com/photo-1608528577891-eb05fbd29584?w=400", description: "Mafuta ya Kufanya Masaji (Essential Oils Collection)" }
];`;
content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty1);

// 2. Page 2: Completely New Car Accessories
const carProducts = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Wireless Apple CarPlay", price: 350000, image: "https://images.unsplash.com/photo-1544390559-6720fc04bf6f?w=400", description: "Redio ya Gari (Wireless Apple CarPlay)" },
  { name: "Car Fridge/Cooler", price: 280000, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400", description: "Friji Ndogo ya Gari (Car Fridge/Cooler)" },
  { name: "Jump Starter Power Bank", price: 215000, image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400", description: "Batri ya Kuwashia Gari (Jump Starter Power Bank)" },
  { name: "Blind Spot Mirrors", price: 105000, image: "https://images.unsplash.com/photo-1506509635032-9cb773bc635d?w=400", description: "Vioo vya Pembeni (Blind Spot Mirrors)" },
  { name: "Steering Wheel Lock", price: 145000, image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400", description: "Kufuri la Usukani (Steering Wheel Lock)" },
  { name: "Digital Tire Pressure Monitor", price: 175000, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400", description: "Kipima Upepo wa Matairi (Tire Pressure Monitor)" },
  { name: "Memory Foam Car Cushion", price: 125000, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400", description: "Mto wa Kiti cha Gari (Memory Foam Car Cushion)" },
  { name: "Rooftop Cargo Bag", price: 320000, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400", description: "Begi la Juu ya Gari (Rooftop Cargo Bag)" },
  { name: "OBD2 Diagnostic Scanner", price: 250000, image: "https://images.unsplash.com/photo-1600868159186-b4b6009efb4b?w=400", description: "Mashine ya Kupima Gari (OBD2 Diagnostic Scanner)" },
  { name: "Underglow LED Lights", price: 135000, image: "https://images.unsplash.com/photo-1506509635032-9cb773bc635d?w=400", description: "Taa za Chini ya Gari (Underglow LED Lights)" },
  { name: "Ceramic Coating Spray", price: 110000, image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400", description: "Dawa ya Kulinda Rangi (Ceramic Coating Spray)" },
  { name: "Heated Seat Covers", price: 410000, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400", description: "Kava za Viti Vyenye Joto (Heated Seat Covers)" }
];`;
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, carProducts);

// 3. Page 3: Completely New Clothes & Shoes
const clothesProducts = `export const masterClothingProducts: ProductTemplate[] = [];

export const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Cashmere Winter Sweater", price: 260000, image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=400", description: "Sweta la Baridi (Cashmere Winter Sweater)" },
  { name: "Vintage Biker Jacket", price: 420000, image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=400", description: "Jacket la Pikipiki (Vintage Biker Jacket)" },
  { name: "Silk Slip Dress", price: 185000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", description: "Gauni la Hariri (Silk Slip Dress)" },
  { name: "Velvet Loafers", price: 230000, image: "https://images.unsplash.com/photo-1614252339460-5f0412e84c31?w=400", description: "Viatu vya Velvet (Velvet Loafers)" },
  { name: "Tactical Cargo Pants", price: 145000, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400", description: "Suruali ya Kazi (Tactical Cargo Pants)" },
  { name: "Suede Chelsea Boots", price: 310000, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400", description: "Buti za Suede (Suede Chelsea Boots)" },
  { name: "Sequined Party Gown", price: 480000, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400", description: "Gauni la Sherehe (Sequined Party Gown)" },
  { name: "Wool Blend Peacoat", price: 350000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", description: "Koti la Suti (Wool Blend Peacoat)" },
  { name: "Chunky Platform Sneakers", price: 195000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Raba za Kisasa (Chunky Platform Sneakers)" },
  { name: "Designer Sun Hat", price: 110000, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400", description: "Kofia ya Jua (Designer Sun Hat)" },
  { name: "Linen Summer Suit", price: 450000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", description: "Suti ya Joto (Linen Summer Suit)" },
  { name: "Embroidered Kimono", price: 175000, image: "https://images.unsplash.com/photo-1564257631407-4deec8caa40d?w=400", description: "Gauni la Kimono (Embroidered Kimono)" }
];`;
content = content.replace(/export const masterClothingProducts: ProductTemplate\[\] = \[[\s\S]*?\];\n\nexport const masterIndustrialProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, clothesProducts);

// 4. Also update the procedural bases so even dynamically generated ones are 100% new
const procBases = `const homeBases = ["Gold Mask", "Laser Epilator", "Quartz Roller", "Vegan Tints", "Keratin Serum", "LED Mirror"];
const techBases = ["Car Cooler", "Jump Starter", "OBD2 Scanner", "Cargo Bag", "Tire Monitor", "Underglow"];
const industrialBases = ["Cashmere Sweater", "Velvet Loafers", "Silk Dress", "Suede Boots", "Party Gown", "Peacoat"];`;
content = content.replace(/const homeBases = \[[\s\S]*?\];\nconst techBases = \[[\s\S]*?\];\nconst industrialBases = \[[\s\S]*?\];/, procBases);


// 5. Force Version Bump
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v28_absolutely_new_items_strict"');

fs.writeFileSync('src/data.ts', content);
console.log("Completely new products added.");
