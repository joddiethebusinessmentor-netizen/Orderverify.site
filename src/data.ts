
// Rates and currency formatting for all represented countries
export const countryRates: Record<string, { curr: string; rate: number }> = {
  "Tanzania": { curr: "TZS", rate: 1 },
  "Kenya": { curr: "KES", rate: 0.05 },
  "Uganda": { curr: "UGX", rate: 1.45 },
  "Rwanda": { curr: "RWF", rate: 0.5 },
  "Burundi": { curr: "BIF", rate: 1.1 },
  "DR Congo": { curr: "CDF", rate: 1.15 },
  "South Africa": { curr: "ZAR", rate: 0.007 },
  "UK": { curr: "GBP", rate: 0.0003 },
  "UAE": { curr: "AED", rate: 0.0014 },
  "Germany": { curr: "EUR", rate: 0.00035 },
  "France": { curr: "EUR", rate: 0.00035 },
  "Saudi Arabia": { curr: "SAR", rate: 0.0014 },
  "USA": { curr: "USD", rate: 0.00038 },
  "China": { curr: "CNY", rate: 0.0027 },
  "Japan": { curr: "JPY", rate: 0.057 },
  "India": { curr: "INR", rate: 0.032 },
  "Brazil": { curr: "BRL", rate: 0.0019 }
};

export const formatLocalCurrency = (tzsAmount: number, countryName: string) => {
  const config = countryRates[countryName] || { curr: "TZS", rate: 1 };
  const localAmount = tzsAmount * config.rate;
  if (["USD", "GBP", "AED", "EUR"].includes(config.curr)) {
    return `${config.curr} ${localAmount.toFixed(2)}`;
  }
  return `${config.curr} ${Math.round(localAmount).toLocaleString()}`;
};

