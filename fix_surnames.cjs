const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const newSurnames = `"Ghana": ["Mensah", "Osei", "Owusu", "Boateng", "Appiah", "Addo"],
  "Senegal": ["Ndiaye", "Diop", "Fall", "Sarr", "Sy", "Faye"],
  "Ethiopia": ["Bekele", "Tadesse", "Alemu", "Girma", "Mekonnen"],
  "Zimbabwe": ["Moyo", "Sibanda", "Ndlovu", "Ncube", "Chauke"],
  "Botswana": ["Molefe", "Gaborone", "Mogae", "Khama", "Masire"],
  "Mozambique": ["Chissano", "Machel", "Nyusi", "Guebuza", "Dhlakama"],
  "Egypt": ["Mahmoud", "Ali", "Ibrahim", "Hassan", "Mostafa"],
  "Morocco": ["Alaoui", "Bennani", "Chraibi", "Tahiri", "Lahlou"],
  "Cameroon": ["Biya", "Eto'o", "Mbia", "Song", "Kameni"],
  "Madagascar": ["Rajoelina", "Ravalomanana", "Ratsiraka", "Rakotoarimanana"],
  "Ivory Coast": ["Bédié", "Ouattara", "Gbagbo", "Touré", "Drogba"],
  "Mali": ["Keïta", "Touré", "Traoré", "Coulibaly", "Diarra"],`;

content = content.replace(/"Tanzania": \["Mrope"/, newSurnames + '\n  "Tanzania": ["Mrope"');

fs.writeFileSync('src/data.ts', content);
console.log("Surnames updated.");
