const fs = require('fs');

const items = [
  { n: "Baraka Mwakipesile", g: "male", c: "Tanzania", f: "🇹🇿", ci: "Dar es Salaam" },
  { n: "Neema Shirima", g: "female", c: "Tanzania", f: "🇹🇿", ci: "Arusha" },
  { n: "Juma Jux", g: "male", c: "Tanzania", f: "🇹🇿", ci: "Mwanza" },
  { n: "Asha Salum", g: "female", c: "Tanzania", f: "🇹🇿", ci: "Dodoma" },
  { n: "Emmanuel Msuya", g: "male", c: "Tanzania", f: "🇹🇿", ci: "Moshi" },
  { n: "Omondi Kariuki", g: "male", c: "Kenya", f: "🇰🇪", ci: "Nairobi" },
  { n: "Wanjiku Mutua", g: "female", c: "Kenya", f: "🇰🇪", ci: "Mombasa" },
  { n: "Kamau Njoroge", g: "male", c: "Kenya", f: "🇰🇪", ci: "Nakuru" },
  { n: "Njeri Kimani", g: "female", c: "Kenya", f: "🇰🇪", ci: "Kisumu" },
  { n: "Kelvin Kipchoge", g: "male", c: "Kenya", f: "🇰🇪", ci: "Eldoret" },
  { n: "Kato Ssentongo", g: "male", c: "Uganda", f: "🇺🇬", ci: "Kampala" },
  { n: "Nakato Mukasa", g: "female", c: "Uganda", f: "🇺🇬", ci: "Entebbe" },
  { n: "Kizito Lule", g: "male", c: "Uganda", f: "🇺🇬", ci: "Jinja" },
  { n: "Namaganda Kintu", g: "female", c: "Uganda", f: "🇺🇬", ci: "Mbarara" },
  { n: "Tresor Lumumba", g: "male", c: "DR Congo", f: "🇨🇩", ci: "Kinshasa" },
  { n: "Chantal Kabila", g: "female", c: "DR Congo", f: "🇨🇩", ci: "Lubumbashi" },
  { n: "Fabrice Tshisekedi", g: "male", c: "DR Congo", f: "🇨🇩", ci: "Goma" },
  { n: "Bosco Ntaganda", g: "male", c: "Rwanda", f: "🇷🇼", ci: "Kigali" },
  { n: "Angelique Uwimana", g: "female", c: "Rwanda", f: "🇷🇼", ci: "Butare" },
  { n: "Didier Kagame", g: "male", c: "Rwanda", f: "🇷🇼", ci: "Gisenyi" },
  { n: "Jean-Claude Nkurunziza", g: "male", c: "Burundi", f: "🇧🇮", ci: "Bujumbura" },
  { n: "Francine Niyonsaba", g: "female", c: "Burundi", f: "🇧🇮", ci: "Gitega" },
  { n: "Mulenga Banda", g: "male", c: "Zambia", f: "🇿🇲", ci: "Lusaka" },
  { n: "Mwape Phiri", g: "female", c: "Zambia", f: "🇿🇲", ci: "Ndola" },
  { n: "Kondwani Mhone", g: "male", c: "Malawi", f: "🇲🇼", ci: "Lilongwe" },
  { n: "Chisomo Phiri", g: "female", c: "Malawi", f: "🇲🇼", ci: "Blantyre" },
  { n: "Chukwudi Eze", g: "male", c: "Nigeria", f: "🇳🇬", ci: "Lagos" },
  { n: "Ngozi Okafor", g: "female", c: "Nigeria", f: "🇳🇬", ci: "Abuja" },
  { n: "Siyabonga Dlamini", g: "male", c: "South Africa", f: "🇿🇦", ci: "Johannesburg" },
  { n: "Thandeka Zuma", g: "female", c: "South Africa", f: "🇿🇦", ci: "Cape Town" },
  { n: "Michael Smith", g: "male", c: "USA", f: "🇺🇸", ci: "New York" },
  { n: "Sarah Johnson", g: "female", c: "USA", f: "🇺🇸", ci: "Los Angeles" },
  { n: "James Williams", g: "male", c: "UK", f: "🇬🇧", ci: "London" },
  { n: "Emily Brown", g: "female", c: "UK", f: "🇬🇧", ci: "Manchester" },
  { n: "Ahmed Al-Maktoum", g: "male", c: "UAE", f: "🇦🇪", ci: "Dubai" },
  { n: "Fatima Al-Sayed", g: "female", c: "UAE", f: "🇦🇪", ci: "Abu Dhabi" }
];