// 36 Customer Orders:
// 1. Countries are strictly interleaved so NO two consecutive orders share the same country.
// 2. All 36 customer names are 100% unique and DO NOT appear in live notifications or comments.
// 3. Every avatar image URL is completely unique, matched to country & gender.
const baseOrderData = [
  {
    id: 1,
    name: "Baraka Mwakipesile",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    product: "Samsung Galaxy A14",
    productValue: 280000,
    payout: 14000,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    productImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80"
  },
  {
    id: 2,
    name: "Neema Shirima",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Arusha",
    product: "Sony Wireless Headphones",
    productValue: 150000,
    payout: 7500,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  },
  {
    id: 3,
    name: "Juma Jux",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mwanza",
    product: "Apple Watch Series 3",
    productValue: 290000,
    payout: 14500,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
  },
  {
    id: 4,
    name: "Asha Salum",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "Lenovo Ideapad (Used)",
    productValue: 299000,
    payout: 14950,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"
  },
  {
    id: 5,
    name: "Emmanuel Msuya",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Moshi",
    product: "Canon Digital Camera",
    productValue: 250000,
    payout: 12500,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    productImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"
  },
  {
    id: 6,
    name: "Omondi Kariuki",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Nike Air Max Sneakers",
    productValue: 120000,
    payout: 6000,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
  },
  {
    id: 7,
    name: "Wanjiku Mutua",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Mombasa",
    product: "Dior Sauvage Perfume",
    productValue: 180000,
    payout: 9000,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    productImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80"
  },
  {
    id: 8,
    name: "Kamau Njoroge",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nakuru",
    product: "Ray-Ban Aviator Glasses",
    productValue: 130000,
    payout: 6500,
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    productImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80"
  },
  {
    id: 9,
    name: "Njeri Kimani",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Kisumu",
    product: "JBL Bluetooth Speaker",
    productValue: 110000,
    payout: 5500,
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    productImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"
  },
  {
    id: 10,
    name: "Kelvin Kipchoge",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Eldoret",
    product: "Amazon Fire Tablet",
    productValue: 170000,
    payout: 8500,
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    productImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80"
  },
  {
    id: 11,
    name: "Kato Ssentongo",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "DJI Mini Drone",
    productValue: 275000,
    payout: 13750,
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    productImage: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&q=80"
  },
  {
    id: 12,
    name: "Nakato Mukasa",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Entebbe",
    product: "PS4 Controller",
    productValue: 105000,
    payout: 5250,
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    productImage: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80"
  },
  {
    id: 13,
    name: "Kizito Lule",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Jinja",
    product: "Studio Microphone",
    productValue: 220000,
    payout: 11000,
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    productImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80"
  },
  {
    id: 14,
    name: "Namaganda Kintu",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Mbarara",
    product: "Smart Blender",
    productValue: 145000,
    payout: 7250,
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    productImage: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80"
  },
  {
    id: 15,
    name: "Tresor Lumumba",
    gender: "male",
    country: "DR Congo",
    flag: "🇨🇩",
    city: "Kinshasa",
    product: "Coffee Maker",
    productValue: 260000,
    payout: 13000,
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    productImage: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80"
  },
  {
    id: 16,
    name: "Chantal Kabila",
    gender: "female",
    country: "DR Congo",
    flag: "🇨🇩",
    city: "Lubumbashi",
    product: "Tecno Spark 10",
    productValue: 240000,
    payout: 12000,
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    productImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
  },
  {
    id: 17,
    name: "Fabrice Tshisekedi",
    gender: "male",
    country: "DR Congo",
    flag: "🇨🇩",
    city: "Goma",
    product: "Mechanical Keyboard",
    productValue: 115000,
    payout: 5750,
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    productImage: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"
  },
  {
    id: 18,
    name: "Bosco Ntaganda",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Wireless Mouse",
    productValue: 100000,
    payout: 5000,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"
  },
  {
    id: 19,
    name: "Angelique Uwimana",
    gender: "female",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Butare",
    product: "Security Camera",
    productValue: 135000,
    payout: 6750,
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    productImage: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80"
  },
  {
    id: 20,
    name: "Didier Kagame",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Gisenyi",
    product: "AirPods Pro",
    productValue: 295000,
    payout: 14750,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    productImage: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80"
  },
  {
    id: 21,
    name: "Jean-Claude Nkurunziza",
    gender: "male",
    country: "Burundi",
    flag: "🇧🇮",
    city: "Bujumbura",
    product: "Gucci Leather Wallet",
    productValue: 125000,
    payout: 6250,
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    productImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80"
  },
  {
    id: 22,
    name: "Francine Niyonsaba",
    gender: "female",
    country: "Burundi",
    flag: "🇧🇮",
    city: "Gitega",
    product: "Casio G-Shock Watch",
    productValue: 160000,
    payout: 8000,
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    productImage: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80"
  },
  {
    id: 23,
    name: "Mulenga Banda",
    gender: "male",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Lusaka",
    product: "Adidas Running Shoes",
    productValue: 140000,
    payout: 7000,
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    productImage: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&q=80"
  },
  {
    id: 24,
    name: "Mwape Phiri",
    gender: "female",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Ndola",
    product: "MacBook Pro Charger",
    productValue: 110000,
    payout: 5500,
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    productImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80"
  },
  {
    id: 25,
    name: "Kondwani Mhone",
    gender: "male",
    country: "Malawi",
    flag: "🇲🇼",
    city: "Lilongwe",
    product: "Nintendo Switch Lite",
    productValue: 295000,
    payout: 14750,
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    productImage: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80"
  },
  {
    id: 26,
    name: "Chisomo Phiri",
    gender: "female",
    country: "Malawi",
    flag: "🇲🇼",
    city: "Blantyre",
    product: "Polaroid Instant Camera",
    productValue: 180000,
    payout: 9000,
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    productImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80"
  },
  {
    id: 27,
    name: "Chukwudi Eze",
    gender: "male",
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Lagos",
    product: "Portable Power Bank",
    productValue: 100000,
    payout: 5000,
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    productImage: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80"
  },
  {
    id: 28,
    name: "Ngozi Okafor",
    gender: "female",
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Abuja",
    product: "Smart Watch Tracker",
    productValue: 105000,
    payout: 5250,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    productImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80"
  },
  {
    id: 29,
    name: "Siyabonga Dlamini",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Johannesburg",
    product: "Noise Cancelling Earbuds",
    productValue: 195000,
    payout: 9750,
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"
  },
  {
    id: 30,
    name: "Thandeka Zuma",
    gender: "female",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Cape Town",
    product: "External Hard Drive 1TB",
    productValue: 165000,
    payout: 8250,
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    productImage: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80"
  },
  {
    id: 31,
    name: "Michael Smith",
    gender: "male",
    country: "USA",
    flag: "🇺🇸",
    city: "New York",
    product: "Kindle Paperwhite",
    productValue: 245000,
    payout: 12250,
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    productImage: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500&q=80"
  },
  {
    id: 32,
    name: "Sarah Johnson",
    gender: "female",
    country: "USA",
    flag: "🇺🇸",
    city: "Los Angeles",
    product: "Bluetooth Soundbar",
    productValue: 135000,
    payout: 6750,
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    productImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80"
  },
  {
    id: 33,
    name: "James Williams",
    gender: "male",
    country: "UK",
    flag: "🇬🇧",
    city: "London",
    product: "VR Headset",
    productValue: 280000,
    payout: 14000,
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    productImage: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=80"
  },
  {
    id: 34,
    name: "Emily Brown",
    gender: "female",
    country: "UK",
    flag: "🇬🇧",
    city: "Manchester",
    product: "Digital Photo Frame",
    productValue: 150000,
    payout: 7500,
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    productImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80"
  },
  {
    id: 35,
    name: "Ahmed Al-Maktoum",
    gender: "male",
    country: "UAE",
    flag: "🇦🇪",
    city: "Dubai",
    product: "Wireless Charging Pad",
    productValue: 100000,
    payout: 5000,
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    productImage: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&q=80"
  },
  {
    id: 36,
    name: "Fatima Al-Sayed",
    gender: "female",
    country: "UAE",
    flag: "🇦🇪",
    city: "Abu Dhabi",
    product: "Premium Leather Bag",
    productValue: 220000,
    payout: 11000,
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    productImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80"
  }
];

