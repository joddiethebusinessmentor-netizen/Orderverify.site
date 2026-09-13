const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Update Prices to 100k - 500k for masterHomeProducts
const beauty1 = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Matte Lipstick Pro Set", price: 120000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "Matte Lipstick Pro Set" },
  { name: "Liquid Foundation Premium", price: 150000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Liquid Foundation Premium" },
  { name: "Volumizing Mascara Max", price: 110000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", description: "Volumizing Mascara Max" },
  { name: "Eyeshadow Palette Master", price: 180000, image: "https://images.unsplash.com/photo-1512496015851-a9089912068e?w=400", description: "Eyeshadow Palette Master" },
  { name: "Makeup Brush Set Luxe", price: 135000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Makeup Brush Set Luxe" },
  { name: "Liquid Eyeliner Precision", price: 105000, image: "https://images.unsplash.com/photo-1519414442781-abc8f8c85eb2?w=400", description: "Liquid Eyeliner Precision" },
  { name: "Luxury Perfume Gold", price: 350000, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400", description: "Luxury Perfume Gold" },
  { name: "Vitamin C Face Serum 50ml", price: 160000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Vitamin C Face Serum 50ml" },
  { name: "Hydrating Moisturizer Ultra", price: 145000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Hydrating Moisturizer Ultra" },
  { name: "Hair Straightener Ceramic", price: 250000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Hair Straightener Ceramic" },
  { name: "Nail Polish Collection Pro", price: 115000, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400", description: "Nail Polish Collection Pro" },
  { name: "Makeup Setting Spray HD", price: 125000, image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400", description: "Makeup Setting Spray HD" }
];`;
content = content.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty1);

// 2. Update Prices to 100k - 500k for masterTechProducts
const beauty2 = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Rose Blush Palette", price: 130000, image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400", description: "Rose Blush Palette" },
  { name: "Sun-Kissed Bronzer Set", price: 140000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", description: "Sun-Kissed Bronzer Set" },
  { name: "High-Shine Lip Gloss Pack", price: 110000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "High-Shine Lip Gloss Pack" },
  { name: "Full Coverage Concealer Kit", price: 155000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Full Coverage Concealer Kit" },
  { name: "Premium Face Wash Combo", price: 105000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Premium Face Wash Combo" },
  { name: "Shea Body Lotion Large", price: 115000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Shea Body Lotion Large" },
  { name: "Argan Hair Oil Set", price: 125000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Argan Hair Oil Set" },
  { name: "SPF 50 Sunscreen Bundle", price: 135000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "SPF 50 Sunscreen Bundle" },
  { name: "Liquid Highlighter Set", price: 145000, image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400", description: "Liquid Highlighter Set" },
  { name: "Clay Face Mask Pack", price: 120000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Clay Face Mask Pack" },
  { name: "Eyebrow Pencil Collection", price: 100500, image: "https://images.unsplash.com/photo-1519414442781-abc8f8c85eb2?w=400", description: "Eyebrow Pencil Collection" },
  { name: "Beauty Sponge Master Set", price: 100000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Beauty Sponge Master Set" }
];`;
content = content.replace(/export const masterTechProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty2);

// 3. Update Prices to 100k - 500k for masterIndustrialProducts
const beauty3 = `export const masterClothingProducts: ProductTemplate[] = [];

export const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Micellar Water Bundle", price: 110000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Micellar Water Bundle" },
  { name: "Rose Water Toner Set", price: 105000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Rose Water Toner Set" },
  { name: "Advanced Night Cream", price: 170000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Advanced Night Cream" },
  { name: "Under Eye Cream Treatment", price: 130000, image: "https://images.unsplash.com/photo-1611078487771-419b48b11116?w=400", description: "Under Eye Cream Treatment" },
  { name: "Tinted Lip Balm Collection", price: 100000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", description: "Tinted Lip Balm Collection" },
  { name: "Ionic Hair Dryer Pro", price: 280000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Ionic Hair Dryer Pro" },
  { name: "Curling Wand Pro", price: 210000, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400", description: "Curling Wand Pro" },
  { name: "Facial Roller Master Set", price: 125000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Facial Roller Master Set" },
  { name: "Luxury Bath Bomb Set", price: 115000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Luxury Bath Bomb Set" },
  { name: "Massage Body Oil Kit", price: 140000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Massage Body Oil Kit" },
  { name: "Teeth Whitening Kit Pro", price: 190000, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400", description: "Teeth Whitening Kit Pro" },
  { name: "Acrylic Makeup Organizer", price: 160000, image: "https://images.unsplash.com/photo-1592657788481-678c42b012eb?w=400", description: "Acrylic Makeup Organizer" }
];`;
content = content.replace(/export const masterClothingProducts: ProductTemplate\[\] = \[[\s\S]*?\];\n\nexport const masterIndustrialProducts: ProductTemplate\[\] = \[[\s\S]*?\];/, beauty3);


// 4. Update RAW_FIRST_NAMES_DB with exactly 36 distinct countries (72 entries: 1 male, 1 female per country)
const newNamesDB = `const RAW_FIRST_NAMES_DB: { first: string; gender: "male" | "female"; country: string; flag: string; city: string }[] = [
  { first: "Kwame", gender: "male", country: "Ghana", flag: "🇬🇭", city: "Accra" },
  { first: "Abena", gender: "female", country: "Ghana", flag: "🇬🇭", city: "Kumasi" },
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
  { first: "Oumou", gender: "female", country: "Mali", flag: "🇲🇱", city: "Sikasso" },
  { first: "Chuka", gender: "male", country: "Nigeria", flag: "🇳🇬", city: "Lagos" },
  { first: "Ngozi", gender: "female", country: "Nigeria", flag: "🇳🇬", city: "Abuja" },
  { first: "Mwangi", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Nairobi" },
  { first: "Njeri", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Mombasa" },
  { first: "Kato", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Kampala" },
  { first: "Babirye", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Entebbe" },
  { first: "Bosco", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Kigali" },
  { first: "Chantal", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Butare" },
  { first: "Sipho", gender: "male", country: "South Africa", flag: "🇿🇦", city: "Johannesburg" },
  { first: "Thandi", gender: "female", country: "South Africa", flag: "🇿🇦", city: "Cape Town" },
  { first: "Mulenga", gender: "male", country: "Zambia", flag: "🇿🇲", city: "Lusaka" },
  { first: "Mutale", gender: "female", country: "Zambia", flag: "🇿🇲", city: "Ndola" },
  { first: "Yamikani", gender: "male", country: "Malawi", flag: "🇲🇼", city: "Lilongwe" },
  { first: "Chisomo", gender: "female", country: "Malawi", flag: "🇲🇼", city: "Blantyre" },
  { first: "Jose", gender: "male", country: "Angola", flag: "🇦🇴", city: "Luanda" },
  { first: "Ana", gender: "female", country: "Angola", flag: "🇦🇴", city: "Huambo" },
  { first: "Johannes", gender: "male", country: "Namibia", flag: "🇳🇦", city: "Windhoek" },
  { first: "Ndeshi", gender: "female", country: "Namibia", flag: "🇳🇦", city: "Swakopmund" },
  { first: "Karim", gender: "male", country: "Algeria", flag: "🇩🇿", city: "Algiers" },
  { first: "Farida", gender: "female", country: "Algeria", flag: "🇩🇿", city: "Oran" },
  { first: "Walid", gender: "male", country: "Tunisia", flag: "🇹🇳", city: "Tunis" },
  { first: "Meriem", gender: "female", country: "Tunisia", flag: "🇹🇳", city: "Sousse" },
  { first: "Omer", gender: "male", country: "Sudan", flag: "🇸🇩", city: "Khartoum" },
  { first: "Fatima", gender: "female", country: "Sudan", flag: "🇸🇩", city: "Omdurman" },
  { first: "Abdi", gender: "male", country: "Somalia", flag: "🇸🇴", city: "Mogadishu" },
  { first: "Halima", gender: "female", country: "Somalia", flag: "🇸🇴", city: "Hargeisa" },
  { first: "George", gender: "male", country: "Liberia", flag: "🇱🇷", city: "Monrovia" },
  { first: "Ellen", gender: "female", country: "Liberia", flag: "🇱🇷", city: "Gbarnga" },
  { first: "Julius", gender: "male", country: "Sierra Leone", flag: "🇸🇱", city: "Freetown" },
  { first: "Fatima", gender: "female", country: "Sierra Leone", flag: "🇸🇱", city: "Bo" },
  { first: "Faure", gender: "male", country: "Togo", flag: "🇹🇬", city: "Lomé" },
  { first: "Komi", gender: "female", country: "Togo", flag: "🇹🇬", city: "Sokodé" },
  { first: "Patrice", gender: "male", country: "Benin", flag: "🇧🇯", city: "Porto-Novo" },
  { first: "Angélique", gender: "female", country: "Benin", flag: "🇧🇯", city: "Cotonou" },
  { first: "Alpha", gender: "male", country: "Guinea", flag: "🇬🇳", city: "Conakry" },
  { first: "Binta", gender: "female", country: "Guinea", flag: "🇬🇳", city: "Kankan" },
  { first: "Blaise", gender: "male", country: "Burkina Faso", flag: "🇧🇫", city: "Ouagadougou" },
  { first: "Awa", gender: "female", country: "Burkina Faso", flag: "🇧🇫", city: "Bobo-Dioulasso" },
  { first: "Mahamadou", gender: "male", country: "Niger", flag: "🇳🇪", city: "Niamey" },
  { first: "Aicha", gender: "female", country: "Niger", flag: "🇳🇪", city: "Zinder" },
  { first: "Idriss", gender: "male", country: "Chad", flag: "🇹🇩", city: "N'Djamena" },
  { first: "Hinda", gender: "female", country: "Chad", flag: "🇹🇩", city: "Moundou" },
  { first: "Pierre", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Bujumbura" },
  { first: "Francine", gender: "female", country: "Burundi", flag: "🇧🇮", city: "Gitega" },
  { first: "Letsie", gender: "male", country: "Lesotho", flag: "🇱🇸", city: "Maseru" },
  { first: "Masenate", gender: "female", country: "Lesotho", flag: "🇱🇸", city: "Leribe" },
  { first: "Mswati", gender: "male", country: "Eswatini", flag: "🇸🇿", city: "Mbabane" },
  { first: "Sibonelo", gender: "female", country: "Eswatini", flag: "🇸🇿", city: "Manzini" }
];`;
content = content.replace(/const RAW_FIRST_NAMES_DB: \{ first: string; gender: "male" \| "female"; country: string; flag: string; city: string \}\[\] = \[[\s\S]*?\];/s, newNamesDB);

// 5. Update SURNAME_MAP
const newSurnames = `const SURNAME_MAP: Record<string, string[]> = {
  "Ghana": ["Mensah", "Osei"],
  "Senegal": ["Ndiaye", "Diop"],
  "Ethiopia": ["Bekele", "Tadesse"],
  "Zimbabwe": ["Moyo", "Sibanda"],
  "Botswana": ["Molefe", "Gaborone"],
  "Mozambique": ["Chissano", "Machel"],
  "Egypt": ["Mahmoud", "Ali"],
  "Morocco": ["Alaoui", "Bennani"],
  "Cameroon": ["Biya", "Eto'o"],
  "Madagascar": ["Rajoelina", "Ravalomanana"],
  "Ivory Coast": ["Bédié", "Ouattara"],
  "Mali": ["Keïta", "Touré"],
  "Nigeria": ["Okafor", "Adeyemi"],
  "Kenya": ["Karanja", "Kamau"],
  "Uganda": ["Mukasa", "Kigozi"],
  "Rwanda": ["Kagame", "Nizeyimana"],
  "South Africa": ["Mandela", "Zuma"],
  "Zambia": ["Banda", "Mwila"],
  "Malawi": ["Phiri", "Banda"],
  "Angola": ["Dos Santos", "Neto"],
  "Namibia": ["Geingob", "Pohamba"],
  "Algeria": ["Bouteflika", "Mahrez"],
  "Tunisia": ["Trabelsi", "Jaziri"],
  "Sudan": ["Al-Bashir", "Mahdi"],
  "Somalia": ["Farah", "Warsame"],
  "Liberia": ["Weah", "Johnson"],
  "Sierra Leone": ["Bio", "Koroma"],
  "Togo": ["Gnassingbé", "Adebayor"],
  "Benin": ["Talon", "Kidjo"],
  "Guinea": ["Condé", "Camara"],
  "Burkina Faso": ["Compaoré", "Kaboré"],
  "Niger": ["Issoufou", "Tandja"],
  "Chad": ["Déby", "Habré"],
  "Burundi": ["Nkurunziza", "Ndayishimiye"],
  "Lesotho": ["Seeiso", "Thabane"],
  "Eswatini": ["Dlamini", "Zwane"]
};`;
content = content.replace(/const SURNAME_MAP: Record<string, string\[\]> = \{[\s\S]*?\};/s, newSurnames);

// 6. Update targetCountryList inside generateCompliantSystemData
const newCountriesList = `const targetCountryList: string[] = [
    "Ghana", "Senegal", "Ethiopia", "Zimbabwe", "Botswana", "Mozambique", "Egypt", "Morocco", "Cameroon", "Madagascar", "Ivory Coast", "Mali",
    "Nigeria", "Kenya", "Uganda", "Rwanda", "South Africa", "Zambia", "Malawi", "Angola", "Namibia", "Algeria", "Tunisia", "Sudan",
    "Somalia", "Liberia", "Sierra Leone", "Togo", "Benin", "Guinea", "Burkina Faso", "Niger", "Chad", "Burundi", "Lesotho", "Eswatini"
  ];`;
content = content.replace(/const targetCountryList: string\[\] = \[[\s\S]*?\];/s, newCountriesList);

// 7. Change version to bust cache
content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v24_beauty_100k_500k_unique"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated products (100k-500k), 36 unique countries/names properly.");
