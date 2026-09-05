
const TWELVE_HOURS = 12 * 60 * 60 * 1000;
export const currentEpoch = Math.floor(Date.now() / TWELVE_HOURS);
let seed = currentEpoch;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const page1Countries = [
  { c: "Tanzania", f: "🇹🇿", curr: "TZS", rate: 1, city: "Dar es Salaam", names: ["Juma Salum", "Asha Omary", "Zuhura", "Baraka Mwita", "Fatma Juma", "Omari", "Neema", "Rashidi", "Mariamu", "Hussein", "Hadija", "Ismail"] },
  { c: "Kenya", f: "🇰🇪", curr: "KES", rate: 0.05, city: "Nairobi", names: ["Grace Wanjiku", "Kevin Mutua", "Faith Ochieng", "Brian Kamau", "Joyce", "Peter", "Jane", "David", "Mary", "Samuel", "Lucy", "John"] },
  { c: "Uganda", f: "🇺🇬", curr: "UGX", rate: 1.45, city: "Kampala", names: ["Kato Ali", "Sarah Namubiru", "John Kigozi", "Proscovia", "Moses", "Betty", "Charles", "Grace", "Ronald", "Florence", "Julius", "Stella"] },
  { c: "Rwanda", f: "🇷🇼", curr: "RWF", rate: 0.5, city: "Kigali", names: ["Aline Mutesi", "Jean Nkurunziza", "Chantal Ndayizeye", "Thierry", "Marie", "Claude", "Diane", "Eric", "Josiane", "Olivier", "Sandrine", "Patrick"] },
  { c: "Burundi", f: "🇧🇮", curr: "BIF", rate: 1.1, city: "Bujumbura", names: ["Pierre", "Marie Ndikumana", "Alain", "Nadine", "Jean", "Francine", "Eric", "Chantal", "Didier", "Alice", "Elvis", "Yvonne"] }
];
export const page1Products = [
  { product: "Luxury Velvet Sofa", value: 450000, img: "https://loremflickr.com/500/500/sofa,furniture?lock=101" },
  { product: "Designer Men's Suit", value: 350000, img: "https://loremflickr.com/500/500/suit,menswear?lock=102" },
  { product: "Modern Dining Table", value: 480000, img: "https://loremflickr.com/500/500/dining,table?lock=103" },
  { product: "Women's Evening Dress", value: 120000, img: "https://loremflickr.com/500/500/dress,fashion?lock=104" },
  { product: "Wooden Wardrobe", value: 320000, img: "https://loremflickr.com/500/500/wardrobe,furniture?lock=105" },
  { product: "Leather Office Shoes", value: 110000, img: "https://loremflickr.com/500/500/shoes,leather?lock=106" },
  { product: "Queen Size Bed", value: 500000, img: "https://loremflickr.com/500/500/bed,furniture?lock=107" },
  { product: "Bridal Wedding Gown", value: 400000, img: "https://loremflickr.com/500/500/wedding,gown?lock=108" },
  { product: "Coffee Table Set", value: 150000, img: "https://loremflickr.com/500/500/coffeetable,furniture?lock=109" },
  { product: "Gold Plated Watch", value: 250000, img: "https://loremflickr.com/500/500/watch,gold?lock=110" },
  { product: "Recliner Armchair", value: 380000, img: "https://loremflickr.com/500/500/armchair,furniture?lock=111" },
  { product: "Authentic Leather Jacket", value: 200000, img: "https://loremflickr.com/500/500/jacket,leather?lock=112" }
];