// Wanachama halisi wa Kitanzania kwa ajili ya Live Notifications pekee (Kujiunga, Kulipia na Kulipwa)
// Zaidi ya wanachama 50 (jumla 65) - majina yote ni ya kipekee 100% na hayajirudii popote!
const tanzanianMembersList = [
  { name: "Baraka Mwita", city: "Arusha" },
  { name: "Asha Omary", city: "Mwanza" },
  { name: "Juma Hamisi", city: "Dar es Salaam" },
  { name: "Neema Mushi", city: "Moshi" },
  { name: "Zack Shirima", city: "Mbeya" },
  { name: "Fatma Juma", city: "Zanzibar" },
  { name: "Emmanuel Mrema", city: "Dodoma" },
  { name: "Zuhura Salum", city: "Morogoro" },
  { name: "Xavier Mwamba", city: "Tanga" },
  { name: "Mariamu Bakari", city: "Iringa" },
  { name: "Rashidi Kassim", city: "Tabora" },
  { name: "Vincent Lyimo", city: "Mtwara" },
  { name: "Joseph Kimaro", city: "Kigoma" },
  { name: "Rehema Chale", city: "Singida" },
  { name: "Ulysses Tarimo", city: "Bukoba" },
  { name: "Amina Ally", city: "Musoma" },
  { name: "Hassan Msechu", city: "Shinyanga" },
  { name: "Faraja Kavishe", city: "Njombe" },
  { name: "Saidi Mwinyi", city: "Lindi" },
  { name: "Joyce Kessy", city: "Songea" },
  { name: "Frank Matiko", city: "Mwanza" },
  { name: "Beatrice Mwakyusa", city: "Mbeya" },
  { name: "Peter Mkude", city: "Morogoro" },
  { name: "Diana Mushi", city: "Arusha" },
  { name: "Hamisi Mushi", city: "Dar es Salaam" },
  { name: "Salma Khamis", city: "Zanzibar" },
  { name: "Godfrey Tarimo", city: "Dar es Salaam" },
  { name: "Sikudhani Paul", city: "Tabora" },
  { name: "Daudi Mhagama", city: "Songea" },
  { name: "Wema Isaac", city: "Dar es Salaam" },
  { name: "Elias Mwalongo", city: "Iringa" },
  { name: "Shamim Rajabu", city: "Tanga" },
  { name: "Alex Kaaya", city: "Arusha" },
  { name: "Judith Mwita", city: "Musoma" },
  { name: "Festo Malecela", city: "Dodoma" },
  { name: "Tim Bakari", city: "Zanzibar" },
  { name: "Victor Nchimbi", city: "Songea" },
  { name: "Christine Mallya", city: "Moshi" },
  { name: "Sadiki Mbaruku", city: "Lindi" },
  { name: "Paulina Masanja", city: "Shinyanga" },
  { name: "George Sanga", city: "Njombe" },
  { name: "Mariam Kipingu", city: "Morogoro" },
  { name: "Dickson Lyatuu", city: "Mbeya" },
  { name: "Zainab Mwinyimvua", city: "Dar es Salaam" },
  { name: "Innocent Shayo", city: "Moshi" },
  { name: "Martha Kyaruzi", city: "Bukoba" },
  { name: "Ramadhani Ngassa", city: "Mwanza" },
  { name: "Ester Mboya", city: "Arusha" },
  { name: "Charles Lubuva", city: "Singida" },
  { name: "Mwajuma Hatibu", city: "Mtwara" },
  { name: "Steve Ndaki", city: "Geita" },
  { name: "Richard Mwashitete", city: "Songwe" },
  { name: "Said Ally", city: "Kigoma" },
  { name: "Tumaini Mgeni", city: "Sumbawanga" },
  { name: "Anitha Marandu", city: "Moshi" },
  { name: "Jackson Mrema", city: "Dar es Salaam" },
  { name: "Pendo Haule", city: "Songea" },
  { name: "Michael Mollel", city: "Babati" },
  { name: "Quincy Nassor", city: "Pemba" },
  { name: "Paul Mahundi", city: "Mbeya" },
  { name: "Dorice Lyimo", city: "Arusha" },
  { name: "Omari Khalfan", city: "Tanga" },
  { name: "Stella Mshana", city: "Kilimanjaro" },
  { name: "Raymond Temu", city: "Dar es Salaam" },
  { name: "Hadija Mussa", city: "Dodoma" }
];

