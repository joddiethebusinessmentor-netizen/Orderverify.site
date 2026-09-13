const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Replace masterHomeProducts
const beauty1 = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Matte Lipstick Set", price: 85000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "Matte Lipstick Set" },
  { name: "Liquid Foundation", price: 120000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Liquid Foundation" },
  { name: "Volumizing Mascara", price: 45000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", description: "Volumizing Mascara" },
  { name: "Eyeshadow Palette", price: 150000, image: "https://images.unsplash.com/photo-1512496015851-a9089912068e?w=400", description: "Eyeshadow Palette" },
  { name: "Makeup Brush Set", price: 95000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Makeup Brush Set" },
  { name: "Liquid Eyeliner", price: 35000, image: "https://images.unsplash.com/photo-1519414442781-abc8f8c85eb2?w=400", description: "Liquid Eyeliner" },
  { name: "Luxury Perfume", price: 250000, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400", description: "Luxury Perfume" },
  { name: "Vitamin C Face Serum", price: 110000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Vitamin C Face Serum" },
  { name: "Hydrating Moisturizer", price: 80000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Hydrating Moisturizer" },
  { name: "Hair Straightener", price: 180000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Hair Straightener" },
  { name: "Nail Polish Collection", price: 65000, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400", description: "Nail Polish Collection" },
  { name: "Makeup Setting Spray", price: 55000, image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400", description: "Makeup Setting Spray" }
];`;
content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty1);

// 2. Replace masterTechProducts
const beauty2 = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Rose Blush", price: 40000, image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400", description: "Rose Blush" },
  { name: "Sun-Kissed Bronzer", price: 50000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", description: "Sun-Kissed Bronzer" },
  { name: "High-Shine Lip Gloss", price: 30000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "High-Shine Lip Gloss" },
  { name: "Full Coverage Concealer", price: 60000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Full Coverage Concealer" },
  { name: "Gentle Face Wash", price: 45000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Gentle Face Wash" },
  { name: "Shea Body Lotion", price: 75000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Shea Body Lotion" },
  { name: "Argan Hair Oil", price: 55000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Argan Hair Oil" },
  { name: "SPF 50 Sunscreen", price: 85000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "SPF 50 Sunscreen" },
  { name: "Liquid Highlighter", price: 50000, image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400", description: "Liquid Highlighter" },
  { name: "Clay Face Mask", price: 65000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Clay Face Mask" },
  { name: "Eyebrow Pencil", price: 25000, image: "https://images.unsplash.com/photo-1519414442781-abc8f8c85eb2?w=400", description: "Eyebrow Pencil" },
  { name: "Beauty Sponge", price: 20000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Beauty Sponge" }
];`;
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty2);

// 3. Replace masterIndustrialProducts & masterClothingProducts
const beauty3 = `export const masterClothingProducts: ProductTemplate[] = [];\n\nexport const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Micellar Water", price: 40000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Micellar Water" },
  { name: "Rose Water Toner", price: 35000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Rose Water Toner" },
  { name: "Night Cream", price: 130000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Night Cream" },
  { name: "Under Eye Cream", price: 90000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Under Eye Cream" },
  { name: "Tinted Lip Balm", price: 25000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "Tinted Lip Balm" },
  { name: "Ionic Hair Dryer", price: 220000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Ionic Hair Dryer" },
  { name: "Curling Wand", price: 160000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Curling Wand" },
  { name: "Facial Roller Set", price: 55000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Facial Roller Set" },
  { name: "Bath Bomb Set", price: 45000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Bath Bomb Set" },
  { name: "Massage Body Oil", price: 70000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Massage Body Oil" },
  { name: "Teeth Whitening Kit", price: 150000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Teeth Whitening Kit" },
  { name: "Makeup Organizer", price: 85000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Makeup Organizer" }
];`;
content = content.replace(/export const masterClothingProducts: ProductTemplate\[\] = \[[\s\S]*?\];[\s\S]*?export const masterIndustrialProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty3);


// 4. Update Target Countries
const oldCountriesList = `const targetCountryList: string[] = [
    // Page 1 (12 orders)
    "Tanzania", "Kenya", "Uganda", "Rwanda", "Tanzania", "Burundi",
    "DR Congo", "Kenya", "South Africa", "Tanzania", "Nigeria", "UAE",

    // Page 2 (12 orders)
    "Kenya", "Tanzania", "Uganda", "Rwanda", "DR Congo", "Tanzania",
    "Burundi", "Kenya", "South Africa", "Tanzania", "Zambia", "Malawi",

    // Page 3 (12 orders)
    "Tanzania", "Kenya", "Uganda", "DR Congo", "Tanzania", "Rwanda",
    "Nigeria", "Burundi", "South Africa", "Tanzania", "UAE", "Kenya"
  ];`;
const newCountriesList = `const targetCountryList: string[] = [
    "Ghana", "Senegal", "Ethiopia", "Zimbabwe", "Botswana", "Mozambique",
    "Egypt", "Morocco", "Cameroon", "Madagascar", "Ivory Coast", "Mali",
    "Egypt", "Ghana", "Senegal", "Ethiopia", "Zimbabwe", "Botswana",
    "Mozambique", "Morocco", "Cameroon", "Madagascar", "Ivory Coast", "Mali",
    "Ivory Coast", "Mali", "Ghana", "Senegal", "Ethiopia", "Zimbabwe",
    "Botswana", "Mozambique", "Egypt", "Morocco", "Cameroon", "Madagascar"
  ];`;
content = content.replace(oldCountriesList, newCountriesList);

// Update Procedural product generation to use beauty names in case of fallback
const procProducts = `const homeBases = ["Lipstick", "Foundation", "Mascara", "Eyeshadow", "Eyeliner", "Serum"];
const techBases = ["Moisturizer", "Hair Straightener", "Nail Polish", "Setting Spray", "Blush", "Bronzer"];
const industrialBases = ["Lip Gloss", "Concealer", "Face Wash", "Body Lotion", "Hair Oil", "Sunscreen"];`;

content = content.replace(/const homeBases = \[[\s\S]*?\];[\s\S]*?const techBases = \[[\s\S]*?\];[\s\S]*?const industrialBases = \[[\s\S]*?\];/, procProducts);


// Let's check how RAW_FIRST_NAMES_DB is structured. I need to do a regex replace for the entire RAW_FIRST_NAMES_DB array.
const newNamesDB = `const RAW_FIRST_NAMES_DB: { first: string; gender: "male" | "female"; country: string; flag: string; city: string }[] = [
  { first: "Kwame", gender: "male", country: "Ghana", flag: "🇬🇭", city: "Accra" },
  { first: "Abena", gender: "female", country: "Ghana", flag: "🇬🇭", city: "Kumasi" },
  { first: "Kofi", gender: "male", country: "Ghana", flag: "🇬🇭", city: "Tamale" },
  { first: "Amadou", gender: "male", country: "Senegal", flag: "🇸🇳", city: "Dakar" },
  { first: "Fatou", gender: "female", country: "Senegal", flag: "🇸🇳", city: "Thiès" },
  { first: "Abebe", gender: "male", country: "Ethiopia", flag: "🇪🇹", city: "Addis Ababa" },
  { first: "Chala", gender: "male", country: "Ethiopia", flag: "🇪🇹", city: "Dire Dawa" },
  { first: "Tendai", gender: "male", country: "Zimbabwe", flag: "🇿🇼", city: "Harare" },
  { first: "Nyasha", gender: "female", country: "Zimbabwe", flag: "🇿🇼", city: "Bulawayo" },
  { first: "Kagiso", gender: "male", country: "Botswana", flag: "🇧🇼", city: "Gaborone" },
  { first: "Tshepo", gender: "male", country: "Botswana", flag: "🇧🇼", city: "Francistown" },
  { first: "Joao", gender: "male", country: "Mozambique", flag: "🇲🇿", city: "Maputo" },
  { first: "Maria", gender: "female", country: "Mozambique", flag: "🇲🇿", city: "Beira" },
  { first: "Ahmed", gender: "male", country: "Egypt", flag: "🇪🇬", city: "Cairo" },
  { first: "Nour", gender: "female", country: "Egypt", flag: "🇪🇬", city: "Alexandria" },
  { first: "Youssef", gender: "male", country: "Morocco", flag: "🇲🇦", city: "Casablanca" },
  { first: "Amina", gender: "female", country: "Morocco", flag: "🇲🇦", city: "Rabat" },
  { first: "Alain", gender: "male", country: "Cameroon", flag: "🇨🇲", city: "Yaoundé" },
  { first: "Marie", gender: "female", country: "Cameroon", flag: "🇨🇲", city: "Douala" },
  { first: "Andry", gender: "male", country: "Madagascar", flag: "🇲🇬", city: "Antananarivo" },
  { first: "Nirina", gender: "female", country: "Madagascar", flag: "🇲🇬", city: "Toamasina" },
  { first: "Kouassi", gender: "male", country: "Ivory Coast", flag: "🇨🇮", city: "Abidjan" },
  { first: "Aya", gender: "female", country: "Ivory Coast", flag: "🇨🇮", city: "Bouaké" },
  { first: "Moussa", gender: "male", country: "Mali", flag: "🇲🇱", city: "Bamako" },
  { first: "Oumou", gender: "female", country: "Mali", flag: "🇲🇱", city: "Sikasso" }
];`;
// Since the RAW_FIRST_NAMES_DB array is very long in data.ts, we need to match it up to its end.
content = content.replace(/const RAW_FIRST_NAMES_DB: \{ first: string; gender: "male" \| "female"; country: string; flag: string; city: string \}.*?\];/s, newNamesDB);

// Replace comments
const newComments = `export const rawSwahiliComments: { text: string; replies: { name: string; text: string; time: string }[] }[] = [
  {
    text: "Bidhaa hizi za urembo zinavutia sana, mteja wangu alifurahi nilipomthibitishia oda yake leo! 💄",
    replies: [
      { name: "Msimamizi", text: "Asante kwa kazi nzuri! Wateja wanapenda bidhaa zenye ubora.", time: "Dakika 2 zilizopita" }
    ]
  },
  {
    text: "Oda za vipodozi zimekuwa nyingi sana, inaonyesha wateja wana imani na ubora wa hizi bidhaa.",
    replies: []
  },
  {
    text: "Nilipompigia mteja kumthibitishia oda ya perfume, alisema hawezi kusubiri mzigo ufike. Kazi safi! ✨",
    replies: [
      { name: "Fatou M.", text: "Kweli kabisa, perfume zetu zina harufu nzuri mno.", time: "Dakika 4 zilizopita" }
    ]
  },
  {
    text: "Siri ya hii kazi ni kujibu kwa upole. Mteja aliuliza kuhusu foundation kama inaendana na rangi yake, nikamwelekeza vizuri.",
    replies: []
  },
  {
    text: "Mascara na lipsticks ndio zimeongoza sana kwa mauzo asubuhi hii. Nimepata faida nzuri! 💅",
    replies: []
  },
  {
    text: "Nilianza juzi na tayari nimethibitisha oda tatu za urembo. Kazi ni rahisi kama unafuata maelekezo.",
    replies: []
  },
  {
    text: "Je mteja akitaka kubadilisha rangi ya eyeshadow kabla mzigo haujatoka inakuwaje?",
    replies: [
      { name: "Msimamizi", text: "Kama mzigo haujasafirishwa unaweza kumwelekeza a-edit oda kwenye mfumo. 💡", time: "Dakika 10 zilizopita" }
    ]
  },
  {
    text: "Nilipata oda ya mashine ya kunyooshea nywele, mteja anaisubiria kwa hamu.",
    replies: []
  },
  {
    text: "Wow! Kiasi cha kamisheni kwenye hizi bidhaa za urembo ni nzuri mno, inanipa motisha sana kufanya kazi kwa bidii.",
    replies: [
      { name: "Kofi A.", text: "Umeona eeh! Bidhaa zinauzika sana na wateja wengi hawarudi nyuma.", time: "Dakika 5 zilizopita" }
    ]
  },
  {
    text: "Uthibitishaji unakwenda vizuri. Wateja wetu wanafurahia kupata bidhaa halisi za skincare.",
    replies: []
  },
  {
    text: "Imekuwa siku ya baraka kwangu, nimepata oda ya seti nzima ya makeup. 🎉",
    replies: []
  },
  {
    text: "Kuwasiliana na wateja na kuwahakikishia usalama wa ngozi zao kwa hizi lotions kunajenga uaminifu mkubwa.",
    replies: []
  },
  // Ensure we have at least 35 elements for the loop in data.ts.
  // We'll repeat some base structures for the rest.
  ...Array.from({ length: 25 }, (_, i) => ({
    text: \`Kweli biashara ya urembo inalipa sana. Leo nimepokea oda \${i+5} mfululizo na kuthibitisha haraka!\`,
    replies: []
  }))
];`;
content = content.replace(/export const rawSwahiliComments: \{ text: string; replies: \{ name: string; text: string; time: string \}.*?\];/s, newComments);

// Force regeneration of version tag to clear localStorage caches in user browser
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v22_beauty_only"');

fs.writeFileSync('src/data.ts', content);
console.log("data.ts has been updated successfully.");
