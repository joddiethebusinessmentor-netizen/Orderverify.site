const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace masterHomeProducts
const agriProducts = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Mbolea ya DAP (Mifuko 5)", price: 450000, image: "https://images.unsplash.com/photo-1627920769840-67503cb37719?w=400", description: "Mbolea ya DAP (Mifuko 5)" },
  { name: "Mashine ya Kumwagilia (Water Pump)", price: 550000, image: "https://images.unsplash.com/photo-1601566868615-1a859e951752?w=400", description: "Mashine ya Kumwagilia (Water Pump)" },
  { name: "Mbegu za Mahindi Chotara (Kilo 50)", price: 250000, image: "https://images.unsplash.com/photo-1551722652-3d75c58b4563?w=400", description: "Mbegu za Mahindi Chotara (Kilo 50)" },
  { name: "Pampu ya Kunyunyizia Dawa (Pcs 3)", price: 210000, image: "https://images.unsplash.com/photo-1592881177699-528574a480ec?w=400", description: "Pampu ya Kunyunyizia Dawa (Pcs 3)" },
  { name: "Chakula cha Kuku (Mifuko 10)", price: 350000, image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400", description: "Chakula cha Kuku (Mifuko 10)" },
  { name: "Mbegu za Alizeti (Kilo 20)", price: 280000, image: "https://images.unsplash.com/photo-1594411139783-0943eb91f5a5?w=400", description: "Mbegu za Alizeti (Kilo 20)" },
  { name: "Turubai Kubwa la Kukaushia", price: 220000, image: "https://images.unsplash.com/photo-1587396791007-063f2518e3ec?w=400", description: "Turubai Kubwa la Kukaushia" },
  { name: "Mashine Ndogo ya Kukatia Majani", price: 580000, image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c6d98?w=400", description: "Mashine Ndogo ya Kukatia Majani" },
  { name: "Mifuko ya Kuhifadhia Nafaka (Pcs 50)", price: 300000, image: "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1c?w=400", description: "Mifuko ya Kuhifadhia Nafaka (Pcs 50)" },
  { name: "Dawa za Kuua Magugu (Lita 20)", price: 240000, image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=400", description: "Dawa za Kuua Magugu (Lita 20)" },
  { name: "Seti ya Vifaa Vya Kupalilia", price: 320000, image: "https://images.unsplash.com/photo-1589886737380-0be1b635c9ad?w=400", description: "Seti ya Vifaa Vya Kupalilia" },
  { name: "Mbolea ya Kukuzia UREA (Mifuko 4)", price: 400000, image: "https://images.unsplash.com/photo-1599827552599-2f3609cbdeec?w=400", description: "Mbolea ya Kukuzia UREA (Mifuko 4)" }
];`;

content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, agriProducts);

// Add Congo (DRC) to RAW_FIRST_NAMES_DB if not exists
if (!content.includes('"Congo (DRC)"')) {
  const cdbStr = `  { first: "Tresor", gender: "male", country: "Congo (DRC)", flag: "🇨🇩", city: "Kinshasa" },
  { first: "Chantal", gender: "female", country: "Congo (DRC)", flag: "🇨🇩", city: "Lubumbashi" },
  { first: "Fiston", gender: "male", country: "Congo (DRC)", flag: "🇨🇩", city: "Goma" },
  { first: "Koffi", gender: "male", country: "Congo (DRC)", flag: "🇨🇩", city: "Boma" },
  { first: "Salif", gender: "male", country: "Mali", flag: "🇲🇱", city: "Bamako" },`;
  content = content.replace(/const RAW_FIRST_NAMES_DB[^\[]+\[/, "const RAW_FIRST_NAMES_DB: { first: string; gender: \"male\" | \"female\"; country: string; flag: string; city: string }[] = [\n" + cdbStr);
}

// Add Congo (DRC) to SURNAME_MAP
if (!content.includes('"Congo (DRC)":')) {
  content = content.replace(/"Tanzania":/, '"Congo (DRC)": ["Mwamba", "Mutombo", "Kabila", "Tshisekedi", "Lukaku", "Bolasie"],\n  "Tanzania":');
}

// Update targetCountryList for the first page
const newCountryList = `const targetCountryList: string[] = [
    "Congo (DRC)", "Tanzania", "Kenya", "Uganda", "Congo (DRC)", "Rwanda", "Congo (DRC)", "Burundi", "Tanzania", "Zambia", "Congo (DRC)", "Malawi",
    "Nigeria", "Kenya", "Uganda", "Rwanda", "South Africa", "Zambia", "Malawi", "Angola", "Namibia", "Algeria", "Tunisia", "Sudan",
    "Somalia", "Liberia", "Sierra Leone", "Togo", "Benin", "Guinea", "Burkina Faso", "Niger", "Chad", "Burundi", "Lesotho", "Eswatini"
  ];`;
content = content.replace(/const targetCountryList: string\[\] = \[[\s\S]*?\];/, newCountryList);

// Refresh version to force updates
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v42_agriculture_congo"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated products, countries, and names.");