export const page2Countries = [
  { c: "UK", f: "🇬🇧", curr: "GBP", rate: 0.0003, city: "London", names: ["Liam O'Connor", "Sophia Williams", "James Taylor", "Oliver", "Amelia", "Harry", "Isla", "Jack", "Ava", "Noah", "Mia", "Charlie"] },
  { c: "UAE", f: "🇦🇪", curr: "AED", rate: 0.0014, city: "Dubai", names: ["Ahmed Ali", "Fatima Al-Sayed", "Omar", "Aisha", "Mohammed", "Maryam", "Ali", "Zainab", "Hassan", "Sara", "Ibrahim", "Noor"] },
  { c: "Germany", f: "🇩🇪", curr: "EUR", rate: 0.00035, city: "Berlin", names: ["Hans Weber", "Julia Becker", "Lukas", "Mia", "Leon", "Emma", "Paul", "Hannah", "Finn", "Anna", "Jonas", "Lea"] },
  { c: "France", f: "🇫🇷", curr: "EUR", rate: 0.00035, city: "Paris", names: ["Jean Dupont", "Marie Claire", "Pierre", "Camille", "Lucas", "Louise", "Hugo", "Alice", "Arthur", "Chloe", "Louis", "Juliette"] },
  { c: "Saudi Arabia", f: "🇸🇦", curr: "SAR", rate: 0.0014, city: "Riyadh", names: ["Tariq", "Aisha", "Mohammed", "Fatima", "Abdullah", "Maryam", "Fahad", "Noura", "Khalid", "Sara", "Saud", "Reem"] }
];
export const page2Products = [
  { product: "Samsung 55' 4K Smart TV", value: 600000, img: "https://loremflickr.com/500/500/tv,samsung?lock=401" },
  { product: "Pro Ultrasound Scanner", value: 580000, img: "https://loremflickr.com/500/500/ultrasound,scanner?lock=402" },
  { product: "Apple MacBook Air M1", value: 550000, img: "https://loremflickr.com/500/500/macbook,laptop?lock=403" },
  { product: "Digital X-Ray Panel", value: 590000, img: "https://loremflickr.com/500/500/xray,medical?lock=404" },
  { product: "Sony PlayStation 5", value: 520000, img: "https://loremflickr.com/500/500/playstation,console?lock=405" },
  { product: "Oxygen Concentrator Pro", value: 570000, img: "https://loremflickr.com/500/500/oxygen,hospital?lock=406" },
  { product: "Canon DSLR Camera", value: 510000, img: "https://loremflickr.com/500/500/camera,dslr?lock=407" },
  { product: "Automated CPR Machine", value: 560000, img: "https://loremflickr.com/500/500/cpr,medical?lock=408" },
  { product: "Dell XPS 13 Ultrabook", value: 540000, img: "https://loremflickr.com/500/500/dell,laptop?lock=409" },
  { product: "Patient Monitor System", value: 600000, img: "https://loremflickr.com/500/500/monitor,hospital?lock=410" },
  { product: "DJI Mavic Air 2 Drone", value: 530000, img: "https://loremflickr.com/500/500/drone,dji?lock=411" },
  { product: "Portable Dental X-Ray", value: 550000, img: "https://loremflickr.com/500/500/dental,xray?lock=412" }
];

export const page3Countries = [
  { c: "USA", f: "🇺🇸", curr: "USD", rate: 0.00038, city: "New York", names: ["John Smith", "Emma Watson", "Michael Brown", "Olivia", "James", "Sophia", "William", "Isabella", "Benjamin", "Mia", "Lucas", "Charlotte"] },
  { c: "Japan", f: "🇯🇵", curr: "JPY", rate: 0.057, city: "Tokyo", names: ["Yuki Tanaka", "Kenji Sato", "Hiroshi", "Yui", "Takumi", "Rio", "Sota", "Hina", "Ren", "Koharu", "Minato", "Sakura"] },
  { c: "Brazil", f: "🇧🇷", curr: "BRL", rate: 0.0019, city: "São Paulo", names: ["Carlos Silva", "Isabella Santos", "Lucas", "Julia", "Pedro", "Sophia", "Gabriel", "Alice", "Matheus", "Laura", "Arthur", "Manuela"] },
  { c: "China", f: "🇨🇳", curr: "CNY", rate: 0.0027, city: "Shanghai", names: ["Li Wei", "Chen Jian", "Wang Fang", "Zhang Min", "Liu Jing", "Yang Qiang", "Huang Yong", "Wu Yan", "Zhao Lei", "Zhou Tao", "Xu Feng", "Sun Lin"] },
  { c: "India", f: "🇮🇳", curr: "INR", rate: 0.032, city: "Mumbai", names: ["Priya Patel", "Ravi Kumar", "Amit", "Diya", "Rahul", "Neha", "Arjun", "Sneha", "Vikram", "Pooja", "Rohan", "Anjali"] }
];
export const page3Products = [
  { product: "Heavy Duty Cordless Drill", value: 220000, img: "https://loremflickr.com/500/500/drill,tools?lock=301" },
  { product: "Solar Water Pump", value: 450000, img: "https://loremflickr.com/500/500/waterpump,agriculture?lock=302" },
  { product: "Laser Level Tool", value: 180000, img: "https://loremflickr.com/500/500/laserlevel,tools?lock=303" },
  { product: "Commercial Greenhouse", value: 490000, img: "https://loremflickr.com/500/500/greenhouse,agriculture?lock=304" },
  { product: "Professional Chainsaw", value: 330000, img: "https://loremflickr.com/500/500/chainsaw,tools?lock=305" },
  { product: "Soil Testing Drone", value: 470000, img: "https://loremflickr.com/500/500/drone,agriculture?lock=306" },
  { product: "Concrete Mixer Engine", value: 500000, img: "https://loremflickr.com/500/500/concretemixer,construction?lock=307" },
  { product: "High Pressure Washer", value: 250000, img: "https://loremflickr.com/500/500/pressurewasher,tools?lock=308" },
  { product: "Industrial Wheelbarrow", value: 100000, img: "https://loremflickr.com/500/500/wheelbarrow,construction?lock=309" },
  { product: "Welding Machine Pro", value: 400000, img: "https://loremflickr.com/500/500/welding,machine?lock=310" },
  { product: "Drip Irrigation System", value: 150000, img: "https://loremflickr.com/500/500/irrigation,agriculture?lock=311" },
  { product: "Motorized Sprayer", value: 120000, img: "https://loremflickr.com/500/500/sprayer,agriculture?lock=312" }
];

