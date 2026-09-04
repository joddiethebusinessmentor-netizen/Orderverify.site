
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

const rawComments = [
  { id: 1, name: "Aisha T.", text: "Hii biashara ni nzuri sana, nimeanza jana na tayari nimeshatoa hela! Asanteni sana 🙏", avatar: "https://i.pravatar.cc/150?img=9", replies: [{ id: 101, name: "Zuhura (Admin)", text: "Hongera sana Aisha! 🥳🔥 Piga kazi!", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 2, name: "Kelvin M.", text: "Mwanzoni nilidhani ni uongo, ila baada ya kujaribu, faida niliyoipata ni kubwa ndani ya siku mbili.", avatar: "https://i.pravatar.cc/150?img=11", replies: [] },
  { id: 3, name: "Mama Samira", text: "Order zinalipa sana, ukiweka bidii unapata hela nzuri sana. Mungu awabariki kwa fursa hii.", avatar: "https://i.pravatar.cc/150?img=5", replies: [{ id: 102, name: "Baraka", text: "Ukweli kabisa mama! Nami nimepata mtaji hapa 💪💯🏆", avatar: "https://i.pravatar.cc/150?img=12" }] },
  { id: 4, name: "Erick", text: "Kutoa hela ni chap chap, hawacheleweshi kabisa. Ni uhakika 100%. Nimeshathibitisha order nyingi leo.", avatar: "https://i.pravatar.cc/150?img=12", replies: [] },
  { id: 5, name: "Fatma O.", text: "Kiukweli sijutii kujiunga na OrderVerify, imenisaidia sana kupata kipato cha ziada nikiwa nyumbani.", avatar: "https://i.pravatar.cc/150?img=20", replies: [{ id: 103, name: "Lilian", text: "Kabisa shoga angu, mie leo nimetengeneza elfu 30! 🎉👏", avatar: "https://i.pravatar.cc/150?img=21" }] },
  { id: 6, name: "John K.", text: "Application ipo fasta na malipo yanaingia M-Pesa bila usumbufu wowote. Safi sana!", avatar: "https://i.pravatar.cc/150?img=33", replies: [] },
  { id: 7, name: "Neema A.", text: "Mimi nilikuwa natafuta kazi mtandaoni siku nyingi sana. Hii ni suluhisho pekee la uhakika. 🙏", avatar: "https://i.pravatar.cc/150?img=42", replies: [{ id: 104, name: "Zuhura (Admin)", text: "Karibu sana kwenye familia Neema! Tuko pamoja 🚀", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 8, name: "Rashid", text: "Ukiwa makini, elfu 50 kwa siku haikukosi. Nakubali sana mfumo wenu.", avatar: "https://i.pravatar.cc/150?img=51", replies: [] },
  { id: 9, name: "Salome", text: "Leo nimetoa TZS 85,000! Ni furaha tupu. Asante sana uongozi mzima.", avatar: "https://i.pravatar.cc/150?img=45", replies: [{ id: 105, name: "Erick", text: "Hongera sana Salome! Nami naelekea huko huko 🏃‍♂️🔥", avatar: "https://i.pravatar.cc/150?img=12" }] },
  { id: 10, name: "Wakili msomi", text: "Sheria na usalama wa data ziko vizuri, na nimevutiwa sana na malipo ya papo hapo.", avatar: "https://i.pravatar.cc/150?img=59", replies: [] },
  { id: 11, name: "Hamis T.", text: "Jana usiku nimetengeneza elfu 25 nikiwa nimelala tu! Ni kazi rahisi sana.", avatar: "https://i.pravatar.cc/150?img=60", replies: [] },
  { id: 12, name: "Glory M.", text: "Naomba kuuliza, vipi kama mteja hapokei simu inakuwaje?", avatar: "https://i.pravatar.cc/150?img=41", replies: [{ id: 106, name: "Zuhura (Admin)", text: "Ukiona hapokei, bonyeza tu 'Send Order' mfumo wetu utamtafuta baadae. Utalipwa kawaida.", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 13, name: "Peter", text: "Sijawahi kuona fursa nzuri kama hii Tanzania. Mungu awazidishie.", avatar: "https://i.pravatar.cc/150?img=62", replies: [] },
  { id: 14, name: "Anna", text: "Mtaji wa 14,500 ni mdogo sana kulingana na faida unayopata. Nimerudisha mtaji siku ya kwanza.", avatar: "https://i.pravatar.cc/150?img=43", replies: [] },
  { id: 15, name: "Kaka Juma", text: "Jamani hii kitu ni fire 🔥🔥 Leo nimevuta laki nzima mbele ya macho yangu.", avatar: "https://i.pravatar.cc/150?img=53", replies: [{ id: 107, name: "Erick", text: "Kaka Juma naona unapiga hela mpaka hutaki kulala 😂", avatar: "https://i.pravatar.cc/150?img=12" }] },
  { id: 16, name: "Stella", text: "Kazi inaeleweka. Hakuna mambo ya kualika watu, unafanya kazi yako mwenyewe unalipwa.", avatar: "https://i.pravatar.cc/150?img=44", replies: [] },
  { id: 17, name: "Brian K.", text: "Kuthibitisha order ni dakika 2 tu ushamaliza na salio linasoma. Very efficient system.", avatar: "https://i.pravatar.cc/150?img=15", replies: [] },
  { id: 18, name: "Lucy", text: "Niliogopa kutapeliwa mwanzoni, lakini baada ya kupokea hela yangu ya kwanza nikapata ujasiri.", avatar: "https://i.pravatar.cc/150?img=26", replies: [{ id: 108, name: "Zuhura (Admin)", text: "Tunajali sana uaminifu wetu kwa wateja wetu. Karibu sana Lucy!", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 19, name: "Mzee wa Kazi", text: "Hii nimeipenda, naifanya nikiwa kwenye daladala naingiza hela. 💯", avatar: "https://i.pravatar.cc/150?img=68", replies: [] },
  { id: 20, name: "Diana", text: "Asante OrderVerify. Ada ya chuo nimelipa kupitia hapa.", avatar: "https://i.pravatar.cc/150?img=25", replies: [{ id: 109, name: "Hamis T.", text: "Hongera sana dada! Hii ndio maana halisi ya fursa.", avatar: "https://i.pravatar.cc/150?img=60" }] },
  { id: 21, name: "Victor", text: "Naweza kujiunga na simu ya kawaida ambayo sio smartphone?", avatar: "https://i.pravatar.cc/150?img=69", replies: [{ id: 110, name: "Zuhura (Admin)", text: "Ndio Victor, mradi iwe na uwezo wa kuingia mtandaoni kidogo inatosha.", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 22, name: "Zainab", text: "Wow, malipo yangu yameingia Tigo Pesa sasa hivi! 💃", avatar: "https://i.pravatar.cc/150?img=35", replies: [] },
  { id: 23, name: "Frank", text: "Ukiweka malengo, hii ni kazi nzuri sana. Mimi nina target ya elfu 30 kila siku.", avatar: "https://i.pravatar.cc/150?img=70", replies: [] },
  { id: 24, name: "Babu Tale", text: "Vijana changamkieni fursa hizi msilale. Kazi ni rahisi na inalipa vizuri.", avatar: "https://i.pravatar.cc/150?img=52", replies: [] },
  { id: 25, name: "Amina", text: "Mimi ni mwanafunzi na hii inanisaidia sana kupata hela ya matumizi. 📚💸", avatar: "https://i.pravatar.cc/150?img=28", replies: [] },
  { id: 26, name: "Godlisten", text: "Ukweli utabaki pale pale, hii kampuni inaeleweka sana kuliko nyingi nilizowahi kujaribu.", avatar: "https://i.pravatar.cc/150?img=61", replies: [] },
  { id: 27, name: "Rosemary", text: "Leo nilisahau kuthitisha order mbili, ila kesho napambana nifidie.", avatar: "https://i.pravatar.cc/150?img=22", replies: [] },
  { id: 28, name: "Michael", text: "Nimejisajili jana, tayari nina elfu 15 kwenye balance yangu. Very nice.", avatar: "https://i.pravatar.cc/150?img=17", replies: [] },
  { id: 29, name: "Sikudhani", text: "Hata mimi wa kijijini nimeweza kufanya kazi hii. Mtandao ukishika tu napiga hela.", avatar: "https://i.pravatar.cc/150?img=29", replies: [{ id: 111, name: "Zuhura (Admin)", text: "Pongezi kwako! Haina mipaka, kila mtu anafaidika. 🎉", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 30, name: "David M.", text: "Nimeanza na rafiki zangu watatu, wote tunafurahia kipato.", avatar: "https://i.pravatar.cc/150?img=13", replies: [] },
  { id: 31, name: "Wema", text: "Nilikuwa na wasiwasi, lakini kiukweli nimelipwa. 🤑", avatar: "https://i.pravatar.cc/150?img=32", replies: [] },
  { id: 32, name: "Samson", text: "Nahitaji maelekezo ya jinsi ya kupata order zenye bei kubwa zaidi.", avatar: "https://i.pravatar.cc/150?img=58", replies: [{ id: 112, name: "Zuhura (Admin)", text: "Ukithibitisha order nyingi mfululizo, mfumo unakuweka kwenye VIP na kuanza kuona order za thamani kubwa zaidi.", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 33, name: "Juliana", text: "Kazi nzuri sana, nimeipenda. Asante kwa nafasi.", avatar: "https://i.pravatar.cc/150?img=36", replies: [] },
  { id: 34, name: "Ben", text: "Nimetoa hela leo mara mbili bila shida. Tigo pesa wako fasta.", avatar: "https://i.pravatar.cc/150?img=57", replies: [] },
  { id: 35, name: "Christina", text: "Je, naweza kufanya kazi usiku?", avatar: "https://i.pravatar.cc/150?img=38", replies: [{ id: 113, name: "Erick", text: "Ndio Christina, order zipo muda wote 24/7. Ukiamka usiku unazikuta tu.", avatar: "https://i.pravatar.cc/150?img=12" }] },
  { id: 36, name: "Musa", text: "Hii inasaidia sana vijana kujiajiri. Safi kabisa.", avatar: "https://i.pravatar.cc/150?img=63", replies: [] },
  { id: 37, name: "Agness", text: "Sina maneno mengi, hii kazi ni 🔥🔥🔥", avatar: "https://i.pravatar.cc/150?img=39", replies: [] },
  { id: 38, name: "Shabani", text: "Nimegundua siri ya kufanikiwa hapa ni kuingia mara kwa mara kuangalia order mpya.", avatar: "https://i.pravatar.cc/150?img=64", replies: [] },
  { id: 39, name: "Rehema", text: "Naweza kuwa wakala nikiwa Mwanza?", avatar: "https://i.pravatar.cc/150?img=40", replies: [{ id: 114, name: "Zuhura (Admin)", text: "Ndio Rehema, mtandao wetu unakufikia popote ulipo Tanzania na duniani kote.", avatar: "https://i.pravatar.cc/150?img=1" }] },
  { id: 40, name: "Omari", text: "Mimi nilipata shida kwenye usajili, lakini huduma kwa wateja walinisaidia vizuri sana na sasa napiga kazi.", avatar: "https://i.pravatar.cc/150?img=65", replies: [] }
];

export const initialComments = shuffle(rawComments).map((c) => {
  const isMins = random() > 0.5;
  const timeVal = isMins ? Math.floor(random() * 59) + 1 : Math.floor(random() * 11) + 1;
  const timeUnit = isMins ? "mins ago" : "hrs ago";
  
  const replies = (c.replies || []).map(r => {
    const rIsMins = random() > 0.5;
    const rTimeVal = rIsMins ? Math.floor(random() * 59) + 1 : Math.floor(random() * 11) + 1;
    return { ...r, time: `${rTimeVal} ${rIsMins ? "mins ago" : "hrs ago"}` };
  });

  return {
    ...c,
    time: `${timeVal} ${timeUnit}`,
    replies
  };
});
