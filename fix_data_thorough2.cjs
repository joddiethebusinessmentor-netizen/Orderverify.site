const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');

// Force epoch seed change
code = code.replace(/let s = epoch \* \d+ \+ \d+;/, 'let s = epoch * 9876 + 5432;');

// Update baseOrderData using string concatenation instead of template literals
const newProducts = [
  { p: "Samsung Galaxy A14", v: 280000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80&fit=crop" },
  { p: "Sony Wireless Headphones", v: 150000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&fit=crop" },
  { p: "Apple Watch Series 3", v: 290000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80&fit=crop" },
  { p: "Lenovo Ideapad (Used)", v: 299000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80&fit=crop" },
  { p: "Canon Digital Camera", v: 250000, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80&fit=crop" },
  { p: "Nike Air Max Sneakers", v: 120000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80&fit=crop" },
  { p: "Dior Sauvage Perfume", v: 180000, img: "https://images.unsplash.com/photo-1523293115678-d2900f52f461?w=500&q=80&fit=crop" },
  { p: "Ray-Ban Aviator Glasses", v: 130000, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80&fit=crop" },
  { p: "JBL Bluetooth Speaker", v: 110000, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80&fit=crop" },
  { p: "Amazon Fire Tablet", v: 170000, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80&fit=crop" },
  { p: "DJI Mini Drone", v: 275000, img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&q=80&fit=crop" },
  { p: "PS4 Controller", v: 105000, img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80&fit=crop" },
  { p: "Studio Microphone", v: 220000, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80&fit=crop" },
  { p: "Smart Blender", v: 145000, img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80&fit=crop" },
  { p: "Coffee Maker", v: 260000, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80&fit=crop" },
  { p: "Tecno Spark 10", v: 240000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80&fit=crop" },
  { p: "Mechanical Keyboard", v: 115000, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80&fit=crop" },
  { p: "Wireless Mouse", v: 100000, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80&fit=crop" },
  { p: "Security Camera", v: 135000, img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80&fit=crop" },
  { p: "AirPods Pro", v: 295000, img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80&fit=crop" }
];

let pIndex = 0;
// Note: We'll replace lines safely
const lines = code.split('\n');
let insideOrderData = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const baseOrderData = [')) {
    insideOrderData = true;
  }
  if (insideOrderData && lines[i].includes('];')) {
    insideOrderData = false;
  }
  
  if (insideOrderData) {
    if (lines[i].includes('product: "')) {
      const p = newProducts[pIndex % newProducts.length];
      lines[i] = '    product: "' + p.p + '",';
      lines[i+1] = '    productValue: ' + p.v + ',';
      lines[i+2] = '    payout: ' + (p.v * 0.05) + ',';
      
      // Lines[i+3] is avatar
      
      lines[i+4] = '    productImage: "' + p.img + '"';
      pIndex++;
    }
  }
}
code = lines.join('\n');

// 2. Fix generate6HourComments logic to generate ~45 comments
code = code.replace(
  'const commentMembers = shuffled.slice(0, 10 + Math.floor(rnd() * 8));',
  'const commentMembers = shuffled.slice(0, 42 + Math.floor(rnd() * 8));'
);

// 3. Update comment templates string
const cStr = 'const commentTemplates = [\n' +
'  { q: (m, p) => "Kiukweli huu mtandao umenisaidia sana! Nimeverify order ya " + p + " asubuhi hii na tayari wamenitumia kamisheni yangu moja kwa moja TigoPesa. Siwezi kuacha kufanya hii kazi. 🔥💸", tag: "Malipo Yamepokelewa 💰", reply: null },\n' +
'  { q: (m) => "Nilianza kwa kusuasua maana nishawahi kupigwa mtandaoni, lakini OrderVerify ni level nyingine! Nimetoa elfu 12 yangu leo asubuhi na imeingia bila makato yoyote. Asanteni sana! 🙌", tag: "Ushuhuda Halisi ✨", reply: () => ({ name: "Support Team", text: "Tupo hapa kuhakikisha kila mwanachama anafaidika. Endelea kupiga kazi!" }) },\n' +
'  { q: (m, p) => "Jamani kazi ni nyepesi mno! Unabofya tu kudhibitisha mteja aliyenunua " + p + ", na asilimia tano inasoma kwenye akaunti yako. Leo nishatengeneza TZS 14,000 nikiwa nimekaa sebuleni. 📺🤑", tag: "Oda Imethibitishwa 📦", reply: null },\n' +
'  { q: (m) => "Kama bado unalaza damu unakosa pesa za bure! Mtaji wa 14,500 niliouweka juzi, leo nisharudisha mara mbili yake. M-Pesa inasoma TZS 28,500 mchana huu. Hii sio ya kukosa! 🚀💪", tag: "Mtaji Umerudi Haraka ⚡", reply: null },\n' +
'  { q: (m) => "Siamini macho yangu, meseji ya Halopesa ndio inaingia hivi punde! Nashukuru sana kwa fursa hii, angalau sasa naweza kujinunulia vocha na bando bila kuomba mtu. 🙏📱", tag: "Malipo Yamepokelewa 💰", reply: null },\n' +
'  { q: (m) => "Nimekuwa nikiifanya hii kazi kama part-time baada ya kutoka chuo. Hela ninayopata hapa inanisaidia kulipia kodi ya geto na matumizi madogo madogo. OrderVerify mko vizuri sana! 🎓🎒", tag: "Kipato cha Ziada 📱", reply: null },\n' +
'  { q: (m, p) => "Order ya " + p + " imepita na kamisheni imeingia papo hapo. Nawaambia vijana wenzangu, acheni ubishi, wekeni mtaji wa 14,500 mtaona matokeo yake ndani ya siku moja tu! 💯🔥", tag: "Neno la Hamasa 🔥", reply: null },\n' +
'  { q: (m) => "Airtel Money imesoma TZS 13,000 sekunde chache zilizopita! Hii pesa inaenda kununua unga wa ugali leo jioni. Mungu awabariki sana waanzilishi wa huu mfumo. 🍽️🤲", tag: "Shukrani ya Mwanachama 🙏", reply: () => ({ name: "Amina (Meneja Mauzo)", text: "Amina sana! Tunafurahi kuona OrderVerify inaleta mabadiliko kwenye maisha ya kila siku." }) },\n' +
'  { q: (m) => "Wale wanaosema mtandaoni hakuna hela waache waendelee kulala. Mimi nishatoa zaidi ya elfu 50 wiki hii kwa kufanya kazi ndogo tu ya ku-verify orders. Kila mtu ana haki ya kuamua! 🤣🏃‍♂️💨", tag: "Ushauri wa Kujituma 💡", reply: null },\n' +
'  { q: (m, p) => "Nimemaliza kuverify order ya " + p + " ya mteja kutoka huku huku " + m.city + ". Mfumo unasoma vizuri sana, hauna delay wala mambo mengi. Straight to the point! ⚡✅", tag: "Oda Imethibitishwa 📦", reply: null },\n' +
'  { q: (m) => "Mtaji 14,500/= unatengeneza faida ya elfu 10 hadi 20 kila siku kulingana na juhudi zako. Huu ni uwekezaji mzuri sana ukilinganisha na biashara nyingi za mtaani. Nawashauri msipitwe! 📊💵", tag: "Ushauri wa Kujituma 💡", reply: null },\n' +
'  { q: (m) => "Nimepokea malipo yangu ya TZS 10,500 asubuhi hii. Nilitoa usiku wa manane nikadhani italala, kumbe mfumo wao uko active masaa 24! Asante sana OrderVerify. 🌙💸", tag: "Malipo Yamepokelewa 💰", reply: null },\n' +
'  { q: (m, p) => "Kazi nzuri sana OrderVerify. Kukamilisha order ya " + p + " imechukua sekunde chache. TigoPesa inasoma. Asanteni. 👍", tag: "Malipo Yamepokelewa 💰", reply: null },\n' +
'  { q: (m) => "Kwa kweli huu mfumo unasaidia vijana sana, hasa ukiwa huna ajira. Ninajipatia riziki yangu hapa bila shida yoyote. 🙌", tag: "Ushuhuda Halisi ✨", reply: null },\n' +
'  { q: (m, p) => "Mteja amenunua " + p + " leo na mimi nimepata asilimia 5 yangu papo hapo. Pesa ya supu imepatikana! 🍲", tag: "Oda Imethibitishwa 📦", reply: null },\n' +
'  { q: (m) => "Asante OrderVerify. Leo nimepokea hela yangu ya kwanza kabisa baada ya kuweka mtaji jana tu. Mungu awabariki sana. 💸", tag: "Shukrani ya Mwanachama 🙏", reply: () => ({ name: "Support Team", text: "Karibu sana! Endelea kufurahia huduma zetu." }) }\n' +
'];\n';

const cStart = code.indexOf('const commentTemplates = [');
const cEnd = code.indexOf('];\n\n  const comments = commentMembers.map');
if (cStart !== -1 && cEnd !== -1) {
  code = code.substring(0, cStart) + cStr + code.substring(cEnd + 3);
}

fs.writeFileSync('src/data.ts', code);
console.log('Fixed data smoothly.');
