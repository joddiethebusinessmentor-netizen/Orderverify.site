const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Page 1: Gadgets & Tech (From screenshots: Speakers, Earbuds, Smartwatches, LED Lights, Mini Cams, Oruss Watches)
const kikuuGadgets = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Mini Bluetooth Speaker (Jumla Pcs 10)", price: 150000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", description: "Mini Bluetooth Speaker (Jumla Pcs 10)" },
  { name: "Gaming Wireless Earbuds (Seti)", price: 120000, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", description: "Gaming Wireless Earbuds (Seti)" },
  { name: "Sport Smartwatch Braided (Pcs 5)", price: 250000, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400", description: "Sport Smartwatch Braided (Pcs 5)" },
  { name: "LED Strip Lights Room Decor (Seti)", price: 110000, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400", description: "LED Strip Lights Room Decor (Seti)" },
  { name: "Mini WiFi Spy Camera (Pcs 3)", price: 180000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400", description: "Mini WiFi Spy Camera (Pcs 3)" },
  { name: "Oruss Men's Luxury Watch", price: 320000, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", description: "Oruss Men's Luxury Watch" },
  { name: "Bone Conduction Earphones", price: 145000, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", description: "Bone Conduction Earphones" },
  { name: "Starry Sky Projector Light", price: 115000, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400", description: "Starry Sky Projector Light" },
  { name: "Wooden Phone Stand (Jumla Pcs 20)", price: 105000, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400", description: "Wooden Phone Stand (Jumla Pcs 20)" },
  { name: "Blue Dial Stainless Watch (Seti)", price: 210000, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400", description: "Blue Dial Stainless Watch (Seti)" },
  { name: "Camera Lens Coffee Mug (Seti)", price: 100000, image: "https://images.unsplash.com/photo-1514846328220-4a81b22fb4d2?w=400", description: "Camera Lens Coffee Mug (Seti)" },
  { name: "Touch Control Headset (Jumla)", price: 160000, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", description: "Touch Control Headset (Jumla)" }
];`;
content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, kikuuGadgets);

// 2. Page 2: Beauty & Care (From screenshots: Brushes, Batana Oil, Hip Lift, Nails, Jewelry Sets)
const kikuuBeauty = `export const masterTechProducts: ProductTemplate[] = [
  { name: "13Pcs Makeup Brush Set (Jumla)", price: 110000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "13Pcs Makeup Brush Set (Jumla)" },
  { name: "Batana Hair Growth Oil (Seti 5)", price: 125000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Batana Hair Growth Oil (Seti 5)" },
  { name: "Hip-Lift Massage Cream (Box)", price: 140000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Hip-Lift Massage Cream (Box)" },
  { name: "Luxury Press-on Nails (Seti 10)", price: 105000, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400", description: "Luxury Press-on Nails (Seti 10)" },
  { name: "Blue Crystal Watch & Jewelry Set", price: 190000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", description: "Blue Crystal Watch & Jewelry Set" },
  { name: "Butterfly Watch & Necklace Set", price: 180000, image: "https://images.unsplash.com/photo-1599643478514-4a410f060f42?w=400", description: "Butterfly Watch & Necklace Set" },
  { name: "Gold Plated Women's Watch Set", price: 220000, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400", description: "Gold Plated Women's Watch Set" },
  { name: "Yin-Yang Beaded Bracelets (Jumla)", price: 100000, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", description: "Yin-Yang Beaded Bracelets (Jumla)" },
  { name: "Anti-Blue Light Glasses (Seti)", price: 115000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", description: "Anti-Blue Light Glasses (Seti)" },
  { name: "Weight Loss Slimming Patch", price: 130000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Weight Loss Slimming Patch" },
  { name: "Skin Brightening Toner Set", price: 150000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Skin Brightening Toner Set" },
  { name: "Professional Facial Kit", price: 170000, image: "https://images.unsplash.com/photo-1556228720-192a87262f01?w=400", description: "Professional Facial Kit" }
];`;
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, kikuuBeauty);

// 3. Page 3: Fashion & Accessories (From screenshots: Hoodie, Phone cases, Slides, Bras)
const kikuuFashion = `export const masterClothingProducts: ProductTemplate[] = [];

export const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Sleeveless Hoodie Vest (Seti 4)", price: 140000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", description: "Sleeveless Hoodie Vest (Seti 4)" },
  { name: "Shockproof Phone Case with Ring", price: 120000, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?w=400", description: "Shockproof Phone Case with Ring" },
  { name: "Zmistuo Platform Slides (Pea 5)", price: 160000, image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400", description: "Zmistuo Platform Slides (Pea 5)" },
  { name: "Seamless Shapewear Bras (Seti)", price: 135000, image: "https://images.unsplash.com/photo-1615486171448-4fb003ef21ee?w=400", description: "Seamless Shapewear Bras (Seti)" },
  { name: "Colorful iPhone Cases (Jumla)", price: 110000, image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400", description: "Colorful iPhone Cases (Jumla)" },
  { name: "Retro Leather Wallet Set", price: 125000, image: "https://images.unsplash.com/photo-1627042633145-b780d842ba45?w=400", description: "Retro Leather Wallet Set" },
  { name: "Men's Casual Sneakers (Premium)", price: 180000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Men's Casual Sneakers (Premium)" },
  { name: "Women's Crossbody Bag", price: 150000, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400", description: "Women's Crossbody Bag" },
  { name: "Designer Sunglasses Set", price: 115000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", description: "Designer Sunglasses Set" },
  { name: "Orthopedic Walking Shoes", price: 190000, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400", description: "Orthopedic Walking Shoes" },
  { name: "Cotton T-Shirts Bundle", price: 105000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", description: "Cotton T-Shirts Bundle" },
  { name: "Leather Belt & Accessories", price: 130000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400", description: "Leather Belt & Accessories" }
];`;
content = content.replace(/export const masterClothingProducts: ProductTemplate\[\] = \[[\s\S]*?\];\n\nexport const masterIndustrialProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, kikuuFashion);

// 4. Update the procedural bases
const procBases = `const homeBases = ["Bluetooth Speaker", "Wireless Earbuds", "Smartwatch", "LED Lights", "Spy Camera", "Luxury Watch"];
const techBases = ["Makeup Brush", "Hair Oil", "Massage Cream", "Press-on Nails", "Jewelry Set", "Yin-Yang Bracelet"];
const industrialBases = ["Hoodie Vest", "Phone Case", "Platform Slides", "Shapewear Bra", "Leather Wallet", "Sneakers"];`;
content = content.replace(/const homeBases = \[[\s\S]*?\];\nconst techBases = \[[\s\S]*?\];\nconst industrialBases = \[[\s\S]*?\];/, procBases);

// 5. Update Swahili Comments to reflect these exactly
const kikuuComments = `export const rawSwahiliComments: { text: string; replies: { name: string; text: string; time: string }[] }[] = [
  {
    text: "Mteja wangu amefurahia sana seti ya saa janja na earphones, mzigo uko vizuri sana! 🔥",
    replies: [
      { name: "Msimamizi", text: "Kazi nzuri! Bidhaa hizi za kielektroniki zinatoka sana.", time: "Dakika 2 zilizopita" }
    ]
  },
  {
    text: "Oda ya makeup brushes na hair oil imethibitishwa. Wateja wanapenda hizi packages za jumla.",
    replies: []
  },
  {
    text: "Hoodies na phone cases zina soko kubwa sana. Nimeuza seti tatu leo asubuhi! 📦",
    replies: [
      { name: "Fatou M.", text: "Kweli kabisa, vijana wanapenda sana hizo.", time: "Dakika 4 zilizopita" }
    ]
  },
  {
    text: "Taa za LED room decor zinatoka hatari. Mteja kalipia fasta.",
    replies: []
  },
  {
    text: "Oruss watch ina muonekano wa kitajiri, kamisheni yake pia ni kubwa. Nimepiga hela vizuri leo.",
    replies: []
  },
  {
    text: "Shapewear bras na slides ni bidhaa zinazotafutwa sana na wadada. Kazi inaenda vizuri.",
    replies: []
  },
  {
    text: "Mteja aliuliza kama kamera ya siri (Spy camera) inatumia WiFi, nikampa maelezo yote akakubali.",
    replies: [
      { name: "Msimamizi", text: "Maelezo sahihi yanasaidia sana mteja kuridhika. 💡", time: "Dakika 10 zilizopita" }
    ]
  },
  {
    text: "Seti ya mikufu na saa ya blue crystal imenipa faida kubwa sana.",
    replies: []
  },
  {
    text: "Kiasi cha kamisheni kwenye bidhaa za jumla ni kikubwa mno, inanipa motisha.",
    replies: [
      { name: "Kofi A.", text: "Umeona eeh! Kuuza kwa jumla kuna faida kubwa.", time: "Dakika 5 zilizopita" }
    ]
  },
  {
    text: "Siri ni kufuata maelekezo ya kila oda. Elektroniki, Urembo, au Fashion, yote yanalipa vizuri.",
    replies: []
  },
  {
    text: "Imekuwa siku ya baraka kwangu, nimepata oda ya seti nzima ya saa na miwani. 🎉",
    replies: []
  },
  {
    text: "Kuwasiliana na wateja na kuwahakikishia usalama wa bidhaa zetu kunajenga uaminifu mkubwa.",
    replies: []
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    text: \`Leo nimepokea oda \${i+5} mfululizo za vifaa hivi na kuthibitisha haraka! Hakuna kupoteza muda.\`,
    replies: []
  }))
];`;
content = content.replace(/export const rawSwahiliComments: \{ text: string; replies: \{ name: string; text: string; time: string \}.*?\];/s, kikuuComments);

// 6. Force Cache Clear
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v30_exact_kikuu_match"');

fs.writeFileSync('src/data.ts', content);
console.log("Applied Kikuu-style items successfully.");