const products = [
  { p: "Samsung Galaxy A14", v: 280000, img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80" },
  { p: "Sony Wireless Headphones", v: 150000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
  { p: "Apple Watch Series 3", v: 290000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
  { p: "Lenovo Ideapad (Used)", v: 299000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" },
  { p: "Canon Digital Camera", v: 250000, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
  { p: "Nike Air Max Sneakers", v: 120000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { p: "Dior Sauvage Perfume", v: 180000, img: "https://images.unsplash.com/photo-1523293115678-d2900f52f461?w=500&q=80" },
  { p: "Ray-Ban Aviator Glasses", v: 130000, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80" },
  { p: "JBL Bluetooth Speaker", v: 110000, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80" },
  { p: "Amazon Fire Tablet", v: 170000, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80" },
  { p: "DJI Mini Drone", v: 275000, img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&q=80" },
  { p: "PS4 Controller", v: 105000, img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80" },
  { p: "Studio Microphone", v: 220000, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80" },
  { p: "Smart Blender", v: 145000, img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80" },
  { p: "Coffee Maker", v: 260000, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80" },
  { p: "Tecno Spark 10", v: 240000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" },
  { p: "Mechanical Keyboard", v: 115000, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },
  { p: "Wireless Mouse", v: 100000, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80" },
  { p: "Security Camera", v: 135000, img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80" },
  { p: "AirPods Pro", v: 295000, img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80" },
  { p: "Gucci Leather Wallet", v: 125000, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80" },
  { p: "Casio G-Shock Watch", v: 160000, img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80" },
  { p: "Adidas Running Shoes", v: 140000, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&q=80" },
  { p: "MacBook Pro Charger", v: 110000, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80" },
  { p: "Nintendo Switch Lite", v: 295000, img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80" },
  { p: "Polaroid Instant Camera", v: 180000, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80" },
  { p: "Portable Power Bank", v: 100000, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" },
  { p: "Smart Watch Tracker", v: 105000, img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=500&q=80" },
  { p: "Noise Cancelling Earbuds", v: 195000, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80" },
  { p: "External Hard Drive 1TB", v: 165000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80" },
  { p: "Kindle Paperwhite", v: 245000, img: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500&q=80" },
  { p: "Electric Toothbrush", v: 135000, img: "https://images.unsplash.com/photo-1559670648-fb7bcce3b2c2?w=500&q=80" },
  { p: "VR Headset", v: 280000, img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=80" },
  { p: "Digital Photo Frame", v: 150000, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80" },
  { p: "Wireless Charging Pad", v: 100000, img: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500&q=80" },
  { p: "Premium Leather Bag", v: 220000, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80" }
];

let mCount = 1;
let fCount = 1;

let newBaseOrderData = "const baseOrderData = [\n";
for (let i = 0; i < 36; i++) {
  const p = items[i];
  const prod = products[i];
  const payout = prod.v * 0.05;
  
  let avatar;
  if (p.g === "male") {
    avatar = `https://randomuser.me/api/portraits/men/${mCount}.jpg`;
    mCount++;
  } else {
    avatar = `https://randomuser.me/api/portraits/women/${fCount}.jpg`;
    fCount++;
  }

  newBaseOrderData += `  {
    id: ${i + 1},
    name: "${p.n}",
    gender: "${p.g}",
    country: "${p.c}",
    flag: "${p.f}",
    city: "${p.ci}",
    product: "${prod.p}",
    productValue: ${prod.v},
    payout: ${payout},
    avatar: "${avatar}",
    productImage: "${prod.img}"
  }`;
  if (i < 35) newBaseOrderData += ",\n";
  else newBaseOrderData += "\n];";
}

let code = fs.readFileSync('src/data.ts', 'utf8');

// Replace the array
const startIdx = code.indexOf('const baseOrderData = [');
const endIdx = code.indexOf('];', startIdx) + 2;
code = code.substring(0, startIdx) + newBaseOrderData + code.substring(endIdx);

// Force epoch refresh so users see it immediately
code = code.replace(/let s = epoch \* \d+ \+ \d+;/, 'let s = epoch * 1111 + 2222;');

fs.writeFileSync('src/data.ts', code);
console.log('Replaced baseOrderData entirely.');