const realisticPayoutAmounts = [
  15000, 18500, 20000, 22500, 24000, 25000, 27500, 30000, 32500, 35000, 42000, 45000,
  16500, 19000, 21500, 23500, 26000, 28500, 31000, 34000, 37500, 40000, 48000, 50000
];

// Generate many more payouts to ensure they don't repeat quickly.
const baseLivePayouts = (() => {
  const firstNames = tanzanianMembersList.map(m => m.name.split(" ")[0]);
  const lastNames = tanzanianMembersList.map(m => m.name.split(" ")[1]);
  const payouts = [];
  
  // Create 500 unique names deterministically based on epoch
  const epoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
  let s = epoch * 5555 + 6666;
  const rnd = () => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = 0; i < 500; i++) {
    const fn = firstNames[Math.floor(rnd() * firstNames.length)];
    const ln = lastNames[Math.floor(rnd() * lastNames.length)];
    const rawTzsAmount = realisticPayoutAmounts[Math.floor(rnd() * realisticPayoutAmounts.length)];
    payouts.push({
      id: i + 1,
      name: `${fn} ${ln}`,
      rawTzsAmount,
      amountStr: `TZS ${rawTzsAmount.toLocaleString()}`,
      tzsStr: `TZS ${rawTzsAmount.toLocaleString()}`
    });
  }
  return payouts;
})();

