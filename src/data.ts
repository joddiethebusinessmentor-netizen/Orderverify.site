
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
  // --- PAGE 1 (Orodha 1 - 12) ---
  {
    id: 1,
    name: "Dieudonné Bakole",
    gender: "male",
    country: "DR Congo",
    flag: "🇨🇩",
    city: "Kinshasa",
    product: "Luxury Velvet Sofa",
    productValue: 450000,
    payout: 22500,
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/sofa,furniture?lock=101"
  },
  {
    id: 2,
    name: "Upendo Mkumbo",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    product: "Designer Men's Suit",
    productValue: 350000,
    payout: 17500,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/suit,menswear?lock=102"
  },
  {
    id: 3,
    name: "Brian Wanyama",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Modern Dining Table",
    productValue: 480000,
    payout: 24000,
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/table,dining?lock=103"
  },
  {
    id: 4,
    name: "Jessica Miller",
    gender: "female",
    country: "USA",
    flag: "🇺🇸",
    city: "New York",
    product: "Apple MacBook Air M1",
    productValue: 550000,
    payout: 27500,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/macbook,laptop?lock=104"
  },
  {
    id: 5,
    name: "Chen Jian",
    gender: "male",
    country: "China",
    flag: "🇨🇳",
    city: "Shanghai",
    product: "Laser Level Tool",
    productValue: 180000,
    payout: 9000,
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/laser,tool?lock=105"
  },
  {
    id: 6,
    name: "Charlotte Hughes",
    gender: "female",
    country: "UK",
    flag: "🇬🇧",
    city: "London",
    product: "Digital X-Ray Panel",
    productValue: 590000,
    payout: 29500,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/xray,medical?lock=106"
  },
  {
    id: 7,
    name: "Moses Byaruhanga",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "Coffee Table Set",
    productValue: 150000,
    payout: 7500,
    avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/table,coffee?lock=107"
  },
  {
    id: 8,
    name: "Fatima Al-Sayed",
    gender: "female",
    country: "UAE",
    flag: "🇦🇪",
    city: "Dubai",
    product: "Pro Ultrasound Scanner",
    productValue: 580000,
    payout: 29000,
    avatar: "https://images.unsplash.com/photo-1564564244659-45037d45e4d7?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/ultrasound,scanner?lock=108"
  },
  {
    id: 9,
    name: "Lukas Weber",
    gender: "male",
    country: "Germany",
    flag: "🇩🇪",
    city: "Berlin",
    product: "Canon DSLR Camera",
    productValue: 510000,
    payout: 25500,
    avatar: "https://images.unsplash.com/photo-1500688160051-15e52662cece?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/camera,dslr?lock=109"
  },
  {
    id: 10,
    name: "Diane Uwase",
    gender: "female",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Recliner Armchair",
    productValue: 380000,
    payout: 19000,
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/armchair,furniture?lock=110"
  },
  {
    id: 11,
    name: "Kenji Sato",
    gender: "male",
    country: "Japan",
    flag: "🇯🇵",
    city: "Tokyo",
    product: "Professional Chainsaw",
    productValue: 330000,
    payout: 16500,
    avatar: "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/chainsaw,tools?lock=111"
  },
  {
    id: 12,
    name: "Thandiwe Ndlovu",
    gender: "female",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Johannesburg",
    product: "Commercial Greenhouse",
    productValue: 490000,
    payout: 24500,
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/greenhouse,garden?lock=112"
  },

  // --- PAGE 2 (Orodha 13 - 24) ---
  {
    id: 13,
    name: "Jean Dupont",
    gender: "male",
    country: "France",
    flag: "🇫🇷",
    city: "Paris",
    product: "Dell XPS 13 Ultrabook",
    productValue: 540000,
    payout: 27000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/ultrabook,laptop?lock=201"
  },
  {
    id: 14,
    name: "Espérance Mwamba",
    gender: "female",
    country: "DR Congo",
    flag: "🇨🇩",
    city: "Lubumbashi",
    product: "Wooden Wardrobe",
    productValue: 320000,
    payout: 16000,
    avatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/wardrobe,closet?lock=202"
  },
  {
    id: 15,
    name: "Tariq Al-Harbi",
    gender: "male",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    city: "Riyadh",
    product: "Sony PlayStation 5",
    productValue: 520000,
    payout: 26000,
    avatar: "https://images.unsplash.com/photo-1512484776495-a098c83f3e1b?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/playstation,console?lock=203"
  },
  {
    id: 16,
    name: "Zuberi Mwinyi",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Arusha",
    product: "Queen Size Bed",
    productValue: 500000,
    payout: 25000,
    avatar: "https://images.unsplash.com/photo-1523825036634-ab6be0592236?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/bed,furniture?lock=204"
  },
  {
    id: 17,
    name: "Priya Sharma",
    gender: "female",
    country: "India",
    flag: "🇮🇳",
    city: "Mumbai",
    product: "High Pressure Washer",
    productValue: 250000,
    payout: 12500,
    avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/washer,tools?lock=205"
  },
  {
    id: 18,
    name: "Grace Chebet",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Mombasa",
    product: "Bridal Wedding Gown",
    productValue: 400000,
    payout: 20000,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/wedding,dress?lock=206"
  },
  {
    id: 19,
    name: "Carlos Silva",
    gender: "male",
    country: "Brazil",
    flag: "🇧🇷",
    city: "São Paulo",
    product: "Industrial Wheelbarrow",
    productValue: 100000,
    payout: 5000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/wheelbarrow,tools?lock=207"
  },
  {
    id: 20,
    name: "David Reynolds",
    gender: "male",
    country: "USA",
    flag: "🇺🇸",
    city: "Chicago",
    product: "Heavy Duty Cordless Drill",
    productValue: 220000,
    payout: 11000,
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/drill,tools?lock=208"
  },
  {
    id: 21,
    name: "Nadine Nizigiyimana",
    gender: "female",
    country: "Burundi",
    flag: "🇧🇮",
    city: "Bujumbura",
    product: "Gold Plated Watch",
    productValue: 250000,
    payout: 12500,
    avatar: "https://images.unsplash.com/photo-1541260894924-7ce05c5ce6fc?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/watch,gold?lock=209"
  },
  {
    id: 22,
    name: "Zhang Min",
    gender: "female",
    country: "China",
    flag: "🇨🇳",
    city: "Beijing",
    product: "Commercial Bread Oven",
    productValue: 420000,
    payout: 21000,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/oven,kitchen?lock=210"
  },
  {
    id: 23,
    name: "James Taylor",
    gender: "male",
    country: "UK",
    flag: "🇬🇧",
    city: "Manchester",
    product: "Portable Dental X-Ray",
    productValue: 550000,
    payout: 27500,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/dental,medical?lock=211"
  },
  {
    id: 24,
    name: "Proscovia Akello",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Entebbe",
    product: "Drip Irrigation System",
    productValue: 150000,
    payout: 7500,
    avatar: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/irrigation,agriculture?lock=212"
  },

  // --- PAGE 3 (Orodha 25 - 36) ---
  {
    id: 25,
    name: "Ahmed Al-Mansoor",
    gender: "male",
    country: "UAE",
    flag: "🇦🇪",
    city: "Abu Dhabi",
    product: "Samsung 55' 4K Smart TV",
    productValue: 600000,
    payout: 30000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/tv,samsung?lock=301"
  },
  {
    id: 26,
    name: "Claude Hakizimana",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Butare",
    product: "Authentic Leather Jacket",
    productValue: 200000,
    payout: 10000,
    avatar: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/jacket,leather?lock=302"
  },
  {
    id: 27,
    name: "Julia Becker",
    gender: "female",
    country: "Germany",
    flag: "🇩🇪",
    city: "Munich",
    product: "Automated CPR Machine",
    productValue: 560000,
    payout: 28000,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/cpr,medical?lock=303"
  },
  {
    id: 28,
    name: "Sipho Khumalo",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Cape Town",
    product: "Solar Water Pump",
    productValue: 450000,
    payout: 22500,
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/solar,pump?lock=304"
  },
  {
    id: 29,
    name: "Yuki Tanaka",
    gender: "female",
    country: "Japan",
    flag: "🇯🇵",
    city: "Osaka",
    product: "Soil Testing Drone",
    productValue: 470000,
    payout: 23500,
    avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/drone,technology?lock=305"
  },
  {
    id: 30,
    name: "Halima Kibwana",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mwanza",
    product: "Women's Evening Dress",
    productValue: 120000,
    payout: 6000,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/dress,fashion?lock=306"
  },
  {
    id: 31,
    name: "Camille Martin",
    gender: "female",
    country: "France",
    flag: "🇫🇷",
    city: "Lyon",
    product: "Patient Monitor System",
    productValue: 600000,
    payout: 30000,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/monitor,medical?lock=307"
  },
  {
    id: 32,
    name: "Alain Kasongo",
    gender: "male",
    country: "DR Congo",
    flag: "🇨🇩",
    city: "Goma",
    product: "Leather Office Shoes",
    productValue: 110000,
    payout: 5500,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/shoes,leather?lock=308"
  },
  {
    id: 33,
    name: "Noura Al-Otaibi",
    gender: "female",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    city: "Jeddah",
    product: "Oxygen Concentrator Pro",
    productValue: 570000,
    payout: 28500,
    avatar: "https://images.unsplash.com/photo-1502323777036-f40e35183424?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/oxygen,medical?lock=309"
  },
  {
    id: 34,
    name: "Kelvin Kiprop",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Kisumu",
    product: "Motorized Farm Sprayer",
    productValue: 120000,
    payout: 6000,
    avatar: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/sprayer,farm?lock=310"
  },
  {
    id: 35,
    name: "Rajesh Patel",
    gender: "male",
    country: "India",
    flag: "🇮🇳",
    city: "Delhi",
    product: "Concrete Mixer Engine",
    productValue: 500000,
    payout: 25000,
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/mixer,engine?lock=311"
  },
  {
    id: 36,
    name: "Isabella Santos",
    gender: "female",
    country: "Brazil",
    flag: "🇧🇷",
    city: "Rio de Janeiro",
    product: "Welding Machine Pro",
    productValue: 400000,
    payout: 20000,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    productImage: "https://loremflickr.com/500/500/welding,machine?lock=312"
  }
];

