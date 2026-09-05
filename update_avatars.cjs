const fs = require('fs');

const af_m = [
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1523825036634-ab6be0592236?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&h=150&fit=crop&crop=face'
];

const af_f = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1541260894924-7ce05c5ce6fc?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1521252659862-eec69941b071?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1523307730650-594bc63f9d67?w=150&h=150&fit=crop&crop=face'
];

const gl_m = [
  'https://images.unsplash.com/photo-1500688160051-15e52662cece?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
];

const gl_f = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
];

const as_m = [
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=150&h=150&fit=crop&crop=face'
];

const as_f = [
  'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
];

const me_m = [
  'https://images.unsplash.com/photo-1512484776495-a098c83f3e1b?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
];
const me_f = [
  'https://images.unsplash.com/photo-1564564244659-45037d45e4d7?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1502323777036-f40e35183424?w=150&h=150&fit=crop&crop=face'
];


let af_m_idx = 0;
let af_f_idx = 0;
let gl_m_idx = 0;
let gl_f_idx = 0;
let as_m_idx = 0;
let as_f_idx = 0;
let me_m_idx = 0;
let me_f_idx = 0;

let content = fs.readFileSync("src/data.ts", "utf8");
let lines = content.split("\n");
let currentCountry = "";
let currentGender = "";
let inOrderData = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("const baseOrderData = [")) {
    inOrderData = true;
  }
  
  if (inOrderData) {
    const genderMatch = lines[i].match(/gender:\s*"([^"]+)"/);
    if (genderMatch) currentGender = genderMatch[1];
    
    const countryMatch = lines[i].match(/country:\s*"([^"]+)"/);
    if (countryMatch) currentCountry = countryMatch[1];
    
    if (lines[i].includes("avatar: `https://ui-avatars.com")) {
      const isAfrica = ["Tanzania", "DR Congo", "Kenya", "Rwanda", "Uganda", "South Africa", "Burundi"].includes(currentCountry);
      const isAsia = ["China", "Japan"].includes(currentCountry);
      const isME = ["UAE", "Saudi Arabia"].includes(currentCountry);
      
      let pic = "";
      if (isAfrica) {
        if (currentGender === "male") pic = af_m[af_m_idx++ % af_m.length];
        else pic = af_f[af_f_idx++ % af_f.length];
      } else if (isAsia) {
        if (currentGender === "male") pic = as_m[as_m_idx++ % as_m.length];
        else pic = as_f[as_f_idx++ % as_f.length];
      } else if (isME) {
        if (currentGender === "male") pic = me_m[me_m_idx++ % me_m.length];
        else pic = me_f[me_f_idx++ % me_f.length];
      } else {
        // Global / US / UK / Germany / France / Brazil / India
        if (currentCountry === "India") {
            if (currentGender === "male") pic = as_m[as_m_idx++ % as_m.length];
            else pic = as_f[as_f_idx++ % as_f.length];
        } else {
            if (currentGender === "male") pic = gl_m[gl_m_idx++ % gl_m.length];
            else pic = gl_f[gl_f_idx++ % gl_f.length];
        }
      }
      
      lines[i] = `    avatar: "${pic}",`;
      
      // Reset for next
      currentCountry = "";
      currentGender = "";
    }
  }
  
  if (inOrderData && lines[i] === "];") {
     inOrderData = false;
  }
}

fs.writeFileSync("src/data.ts", lines.join("\n"));
