const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Page 1: Beauty (Urembo) - 100k to 500k
const beauty1 = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Premium Skincare Set", price: 150000, image: "https://images.unsplash.com/photo-1615397323149-5b746816a695?w=400", description: "Seti ya Kutunza Ngozi (Premium Skincare Set)" },
  { name: "Luxury Makeup Kit", price: 250000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", description: "Kiti cha Makeup (Luxury Makeup Kit)" },
  { name: "Pro Hair Dryer", price: 180000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Mashine ya Kukaushia Nywele (Pro Hair Dryer)" },
  { name: "Electric Facial Massager", price: 120000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Kifaa cha Kusafisha Uso (Electric Facial Massager)" },
  { name: "Designer Perfume", price: 350000, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400", description: "Perfume ya Kisasa (Designer Perfume)" },
  { name: "Matte Lipstick Collection", price: 130000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "Mkusanyiko wa Lipstick (Matte Lipstick Collection)" },
  { name: "Gold Hair Straightener", price: 210000, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400", description: "Pasi ya Nywele (Gold Hair Straightener)" },
  { name: "Organic Body Scrub", price: 110000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Sabuni ya Kusugua Mwili (Organic Body Scrub)" },
  { name: "Anti-Aging Serum", price: 280000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Seramu ya Uso (Anti-Aging Serum)" },
  { name: "Professional Nail Kit", price: 145000, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400", description: "Kiti cha Kucha (Professional Nail Kit)" },
  { name: "Glowing Skin Toner", price: 105000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Toner ya Kung'arisha Uso (Glowing Skin Toner)" },
  { name: "Silk Sleep Mask Set", price: 100000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Mask ya Kulala (Silk Sleep Mask Set)" }
];`;
content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty1);

// 2. Page 2: Car Products (Bidhaa za Magari) - 100k to 500k
const carProducts = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Smart Dash Cam", price: 250000, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400", description: "Kamera ya Gari (Smart Dash Cam)" },
  { name: "Leather Seat Covers", price: 450000, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400", description: "Kava za Viti vya Ngozi (Leather Seat Covers)" },
  { name: "Heavy Duty Car Jack", price: 180000, image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400", description: "Jeki ya Gari (Heavy Duty Car Jack)" },
  { name: "LED Headlight Bulbs", price: 120000, image: "https://images.unsplash.com/photo-1506509635032-9cb773bc635d?w=400", description: "Taa za LED za Gari (LED Headlight Bulbs)" },
  { name: "Portable Car Vacuum", price: 110000, image: "https://images.unsplash.com/photo-1588612455502-39c279c09ce8?w=400", description: "Mashine ya Kusafisha Gari (Portable Car Vacuum)" },
  { name: "Touchscreen Car Stereo", price: 380000, image: "https://images.unsplash.com/photo-1544390559-6720fc04bf6f?w=400", description: "Redio ya Gari ya Touch (Touchscreen Car Stereo)" },
  { name: "Car GPS Tracker", price: 150000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", description: "Kifaa cha Kufuatilia Gari (Car GPS Tracker)" },
  { name: "Car Air Purifier", price: 105000, image: "https://images.unsplash.com/photo-1600868159186-b4b6009efb4b?w=400", description: "Kisafisha Hewa cha Gari (Car Air Purifier)" },
  { name: "Ceramic Brake Pads", price: 210000, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400", description: "Pedi za Breki (Ceramic Brake Pads)" },
  { name: "All-Weather Car Mats", price: 160000, image: "https://images.unsplash.com/photo-1605335525997-6c2e37989914?w=400", description: "Mati za Gari (All-Weather Car Mats)" },
  { name: "Portable Tire Inflator", price: 135000, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400", description: "Pampu ya Kujazia Upepo (Portable Tire Inflator)" },
  { name: "Car Polish Kit", price: 115000, image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400", description: "Dawa ya Kung'arisha Gari (Car Polish Kit)" }
];`;
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, carProducts);

// 3. Page 3: Clothes & Shoes (Nguo na Viatu) - 100k to 500k
const clothesProducts = `export const masterClothingProducts: ProductTemplate[] = [];

export const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Designer Men's Suit", price: 450000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", description: "Suti ya Kiume (Designer Men's Suit)" },
  { name: "Elegant Evening Dress", price: 320000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", description: "Gauni la Jioni (Elegant Evening Dress)" },
  { name: "Genuine Leather Boots", price: 280000, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400", description: "Buti za Ngozi (Genuine Leather Boots)" },
  { name: "Premium Denim Jacket", price: 150000, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400", description: "Jacket la Jeans (Premium Denim Jacket)" },
  { name: "Sports Running Shoes", price: 180000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Raba za Mazoezi (Sports Running Shoes)" },
  { name: "Classic Trench Coat", price: 350000, image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=400", description: "Koti refu la Baridi (Classic Trench Coat)" },
  { name: "Designer Handbag", price: 420000, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400", description: "Mkoba wa Kina Mama (Designer Handbag)" },
  { name: "Formal Oxford Shoes", price: 210000, image: "https://images.unsplash.com/photo-1614252339460-5f0412e84c31?w=400", description: "Viatu vya Ofisini (Formal Oxford Shoes)" },
  { name: "Luxury Silk Blouse", price: 130000, image: "https://images.unsplash.com/photo-1564257631407-4deec8caa40d?w=400", description: "Blauzi ya Hariri (Luxury Silk Blouse)" },
  { name: "Winter Puffer Jacket", price: 250000, image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=400", description: "Jacket la Baridi (Winter Puffer Jacket)" },
  { name: "Leather Belt & Wallet", price: 110000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400", description: "Mkanda na Pochi (Leather Belt & Wallet)" },
  { name: "Women's High Heels", price: 190000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", description: "Viatu vya Mchuchumio (Women's High Heels)" }
];`;
content = content.replace(/export const masterClothingProducts: ProductTemplate\[\] = \[[\s\S]*?\];\n\nexport const masterIndustrialProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, clothesProducts);

// 4. Update Procedural Generators to align with the new themes just in case they trigger
const procBases = `const homeBases = ["Lipstick Set", "Makeup Kit", "Skin Serum", "Hair Dryer", "Nail Kit", "Facial Mask"];
const techBases = ["Car Stereo", "Dash Cam", "Seat Covers", "Car Vacuum", "Tire Inflator", "Car Jack"];
const industrialBases = ["Designer Suit", "Leather Boots", "Trench Coat", "Running Shoes", "Evening Dress", "Handbag"];`;
content = content.replace(/const homeBases = \[[\s\S]*?\];\nconst techBases = \[[\s\S]*?\];\nconst industrialBases = \[[\s\S]*?\];/, procBases);


// 5. Update Swahili Comments to reflect the new diversity (Urembo, Magari, Nguo)
const mixComments = `export const rawSwahiliComments: { text: string; replies: { name: string; text: string; time: string }[] }[] = [
  {
    text: "Mteja wa leo asubuhi amenunua bidhaa za urembo, nilimwelekeza vizuri akafurahi sana! 💄",
    replies: [
      { name: "Msimamizi", text: "Kazi nzuri sana, urembo unalipa!", time: "Dakika 2 zilizopita" }
    ]
  },
  {
    text: "Oda ya vifaa vya gari leo ilikuwa kubwa (Tsh 380,000), mteja amethibitisha na amelipia. 🚗",
    replies: []
  },
  {
    text: "Kwenye nguo, suti za kiume zinatoka vizuri. Nimeuza mbili leo. 👔",
    replies: [
      { name: "Fatou M.", text: "Kweli kabisa, watu wanapenda suti zetu.", time: "Dakika 4 zilizopita" }
    ]
  },
  {
    text: "Mascara na lipsticks ndio zimeongoza sana kwa mauzo asubuhi hii.",
    replies: []
  },
  {
    text: "Seat covers za magari zinaleta kamisheni nzuri sana.",
    replies: []
  },
  {
    text: "Wateja wanaulizia sana kuhusu viatu vya mchuchumio (high heels). Oda za viatu zinatoka sana 👠",
    replies: []
  },
  {
    text: "Mteja aliuliza kuhusu Dash Cam ya gari inavyofanya kazi, nikampa maelezo kamili na akathibitisha.",
    replies: [
      { name: "Msimamizi", text: "Maelezo sahihi yanasaidia sana mteja kuridhika. 💡", time: "Dakika 10 zilizopita" }
    ]
  },
  {
    text: "Nilipata oda ya jacket la baridi, mteja anaisubiria kwa hamu.",
    replies: []
  },
  {
    text: "Kiasi cha kamisheni kwenye bidhaa za magari ni kikubwa mno, inanipa motisha.",
    replies: [
      { name: "Kofi A.", text: "Umeona eeh! Bidhaa za magari zina thamani kubwa.", time: "Dakika 5 zilizopita" }
    ]
  },
  {
    text: "Siri ni kufuata maelekezo ya kila oda. Urembo, Magari au Nguo, yote yanalipa vizuri.",
    replies: []
  },
  {
    text: "Imekuwa siku ya baraka kwangu, nimepata oda ya seti nzima ya makeup na raba za mazoezi. 🎉",
    replies: []
  },
  {
    text: "Kuwasiliana na wateja na kuwahakikishia usalama wa bidhaa zetu kunajenga uaminifu mkubwa.",
    replies: []
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    text: \`Leo nimepokea oda \${i+5} mfululizo za bidhaa mbalimbali na kuthibitisha haraka! Hakuna kupoteza muda.\`,
    replies: []
  }))
];`;
content = content.replace(/export const rawSwahiliComments: \{ text: string; replies: \{ name: string; text: string; time: string \}.*?\];/s, mixComments);

// 6. Force Cache Clear with new Version tag
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v26_mixed_pages_strict"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated ALL 3 pages distinctively.");