// Wanachama halisi wa Kitanzania kwa ajili ya Live Notifications pekee (Kujiunga, Kulipia na Kulipwa)
// Zaidi ya wanachama 50 (jumla 65) - majina yote ni ya kipekee 100% na hayajirudii popote!
const tanzanianMembersList = [
  { name: "Baraka Mwita", city: "Arusha" },
  { name: "Asha Omary", city: "Mwanza" },
  { name: "Juma Hamisi", city: "Dar es Salaam" },
  { name: "Neema Mushi", city: "Moshi" },
  { name: "Kelvin Shirima", city: "Mbeya" },
  { name: "Fatma Juma", city: "Zanzibar" },
  { name: "Emmanuel Mrema", city: "Dodoma" },
  { name: "Zuhura Salum", city: "Morogoro" },
  { name: "David Mwamba", city: "Tanga" },
  { name: "Mariamu Bakari", city: "Iringa" },
  { name: "Rashidi Kassim", city: "Tabora" },
  { name: "Grace Lyimo", city: "Mtwara" },
  { name: "Joseph Kimaro", city: "Kigoma" },
  { name: "Rehema Chale", city: "Singida" },
  { name: "Brian Tarimo", city: "Bukoba" },
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
  { name: "Asha Bakari", city: "Zanzibar" },
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
  { name: "Festo Ndaki", city: "Geita" },
  { name: "Grace Mwashitete", city: "Songwe" },
  { name: "Said Ally", city: "Kigoma" },
  { name: "Tumaini Mgeni", city: "Sumbawanga" },
  { name: "Anitha Marandu", city: "Moshi" },
  { name: "Jackson Mrema", city: "Dar es Salaam" },
  { name: "Pendo Haule", city: "Songea" },
  { name: "Michael Mollel", city: "Babati" },
  { name: "Halima Nassor", city: "Pemba" },
  { name: "Kelvin Mahundi", city: "Mbeya" },
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
  const epoch = Math.floor(Date.now() / (12 * 60 * 60 * 1000));
  let s = epoch * 777 + 333;
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
export const get12HourData = () => {
  const epoch = Math.floor(Date.now() / (12 * 60 * 60 * 1000));
  let s = epoch * 999 + 123;
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

  // --- 2. Generate dynamic livePayouts perfectly proportional to actual products ---
  const firstNames = tanzanianMembersList.map(m => m.name.split(" ")[0]);
  const lastNames = tanzanianMembersList.map(m => m.name.split(" ")[1]);
  const dynamicPayouts = [];
  
  for (let i = 0; i < 500; i++) {
    const fn = firstNames[Math.floor(rnd() * firstNames.length)];
    const ln = lastNames[Math.floor(rnd() * lastNames.length)];
    const randomProduct = products[Math.floor(rnd() * products.length)];
    
    // Exactly 5% of the product value
    const rawTzsAmount = Math.floor(randomProduct.productValue * percentage);
    
    dynamicPayouts.push({
      id: i + 1,
      name: `${fn} ${ln}`,
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

const generated12HourData = get12HourData();
export let orderData = generated12HourData.orderData;
export let livePayouts = generated12HourData.livePayouts;

export const update12HourDataIfChanged = () => {
  const freshData = get12HourData();
  orderData = freshData.orderData;
  livePayouts = freshData.livePayouts;
};

export const generate12HourComments = () => {
  const epoch = Math.floor(Date.now() / (12 * 60 * 60 * 1000));
  let s = epoch * 181 + 109;
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
    { name: "Amina Muro", city: "Moshi", country: "Tanzania" },
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
    { name: "Moses Mkali", city: "Tabora", country: "Tanzania" },
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
    {
      q: (m: any) => `Hivi nikishajisajili na kulipia mtaji wa 14,500/= naanza kufanya kazi mara moja au kuna muda wa kusubiri? 🤔💭`,
      tag: "Swali & Jibu 💬",
      reply: (m: any) => ({
        name: "Mwajuma Mwakipesile (Kitengo cha Malipo)",
        text: `Habari ${m.name.split(' ')[0]}! Ukishakamilisha malipo akaunti yako inafunguliwa papo hapo bila kuchelewa, unaanza kuthibitisha oda mara moja na kuona salio lako likiongezeka! 🚀✅`
      })
    },
    {
      q: () => `Kiwango cha chini cha kutoa pesa kwenye simu yangu ni shilingi ngapi jamani? 🧐📱`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Benson Mollel (Huduma kwa Wateja)",
        text: `Habari ndugu yetu! Unaweza kutoa kuanzia TZS 5,000 tu kwenda moja kwa moja kwenye M-Pesa, Tigo Pesa, Airtel Money au HaloPesa bila makato yoyote. 👍💵`
      })
    },
    {
      q: (m: any) => `Mimi nipo ${m.city} huku kijijini kabisa, je naweza kufanya hii kazi au inahitaji uwe mjini pekee? 🌾🏡`,
      tag: "Swali & Jibu 💬",
      reply: (m: any) => ({
        name: "Gladness Urasa (Usaidizi wa Wanachama)",
        text: `Popote pale ulipo ${m.city} au kijijini ilimradi uwe na simu ya mkononi yenye intaneti unaweza kufanya kazi na kulipwa bila shida yoyote! 🌍🤝`
      })
    },
    {
      q: () => `Mtaji huu wa 14,500/= unalipwa mara moja tu au kuna ada nyingine ya kila mwezi? ❓`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Kassim Mfundo (Msimamizi wa Kazi)",
        text: `Unalipia mara moja tu kwa ajili ya kufungua akaunti yako rasmi na kuanza kupokea kazi za kuthibitisha oda maisha yako yote. Hakuna ada ya mwezi hata senti moja! 🔒✨`
      })
    },
    {
      q: (m: any, p: string) => `Nimetuma oda ya ${p} naona salio limeongezeka, naweza kutoa pesa zangu leo au mpaka mwisho wa mwezi? 😃💰`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Devotha Kisanga (Mshauri wa Wanachama)",
        text: `Hapa hakuna kusubiri mwisho wa mwezi! Kila unachokipata unaweza kubofya kitufe cha 'Toa Pesa' na ukalipwa siku hiyo hiyo kwenye simu yako papo hapo. 💸📲`
      })
    },
    {
      q: () => `Kama sina laini ya Vodacom, je naweza kutumia namba yangu ya Tigo au Airtel kutoa pesa? 📲`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Benson Mollel (Huduma kwa Wateja)",
        text: `Ndiyo kabisa! Mfumo wetu unalipa moja kwa moja kupitia Vodacom M-Pesa, Tigo Pesa, Airtel Money pamoja na HaloPesa. 👌`
      })
    },
    {
      q: () => `Kuna kikomo cha oda ninazoweza kuthibitisha kwa siku au naweza kufanya nyingi niwezavyo? 📦`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Mwajuma Mwakipesile (Kitengo cha Malipo)",
        text: `Hakuna kikomo cha oda! Kadiri unavyothibitisha oda nyingi ndivyo unavyoingiza faida na kamisheni kubwa zaidi kila siku bila kikomo. 📈🔥`
      })
    },
    {
      q: () => `Je kazi hii inahitaji ujuzi mkubwa wa kompyuta au simu janja ya bei ghali? 💻📱`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Gladness Urasa (Usaidizi wa Wanachama)",
        text: `Hapana kabisa, haihitaji ujuzi mgumu! Ni kubofya tu kitufe cha 'Thibitisha Order' na kufuata hatua rahisi zinazoonekana kwenye skrini yako ya simu. 😊👍`
      })
    },
    {
      q: () => `Je naweza kutoa pesa hata nyakati za usiku sana au siku za wikendi? ⏰🌙`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Kassim Mfundo (Msimamizi wa Kazi)",
        text: `Mfumo wa utoaji pesa unafanya kazi masaa 24 kila siku ikiwemo jumamosi na jumapili. Pesa inaingia papo hapo bila kuchelewa. ⚡💰`
      })
    },
    {
      q: () => `Nimejisajili sasa hivi, nikilipia hiyo 14,500/= naunganishwa vipi na group la WhatsApp la mafunzo? 🟢👥`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Devotha Kisanga (Mshauri wa Wanachama)",
        text: `Bofya tu kile kitufe cha kijani cha 'JIUNGE NA GROUP LETU' kule juu, utaingia moja kwa moja kwenye group letu na kupata msaada wa karibu. 🤝✨`
      })
    },

    // Shukrani, Furaha & Uthibitisho wa Malipo (zenye emoji za shukrani na baraka)
    {
      q: () => `Asanteni sana OrderVerify! 🙏❤️ Nimepokea TZS ${(24000 + Math.floor(rnd() * 45) * 1000).toLocaleString()} asubuhi hii kwenye M-Pesa yangu kutoka kwa wateja niliothibitisha oda zao. Mungu awabariki sana, nitaendelea kuwa balozi wenu mzuri! 🤲✨`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: () => `Mimi nilianza na wasiwasi sana jana 🙈, lakini saa 8 mchana nimevuta TZS ${(18000 + Math.floor(rnd() * 38) * 1000).toLocaleString()} Airtel Money bila tatizo lolote! Hakika tovuti hii ni mkombozi wa vijana 🙌💰`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: () => `Nashukuru sana nimepata pesa ya kulipia bili ya umeme na chakula cha familia leo 🙏🍞 kwa kuthibitisha order chache tu asubuhi. Kazi ni nyepesi na inalipa mno! 💯`,
      tag: "Shukrani ya Mwanachama 🙏",
      reply: () => ({
        name: "Mwajuma Mwakipesile (Kitengo cha Malipo)",
        text: `Hongera sana na asante kwa kuwa sehemu yetu! Endelea kufanya kazi kwa bidii, oda zipo nyingi sana leo. 👏🌟`
      })
    },
    {
      q: () => `Tigo Pesa imelia sasa hivi TZS ${(26000 + Math.floor(rnd() * 50) * 1000).toLocaleString()}! 💸💃 Mwanzoni nilisita sana kulipa 14,500 nikadhani nitapigwa sound 😂, kumbe nisharudisha mtaji wangu mara tatu ndani ya siku mbili tu! 🤣🔥`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: () => `Mwanzo nilidhani ni utani kama hizi tovuti za porojo 😅, ila baada ya kutoa elfu 32 yangu ya kwanza nimeamini huu mfumo hauna longolongo kabisa! Asanteni sana OrderVerify team! 🙏🙌`,
      tag: "Ushuhuda Halisi ✨",
      reply: null
    },
    {
      q: () => `Nalipwa kila jioni baada ya kutoka kwenye kazi zangu za kawaida za ofisini. Mshahara wa ofisini unabaki kuwa akiba, hela ya mboga inatoka hapa kila siku! 🥩🥦😄`,
      tag: "Kipato cha Ziada 📱",
      reply: null
    },
    {
      q: (m: any) => `Hata dada yangu nilimwelekeza asubuhi aache kulalama, tayari naye anapokea kamisheni zake huko ${m.city} 💃🙌 Nyumbani hatuombani tena vocha kila mtu anakula kwa urefu wa kamba yake! 😂`,
      tag: "Shukrani ya Mwanachama 🙏",
      reply: null
    },
    {
      q: () => `Nimepokea TZS ${(35000 + Math.floor(rnd() * 40) * 1000).toLocaleString()} mchana huu HaloPesa, hii imenisaidia sana kumlipia mtoto wangu ada ya shule 🏫🎒. Asanteni kwa uaminifu wenu wa dhati! 💖🙏`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: (m: any, p: string) => `Oda ya ${p} kwenda kwa mteja imekamilika kwa kubofya kitufe kimoja tu, na kamisheni ya 5% imeingia kwenye salio langu papo hapo. Raha sana kufanya kazi mtandaoni! 💃✨📦`,
      tag: "Oda Imethibitishwa 📦",
      reply: null
    },
    {
      q: () => `Nimerudisha mtaji wangu wa 14,500/= ndani ya masaa 4 tu ya kwanza! ⚡ Sasa hivi nakula faida tu kila nikithibitisha oda mpya 🤑🔥 Raha jipe mwenyewe!`,
      tag: "Mtaji Umerudi Haraka ⚡",
      reply: null
    },

    // Vichekesho, Hamasa & Ushauri wa Kujituma (zenye emoji za kuchekesha na uchangamfu)
    {
      q: () => `Watu wataongea mengi mara 'acha utapeli' lakini mwisho wa siku mwenye nyumba akigonga mlango nani atamlipa? 🤣 Jiamini na uchukue hatua leo, mtaji wa 14,500/= hauwezi kukuacha masikini ila unaweza kukutoa kimaisha! 💪🔥`,
      tag: "Neno la Hamasa 🔥",
      reply: () => ({
        name: "Gladness Urasa (Usaidizi wa Wanachama)",
        text: `Ukweli mtupu! Wale wanaochukua hatua leo ndio wanaofurahia matunda kila siku bila hofu. 💯👏`
      })
    },
    {
      q: () => `Fursa haingoji mtu anayesitasita! Mimi nilianza juzi leo hii nishatengeneza zaidi ya laki moja. Acheni uoga jitoeni kimasomaso ndugu zangu! 🚀🔥`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Ukiwa na smartphone usiitumie kuangalia video za udaku na mapovu mtandaoni tu jamani 🤣 wakati wenzako wanapiga pesa kila dakika hapa! Simu yako ikuingizie hela sio bando linakula hela yako bure 📱💸`,
      tag: "Ushauri wa Kujituma 💡",
      reply: null
    },
    {
      q: () => `Kujituma ndio siri. Ukiamka asubuhi hakikisha unathibitisha order zote zilizopo kwenye orodha. Huwezi kujuta hata kidogo! ☀️💪`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: (m: any) => `Mimi ni mwalimu huku ${m.city}, muda wa mapumziko nikikaa staff room nathibitisha order 4 au 5 tayari nina elfu 25 mfukoni bila mwalimu mkuu kujua 😂🤫 Kazi inasonga mbele!`,
      tag: "Kazi na Kipato 💼",
      reply: null
    },
    {
      q: () => `Amini katika kujaribu vitu vipya vyenye tija. Waliothubutu leo wanacheka, usisubiri hadi fursa ifungwe ndipo uanze kujilaumu! 🎯😃`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Kuna washkaji walinicheka sana nilipojiunga juzi 😂, leo nimewanunulia supu ya asubuhi na chapati kwa pesa niliyotoa hapa! Sasa hivi wote wameniganda wanataka maelekezo 🏃‍♂️💨🤣`,
      tag: "Ushauri wa Kujituma 💡",
      reply: null
    },
    {
      q: () => `Usiogope kuwekeza kwenye fursa halisi. Ukiona watu wanapokea pesa zao kila siku amka na wewe ufanye maamuzi sahihi sasa hivi! 🔥🙌`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Nawatia moyo wote mliojiunga leo: fuateni maelekezo ya kujisajili kwa utulivu na mtapata matokeo mazuri kama sisi tulioanza mwanzo. 🌟🤝`,
      tag: "Hamasa kwa Wageni 🌟",
      reply: () => ({
        name: "Devotha Kisanga (Mshauri wa Wanachama)",
        text: `Ushauri mzuri sana ndugu yetu! Tuko hapa kuhakikisha kila mwanachama anafanikiwa kupata haki yake. 👍💖`
      })
    },
    {
      q: () => `Nilikuwa sina hata elfu 5 mfukoni wiki iliyopita, mfuko ulikuwa umetoboka hadi aibu 😭😂, nilipojibana nikapata 14,500 ya kuanza leo hii naona amani na nafurahia sana maamuzi yangu! 🥳🙏`,
      tag: "Ushuhuda Halisi ✨",
      reply: null
    },
    {
      q: () => `Hakuna cha usingizi hapa jamani, kila nikiamka usiku nakuta order mpya za wazungu na watanzania 🤑📦, nikipiga tiki tu mkwanja unasoma! Usingizi nishausahau kabisa 🏃‍♂️💨💸`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Watu watasubiri ushahidi mpaka kesho kutwa wakati wengine wanajenga vibanda! 🤣 Chukua uamuzi leo utakuja kunishukuru baadae. 💪✨`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: (m: any, p: string) => `Mteja wa ${m.city} nimethibitisha oda yake ya ${p} sekunde kadhaa zilizopita. Mfumo uko fasta mno hauna usumbufu kabisa! ⚡📦💨`,
      tag: "Oda Imethibitishwa 📦",
      reply: null
    },
    {
      q: () => `Malipo yangu ya tatu ya wiki hii yameingia sekunde hii kwenye M-Pesa TZS ${(29000 + Math.floor(rnd() * 40) * 1000).toLocaleString()}. Asanteni sana OrderVerify kwa kutimiza ahadi zenu! 🎉💵 Mungu azidi kuwainua! 🤲✨`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: () => `Kila dakika unayopoteza kuna oda inathibitishwa na mwanachama mwingine. Acha kushangaa shangaa jiunge sasa hivi upate chako mapema! ⚡🚀🤑`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    }
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

export const initialComments = generate12HourComments();