// Dynamic Generators based on 12-hour epoch
export const get6HourData = () => {
  const epoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
  let s = epoch * 777 + 321;
  const rnd = () => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };
  
  const shuffle = (arr: any[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  // --- 1. Generate dynamic orderData ---
  const dynamicOrders = JSON.parse(JSON.stringify(baseOrderData));
  
  // Keep customer identity and location tied together strictly!
  const customers = dynamicOrders.map((o: any) => ({ 
    name: o.name, 
    gender: o.gender, 
    avatar: o.avatar,
    country: o.country, 
    flag: o.flag, 
    city: o.city 
  }));
  const products = dynamicOrders.map((o: any) => ({ 
    product: o.product, 
    productValue: o.productValue, 
    productImage: o.productImage 
  }));
  
  shuffle(customers);
  shuffle(products);

  // Ensure no two consecutive countries are the same
  for (let i = 1; i < customers.length; i++) {
    if (customers[i].country === customers[i-1].country) {
      for (let j = i + 1; j < customers.length; j++) {
        if (customers[j].country !== customers[i-1].country) {
           [customers[i], customers[j]] = [customers[j], customers[i]];
           break;
        }
      }
    }
  }

  // Generate exactly 5% payout
  const percentage = 0.05;

  const finalOrderData = dynamicOrders.map((o: any, i: number) => {
    const pValue = products[i].productValue;
    return {
      ...o,
      ...customers[i],
      ...products[i],
      payout: pValue * percentage
    };
  });

  // --- 2. Generate dynamic livePayouts without mixing names to guarantee 100% uniqueness ---
  const dynamicPayouts = [];
  const payoutMembers = [...tanzanianMembersList];
  shuffle(payoutMembers); // Shuffle them so they appear differently every 2 hours
  
  for (let i = 0; i < payoutMembers.length; i++) {
    const member = payoutMembers[i];
    const randomProduct = products[Math.floor(rnd() * products.length)];
    
    // Exactly 5% of the product value
    const rawTzsAmount = Math.floor(randomProduct.productValue * percentage);
    
    dynamicPayouts.push({
      id: i + 1,
      name: member.name,
      rawTzsAmount,
      amountStr: `TZS ${rawTzsAmount.toLocaleString()}`,
      tzsStr: `TZS ${rawTzsAmount.toLocaleString()}`
    });
  }

  return {
    orderData: finalOrderData,
    livePayouts: dynamicPayouts
  };
};

const generated6HourData = get6HourData();
export let orderData = generated6HourData.orderData;
export let livePayouts = generated6HourData.livePayouts;

export const update6HourDataIfChanged = () => {
  const freshData = get6HourData();
  orderData = freshData.orderData;
  livePayouts = freshData.livePayouts;
};

export const generate6HourComments = () => {
  const epoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
  let s = epoch * 222 + 555;
  const rnd = () => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };

  const sampleProducts = [
    "Luxury Velvet Sofa", "Samsung 55' 4K Smart TV", "Apple MacBook Air M1", "Heavy Duty Cordless Drill",
    "Sony PlayStation 5", "Designer Men's Suit", "Solar Water Pump", "Modern Dining Table",
    "Women's Evening Dress", "Pro Ultrasound Scanner", "Gold Plated Watch", "Canon DSLR Camera",
    "Wooden Wardrobe", "Authentic Leather Jacket", "High Pressure Washer", "Queen Size Bed",
    "Recliner Armchair", "Welding Machine Pro", "Commercial Greenhouse", "Laser Level Tool"
  ];

  // 35 Wanachama wa Kitanzania wa maoni - majina yao ni ya kipekee kabisa
  // Hayajawahi kutumika kwenye orders wala live notifications!
  const commentMembers = [
    { name: "Omar Muro", city: "Moshi", country: "Tanzania" },
    { name: "Selemani Kondo", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Teddy Mlay", city: "Arusha", country: "Tanzania" },
    { name: "Ally Mgunda", city: "Singida", country: "Tanzania" },
    { name: "Vumilia Kibwana", city: "Tanga", country: "Tanzania" },
    { name: "Dennis Makonda", city: "Mwanza", country: "Tanzania" },
    { name: "Regina Mushi", city: "Kilimanjaro", country: "Tanzania" },
    { name: "Hosea Mwakang'ata", city: "Mbeya", country: "Tanzania" },
    { name: "Pili Athumani", city: "Zanzibar", country: "Tanzania" },
    { name: "Godlove Swai", city: "Moshi", country: "Tanzania" },
    { name: "Zena Matungwa", city: "Bukoba", country: "Tanzania" },
    { name: "Shomari Simba", city: "Morogoro", country: "Tanzania" },
    { name: "Subira Kilonzo", city: "Dodoma", country: "Tanzania" },
    { name: "Ephraim Kyando", city: "Njombe", country: "Tanzania" },
    { name: "Flora Msigwa", city: "Iringa", country: "Tanzania" },
    { name: "Ismail Mtambo", city: "Kigoma", country: "Tanzania" },
    { name: "Agnes Mmari", city: "Arusha", country: "Tanzania" },
    { name: "Gasper Massawe", city: "Moshi", country: "Tanzania" },
    { name: "Rose Mbwambo", city: "Tanga", country: "Tanzania" },
    { name: "Haruna Seif", city: "Mtwara", country: "Tanzania" },
    { name: "Tausi Ramadhani", city: "Lindi", country: "Tanzania" },
    { name: "Samweli Temba", city: "Shinyanga", country: "Tanzania" },
    { name: "Happy Mlowe", city: "Mbeya", country: "Tanzania" },
    { name: "Bakari Msangi", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Zawadi Lugendo", city: "Songea", country: "Tanzania" },
    { name: "Nolan Mkali", city: "Tabora", country: "Tanzania" },
    { name: "Lilian Macha", city: "Arusha", country: "Tanzania" },
    { name: "Geoffrey Ndunguru", city: "Songea", country: "Tanzania" },
    { name: "Jackline Mrosso", city: "Moshi", country: "Tanzania" },
    { name: "Abdallah Kigoma", city: "Kigoma", country: "Tanzania" },
    { name: "Winfrida Mrema", city: "Kilimanjaro", country: "Tanzania" },
    { name: "Salim Bakhressa", city: "Zanzibar", country: "Tanzania" },
    { name: "Veronica Shayo", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Lucas Mwangomale", city: "Mbeya", country: "Tanzania" },
    { name: "Fortunata Kessy", city: "Arusha", country: "Tanzania" }
  ];

  // Maafisa wa majibu ya maoni - majina ya kipekee kabisa yenye emoji zinazoendana na ujumbe
  const commentTemplates = [
  { q: (m, p) => "Kiukweli huu mtandao umenisaidia sana! Nimeverify order ya " + p + " asubuhi hii na tayari wamenitumia kamisheni yangu moja kwa moja TigoPesa. Siwezi kuacha kufanya hii kazi. 🔥💸", tag: "Malipo Yamepokelewa 💰", reply: null },
  { q: (m) => "Nilianza kwa kusuasua maana nishawahi kupigwa mtandaoni, lakini OrderVerify ni level nyingine! Nimetoa elfu 12 yangu leo asubuhi na imeingia bila makato yoyote. Asanteni sana! 🙌", tag: "Ushuhuda Halisi ✨", reply: () => ({ name: "Support Team", text: "Tupo hapa kuhakikisha kila mwanachama anafaidika. Endelea kupiga kazi!" }) },
  { q: (m, p) => "Jamani kazi ni nyepesi mno! Unabofya tu kudhibitisha mteja aliyenunua " + p + ", na asilimia tano inasoma kwenye akaunti yako. Leo nishatengeneza TZS 14,000 nikiwa nimekaa sebuleni. 📺🤑", tag: "Oda Imethibitishwa 📦", reply: null },
  { q: (m) => "Kama bado unalaza damu unakosa pesa za bure! Mtaji wa 14,500 niliouweka juzi, leo nisharudisha mara mbili yake. M-Pesa inasoma TZS 28,500 mchana huu. Hii sio ya kukosa! 🚀💪", tag: "Mtaji Umerudi Haraka ⚡", reply: null },
  { q: (m) => "Siamini macho yangu, meseji ya Halopesa ndio inaingia hivi punde! Nashukuru sana kwa fursa hii, angalau sasa naweza kujinunulia vocha na bando bila kuomba mtu. 🙏📱", tag: "Malipo Yamepokelewa 💰", reply: null },
  { q: (m) => "Nimekuwa nikiifanya hii kazi kama part-time baada ya kutoka chuo. Hela ninayopata hapa inanisaidia kulipia kodi ya geto na matumizi madogo madogo. OrderVerify mko vizuri sana! 🎓🎒", tag: "Kipato cha Ziada 📱", reply: null },
  { q: (m, p) => "Order ya " + p + " imepita na kamisheni imeingia papo hapo. Nawaambia vijana wenzangu, acheni ubishi, wekeni mtaji wa 14,500 mtaona matokeo yake ndani ya siku moja tu! 💯🔥", tag: "Neno la Hamasa 🔥", reply: null },
  { q: (m) => "Airtel Money imesoma TZS 13,000 sekunde chache zilizopita! Hii pesa inaenda kununua unga wa ugali leo jioni. Mungu awabariki sana waanzilishi wa huu mfumo. 🍽️🤲", tag: "Shukrani ya Mwanachama 🙏", reply: () => ({ name: "Amina (Meneja Mauzo)", text: "Amina sana! Tunafurahi kuona OrderVerify inaleta mabadiliko kwenye maisha ya kila siku." }) },
  { q: (m) => "Wale wanaosema mtandaoni hakuna hela waache waendelee kulala. Mimi nishatoa zaidi ya elfu 50 wiki hii kwa kufanya kazi ndogo tu ya ku-verify orders. Kila mtu ana haki ya kuamua! 🤣🏃‍♂️💨", tag: "Ushauri wa Kujituma 💡", reply: null },
  { q: (m, p) => "Nimemaliza kuverify order ya " + p + " ya mteja kutoka huku huku " + m.city + ". Mfumo unasoma vizuri sana, hauna delay wala mambo mengi. Straight to the point! ⚡✅", tag: "Oda Imethibitishwa 📦", reply: null },
  { q: (m) => "Mtaji 14,500/= unatengeneza faida ya elfu 10 hadi 20 kila siku kulingana na juhudi zako. Huu ni uwekezaji mzuri sana ukilinganisha na biashara nyingi za mtaani. Nawashauri msipitwe! 📊💵", tag: "Ushauri wa Kujituma 💡", reply: null },
  { q: (m) => "Nimepokea malipo yangu ya TZS 10,500 asubuhi hii. Nilitoa usiku wa manane nikadhani italala, kumbe mfumo wao uko active masaa 24! Asante sana OrderVerify. 🌙💸", tag: "Malipo Yamepokelewa 💰", reply: null },
  { q: (m, p) => "Kazi nzuri sana OrderVerify. Kukamilisha order ya " + p + " imechukua sekunde chache. TigoPesa inasoma. Asanteni. 👍", tag: "Malipo Yamepokelewa 💰", reply: null },
  { q: (m) => "Kwa kweli huu mfumo unasaidia vijana sana, hasa ukiwa huna ajira. Ninajipatia riziki yangu hapa bila shida yoyote. 🙌", tag: "Ushuhuda Halisi ✨", reply: null },
  { q: (m, p) => "Mteja amenunua " + p + " leo na mimi nimepata asilimia 5 yangu papo hapo. Pesa ya supu imepatikana! 🍲", tag: "Oda Imethibitishwa 📦", reply: null },
  { q: (m) => "Asante OrderVerify. Leo nimepokea hela yangu ya kwanza kabisa baada ya kuweka mtaji jana tu. Mungu awabariki sana. 💸", tag: "Shukrani ya Mwanachama 🙏", reply: () => ({ name: "Support Team", text: "Karibu sana! Endelea kufurahia huduma zetu." }) }
];

  const comments = commentMembers.map((member, idx) => {
    const prod = sampleProducts[Math.floor(rnd() * sampleProducts.length)];
    const tmpl = commentTemplates[idx % commentTemplates.length];
    const text = tmpl.q(member, prod);
    const tag = tmpl.tag;

    const minutesAgo = (idx * 3 + Math.floor(rnd() * 5)) % 60 + 2;
    const timeStr = minutesAgo <= 3 
      ? "Sasa hivi" 
      : minutesAgo < 60 
        ? `Dakika ${minutesAgo} zilizopita` 
        : "Saa 1 lililopita";

    const replyObj = tmpl.reply ? tmpl.reply(member) : null;

    return {
      id: 2000 + (epoch * 200) + idx,
      name: member.name,
      location: `${member.city}, ${member.country}`,
      text,
      tag,
      time: timeStr,
      replies: replyObj ? [{
        id: 7000 + (epoch * 100) + idx,
        name: replyObj.name,
        text: replyObj.text,
        time: "Muda huu"
      }] : []
    };
  });

  return comments;
};

export const initialComments = generate6HourComments();
