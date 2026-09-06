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