export const countryData = shuffle([...page1Countries, ...page2Countries, ...page3Countries]);
export const allProducts = shuffle([...page1Products, ...page2Products, ...page3Products]);

export const formatLocalCurrency = (tzsAmount, countryCode) => {
  const country = countryData.find(c => c.c === countryCode) || countryData[0];
  const localAmount = tzsAmount * country.rate;
  if (["USD", "GBP", "AED", "EUR"].includes(country.curr)) {
    return `${country.curr} ${localAmount.toFixed(2)}`;
  }
  return `${country.curr} ${Math.round(localAmount).toLocaleString()}`;
};

const generatePageOrders = (countries, products, startIndex) => {
  return Array.from({ length: 12 }).map((_, i) => {
    const prod = products[i];
    const ctry = countries[i % countries.length];
    const nameIndex = Math.floor(i / countries.length) % ctry.names.length;
    const cName = ctry.names[nameIndex];
    return {
      id: startIndex + i,
      name: cName,
      country: ctry.c,
      flag: ctry.f,
      city: ctry.city,
      product: prod.product,
      productValue: prod.value,
      payout: prod.value * 0.05,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(random() * 70) + 1}`,
      productImage: prod.img
    };
  });
};

export const orderData = shuffle([
  ...generatePageOrders(page1Countries, page1Products, 1),
  ...generatePageOrders(page2Countries, page2Products, 13),
  ...generatePageOrders(page3Countries, page3Products, 25)
]);

export const sliderImages = shuffle(allProducts).map(p => p.img);

const amounts = [12000, 15000, 20000, 24000, 25000, 30000, 45000, 85000];
export const livePayouts = shuffle(Array.from({ length: 120 }).map((_, i) => {
  const ctry = countryData[Math.floor(random() * countryData.length)];
  const name = ctry.names[Math.floor(random() * ctry.names.length)];
  const rawTzsAmount = amounts[Math.floor(random() * amounts.length)];
  return {
    id: i,
    name: `${name} (${ctry.c})`,
    rawTzsAmount,
    amountStr: formatLocalCurrency(rawTzsAmount, ctry.c),
    tzsStr: `TZS ${rawTzsAmount.toLocaleString()}`
  };
}));

export const generate12HourComments = () => {
  // Rotate every day/12h with fresh determinism so comments feel active and non-repetitive
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
    "DJI Mavic Air 2 Drone", "Wooden Wardrobe", "Authentic Leather Jacket", "High Pressure Washer",
    "Queen Size Bed", "Recliner Armchair", "Welding Machine Pro", "Commercial Greenhouse"
  ];

  const members = [
    { name: "Aisha Twaha", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Kelvin Mwangi", city: "Nairobi", country: "Kenya" },
    { name: "Mama Samira", city: "Mwanza", country: "Tanzania" },
    { name: "Erick Baraka", city: "Arusha", country: "Tanzania" },
    { name: "Fatma Omary", city: "Zanzibar", country: "Tanzania" },
    { name: "John Kigozi", city: "Kampala", country: "Uganda" },
    { name: "Neema Ally", city: "Dodoma", country: "Tanzania" },
    { name: "Rashid Salim", city: "Tanga", country: "Tanzania" },
    { name: "Salome Mwita", city: "Mbeya", country: "Tanzania" },
    { name: "Grace Wanjiku", city: "Nakuru", country: "Kenya" },
    { name: "Hamis Tembo", city: "Morogoro", country: "Tanzania" },
    { name: "Aline Mutesi", city: "Kigali", country: "Rwanda" },
    { name: "Peter Kimani", city: "Nairobi", country: "Kenya" },
    { name: "Anna Massawe", city: "Moshi", country: "Tanzania" },
    { name: "Kaka Juma", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Stella Namubiru", city: "Entebbe", country: "Uganda" },
    { name: "Brian Mutua", city: "Mombasa", country: "Kenya" },
    { name: "Lucy Nduta", city: "Eldoret", country: "Kenya" },
    { name: "Mzee Shabani", city: "Kigoma", country: "Tanzania" },
    { name: "Diana Mlay", city: "Iringa", country: "Tanzania" },
    { name: "Pierre Ndikumana", city: "Bujumbura", country: "Burundi" },
    { name: "Zainab Bakari", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Frank Lyimo", city: "Arusha", country: "Tanzania" },
    { name: "Babu Tale", city: "Dodoma", country: "Tanzania" },
    { name: "Amina Juma", city: "Mtwara", country: "Tanzania" },
    { name: "Godlisten K.", city: "Moshi", country: "Tanzania" },
    { name: "Rosemary M.", city: "Mwanza", country: "Tanzania" },
    { name: "Michael Otieno", city: "Kisumu", country: "Kenya" },
    { name: "Sikudhani Paul", city: "Tabora", country: "Tanzania" },
    { name: "David Mwangi", city: "Nairobi", country: "Kenya" },
    { name: "Wema Isaac", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Samson Mugisha", city: "Kigali", country: "Rwanda" },
    { name: "Juliana Paul", city: "Shinyanga", country: "Tanzania" },
    { name: "Benard Mrema", city: "Mbeya", country: "Tanzania" },
    { name: "Christina John", city: "Arusha", country: "Tanzania" },
    { name: "Musa Hassan", city: "Singida", country: "Tanzania" },
    { name: "Agness Komba", city: "Songea", country: "Tanzania" },
    { name: "Shabani Rajabu", city: "Tanga", country: "Tanzania" },
    { name: "Rehema Chale", city: "Morogoro", country: "Tanzania" },
    { name: "Omari Athumani", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Baraka Mwita", city: "Dodoma", country: "Tanzania" },
    { name: "Faith Chebet", city: "Kericho", country: "Kenya" },
    { name: "Jean Claude", city: "Kigali", country: "Rwanda" },
    { name: "Hadija Seif", city: "Mtwara", country: "Tanzania" },
    { name: "Charles Ochieng", city: "Kisumu", country: "Kenya" },
    { name: "Beatrice Kimario", city: "Kilimanjaro", country: "Tanzania" },
    { name: "Emmanuel Joseph", city: "Mwanza", country: "Tanzania" },
    { name: "Joyce Muthoni", city: "Thika", country: "Kenya" },
    { name: "Godfrey Tarimo", city: "Dar es Salaam", country: "Tanzania" },
    { name: "Sarah Nabatanzi", city: "Kampala", country: "Uganda" },
    { name: "Denis Marwa", city: "Mara", country: "Tanzania" },
    { name: "Martha Shirima", city: "Moshi", country: "Tanzania" }
  ];

  // Human comment pool: Questions with Agent Replies, Thank Yous, & Motivational Testimonies
  const commentTemplates = [
    // 1. Questions & Agent Replies
    {
      q: (m: any) => `Hivi nikishajisajili na kulipia mtaji wa 14,500/= naanza kufanya kazi mara moja au kuna muda wa kusubiri?`,
      tag: "Swali & Jibu 💬",
      reply: (m: any) => ({
        name: "Agent Jackson (Huduma)",
        text: `Habari ${m.name.split(' ')[0]}! Ukishakamilisha malipo akaunti yako inafunguliwa papo hapo bila kuchelewa, unaanza kuthibitisha oda mara moja na kuona salio lako likiongezeka!`,
        avatar: "https://i.pravatar.cc/150?img=60"
      })
    },
    {
      q: () => `Kiwango cha chini cha kutoa pesa kwenye simu yangu ni shilingi ngapi jamani?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Agent Grace (Support)",
        text: `Habari! Unaweza kutoa kuanzia TZS 5,000 tu kwenda moja kwa moja kwenye M-Pesa, Tigo Pesa, Airtel Money au HaloPesa bila makato yoyote.`,
        avatar: "https://i.pravatar.cc/150?img=47"
      })
    },
    {
      q: (m: any) => `Mimi nipo ${m.city} huku kijijini, je naweza kufanya hii kazi au inahitaji uwe mjini pekee?`,
      tag: "Swali & Jibu 💬",
      reply: (m: any) => ({
        name: "OrderVerify Support",
        text: `Popote pale ulipo ${m.city} au kijijini ilimradi uwe na simu ya mkononi yenye intaneti unaweza kufanya kazi na kulipwa bila shida yoyote!`,
        avatar: "https://i.pravatar.cc/150?img=68"
      })
    },
    {
      q: () => `Mtaji huu wa 14,500/= unalipwa mara moja tu au unalipwa kila mwezi?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Admin Zuhura",
        text: `Unalipia mara moja tu kwa ajili ya kufungua akaunti yako rasmi na kuanza kupokea kazi za kuthibitisha oda maisha yako yote. Hakuna ada ya mwezi.`,
        avatar: "https://i.pravatar.cc/150?img=1"
      })
    },
    {
      q: (m: any, p: string) => `Nimetuma oda ya ${p} naona salio limeongezeka, naweza kutoa pesa zangu leo au mpaka mwisho wa mwezi?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Agent Frank (Malipo)",
        text: `Hapa hakuna kusubiri mwisho wa mwezi! Kila unachokipata unaweza kubofya kitufe cha 'Toa Pesa' na ukalipwa siku hiyo hiyo kwenye simu yako.`,
        avatar: "https://i.pravatar.cc/150?img=33"
      })
    },
    {
      q: () => `Kama sina laini ya Vodacom, je naweza kutumia namba yangu ya Tigo au Airtel kutoa pesa?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "OrderVerify Help Desk",
        text: `Ndiyo kabisa! Mfumo wetu unalipa moja kwa moja kupitia Vodacom M-Pesa, Tigo Pesa, Airtel Money pamoja na HaloPesa.`,
        avatar: "https://i.pravatar.cc/150?img=12"
      })
    },
    {
      q: () => `Kuna kikomo cha oda ninazoweza kuthibitisha kwa siku au naweza kufanya nyingi niwezavyo?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Agent Jackson (Huduma)",
        text: `Hakuna kikomo cha oda! Kadiri unavyothibitisha oda nyingi ndivyo unavyoingiza faida na kamisheni kubwa zaidi kila siku.`,
        avatar: "https://i.pravatar.cc/150?img=60"
      })
    },
    {
      q: () => `Je kazi hii inahitaji ujuzi mkubwa wa kompyuta au smartphone ya bei ghali?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Agent Grace (Support)",
        text: `Hapana, haihitaji ujuzi mgumu. Ni kubofya tu kitufe cha 'Thibitisha Order' na kufuata hatua rahisi zinazoonekana kwenye skrini yako ya simu.`,
        avatar: "https://i.pravatar.cc/150?img=47"
      })
    },
    {
      q: () => `Je naweza kutoa pesa hata nyakati za jioni au siku za wikendi?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "OrderVerify Support",
        text: `Mfumo wa utoaji pesa unafanya kazi masaa 24 kila siku ikiwemo jumamosi na jumapili. Pesa inaingia papo hapo.`,
        avatar: "https://i.pravatar.cc/150?img=68"
      })
    },
    {
      q: () => `Nimejisajili sasa hivi, nikilipia hiyo 14,500/= naunganishwa vipi na group la WhatsApp la mafunzo?`,
      tag: "Swali & Jibu 💬",
      reply: () => ({
        name: "Admin Zuhura",
        text: `Bofya tu kile kitufe cha kijani cha 'JIUNGE NA GROUP LETU' kule juu, utaingia moja kwa moja kwenye group letu na kupata msaada wa karibu.`,
        avatar: "https://i.pravatar.cc/150?img=1"
      })
    },

    // 2. Shukrani & Uthibitisho wa Malipo (Gratitude & Payouts)
    {
      q: (m: any) => `Asanteni sana OrderVerify! Nimepokea TZS ${(24000 + Math.floor(rnd() * 45) * 1000).toLocaleString()} asubuhi hii kwenye M-Pesa yangu kutoka kwa wateja niliothibitisha oda zao. Mungu awabariki sana.`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: (m: any) => `Mimi nilianza na wasiwasi sana jana, lakini saa 8 mchana nimevuta TZS ${(18000 + Math.floor(rnd() * 38) * 1000).toLocaleString()} Airtel Money bila tatizo lolote! Hakika tovuti hii ni mkombozi.`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: (m: any) => `Nashukuru sana nimepata pesa ya kulipia bili ya umeme na chakula cha familia leo kwa kuthibitisha order chache tu asubuhi. Kazi ni rahisi na inalipa.`,
      tag: "Shukrani ya Mwanachama 🙏",
      reply: () => ({
        name: "Agent Grace (Support)",
        text: `Hongera sana na asante kwa kuwa sehemu yetu! Endelea kufanya kazi kwa bidii, oda zipo nyingi sana leo.`,
        avatar: "https://i.pravatar.cc/150?img=47"
      })
    },
    {
      q: (m: any) => `Tigo Pesa imelia sasa hivi TZS ${(26000 + Math.floor(rnd() * 50) * 1000).toLocaleString()}! Mwanzoni nilisita kulipa 14,500 lakini nisharudisha mtaji wangu mara tatu ndani ya siku mbili tu.`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: (m: any) => `Mwanzo nilidhani ni utani kama tovuti nyingine, ila baada ya kutoa elfu 32 yangu ya kwanza nimeamini huu mfumo uko makini sana. Asanteni sana OrderVerify team!`,
      tag: "Ushuhuda Halisi ✨",
      reply: null
    },
    {
      q: (m: any) => `Nalipwa kila jioni baada ya kutoka kwenye kazi zangu za kawaida za ofisini. Hii fursa hainivurugii ratiba zangu hata kidogo!`,
      tag: "Kipato cha Ziada 📱",
      reply: null
    },
    {
      q: (m: any) => `Hata dada yangu nimemwelekeza jinsi ya kujisajili na tayari naye anapokea kamisheni zake huko ${m.city}. Hakuna mtu wa kulalamika njaa tena.`,
      tag: "Shukrani ya Mwanachama 🙏",
      reply: null
    },
    {
      q: (m: any) => `Nimepokea TZS ${(35000 + Math.floor(rnd() * 40) * 1000).toLocaleString()} mchana huu HaloPesa, hii imenisaidia sana kumlipia mtoto wangu ada ya shule. Asanteni kwa uaminifu wenu!`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: (m: any, p: string) => `Oda ya ${p} kwenda kwa mteja imekamilika kwa kubofya kitufe kimoja tu, na kamisheni ya 5% imeingia kwenye salio langu papo hapo. Raha sana!`,
      tag: "Oda Imethibitishwa 📦",
      reply: null
    },
    {
      q: (m: any) => `Nimerudisha mtaji wangu wa 14,500/= ndani ya masaa 4 tu ya kwanza! Sasa hivi nakula faida tu kila nikithibitisha oda mpya.`,
      tag: "Mtaji Umerudi Haraka ⚡",
      reply: null
    },

    // 3. Hamasa & Ushauri wa Kujituma (Motivation & Encouragement)
    {
      q: () => `Watu wengi wanaogopa kuchukua hatua wanabaki kulalamika maisha magumu. Mtaji wa 14,500/= hauwezi kukufanya ufilisike ila unaweza kubadilisha maisha yako kabisa!`,
      tag: "Neno la Hamasa 🔥",
      reply: () => ({
        name: "Admin Zuhura",
        text: `Ukweli mtupu! Wale wanaochukua hatua leo ndio wanaofurahia matunda kila siku.`,
        avatar: "https://i.pravatar.cc/150?img=1"
      })
    },
    {
      q: () => `Fursa haingoji mtu anayesitasita! Mimi nilianza juzi leo hii nishatengeneza zaidi ya laki moja. Acheni uoga jitoeni kimasomaso ndugu zangu!`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Ukiwa na smartphone usiitumie kuangalia video za udaku tu wakati wenzako wanapiga pesa kila dakika hapa. Tumia simu yako ikuingizie kipato!`,
      tag: "Ushauri wa Kujituma 💡",
      reply: null
    },
    {
      q: () => `Kujituma ndio siri. Ukiamka asubuhi hakikisha unathibitisha order zote zilizopo kwenye orodha. Huwezi kujuta hata kidogo!`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: (m: any) => `Mimi ni mwalimu huku ${m.city}, muda wa mapumziko nathibitisha order 4 au 5 tayari nina elfu 25 mfukoni bila kuvuruga kazi zangu za kufundisha.`,
      tag: "Kazi na Kipato 💼",
      reply: null
    },
    {
      q: () => `Amini katika kujaribu vitu vipya vyenye tija. Waliothubutu leo wanacheka, usisubiri hadi fursa ifungwe ndipo uanze kujilaumu.`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Kila mtu anastahili kupata kipato cha uhakika cha ziada. Simu yako ndio ofisi yako sasa, tumia fursa hii vizuri!`,
      tag: "Ushauri wa Kujituma 💡",
      reply: null
    },
    {
      q: () => `Usiogope kuwekeza kwenye fursa halisi. Ukiona watu wanapokea pesa zao kila siku amka na wewe ufanye maamuzi sahihi sasa hivi.`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Nawatia moyo wote mliojiunga leo: fuateni maelekezo ya kujisajili kwa utulivu na mtapata matokeo mazuri kama sisi tulioanza mwanzo.`,
      tag: "Hamasa kwa Wageni 🌟",
      reply: () => ({
        name: "Agent Jackson (Huduma)",
        text: `Ushauri mzuri sana ndugu yetu! Tuko hapa kuhakikisha kila mwanachama anafanikiwa kupata haki yake.`,
        avatar: "https://i.pravatar.cc/150?img=60"
      })
    },
    {
      q: () => `Nilikuwa sina hata elfu 5 mfukoni wiki iliyopita, nilipojibana nikapata 14,500 ya kuanza leo hii naona amani na nafurahia sana maamuzi yangu!`,
      tag: "Ushuhuda Halisi ✨",
      reply: null
    },
    {
      q: () => `Hakuna mafanikio bila kuanza. Mimi nilianza nikiwa na hofu kubwa sana lakini leo najivunia kuwa mwanachama wa OrderVerify.`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: () => `Watu wataongea mengi lakini mwisho wa siku bili zitalipwa na wewe mwenyewe. Jiamini na uchukue hatua leo, hutojuta!`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    },
    {
      q: (m: any, p: string) => `Mteja wa ${m.city} nimethibitisha oda yake ya ${p} sekunde kadhaa zilizopita. Mfumo uko fasta mno hauna usumbufu kabisa!`,
      tag: "Oda Imethibitishwa 📦",
      reply: null
    },
    {
      q: (m: any) => `Malipo yangu ya tatu ya wiki hii yameingia sekunde hii kwenye M-Pesa TZS ${(29000 + Math.floor(rnd() * 40) * 1000).toLocaleString()}. Asanteni sana OrderVerify kwa kutimiza ahadi zenu!`,
      tag: "Malipo Yamepokelewa 💰",
      reply: null
    },
    {
      q: () => `Kila dakika unayopoteza kuna oda inathibitishwa na mwanachama mwingine. Jiunge sasa hivi uanze kupokea pesa zako!`,
      tag: "Neno la Hamasa 🔥",
      reply: null
    }
  ];

  // Map to generate 50+ rich comments with varied timestamps & human touch
  const comments = members.map((member, idx) => {
    const prod = sampleProducts[Math.floor(rnd() * sampleProducts.length)];
    const tmpl = commentTemplates[idx % commentTemplates.length];
    const text = tmpl.q(member, prod);
    const tag = tmpl.tag;
    
    // Dynamic minutes ago (1 to 58 minutes)
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
      avatar: `https://i.pravatar.cc/150?img=${((idx * 5 + epoch * 3) % 70) + 1}`,
      time: timeStr,
      replies: replyObj ? [{
        id: 7000 + (epoch * 100) + idx,
        name: replyObj.name,
        text: replyObj.text,
        avatar: replyObj.avatar,
        time: "Muda huu"
      }] : []
    };
  });

  return comments;
};

export const initialComments = generate12HourComments();


