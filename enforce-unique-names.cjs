const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Find all name declarations
const names = [];
const matches = data.match(/name:\s*"([^"]+)"/g);
if (matches) {
  matches.forEach(m => names.push(m.split('"')[1]));
}

const usedFirstNames = new Set();
const duplicateReplacements = {};
let counter = 1;

// We need a list of alternative unique first names to replace duplicates
const altFirstNames = [
  'Zack', 'Xavier', 'Vincent', 'Ulysses', 'Tim', 'Steve', 'Richard', 'Quincy', 'Paul', 'Omar', 'Nolan',
  'Mike', 'Leo', 'Kyle', 'John', 'Isaac', 'Hector', 'George', 'Frank', 'Edward', 'Dan', 'Carl', 'Ben', 'Aaron',
  'Zara', 'Yvonne', 'Wendy', 'Victoria', 'Uma', 'Tina', 'Sarah', 'Rachel', 'Queen', 'Penny', 'Olivia', 'Nina',
  'Mia', 'Lucy', 'Kara', 'Julia', 'Ivy', 'Hannah', 'Gina', 'Fiona', 'Eva', 'Diana', 'Chloe', 'Betty', 'Alice',
  'Tariq', 'Said', 'Rashid', 'Qasim', 'Pato', 'Othman', 'Nassor', 'Musa', 'Luka', 'Kobe', 'Jafari', 'Idris',
  'Hassan', 'Gambo', 'Fadhili', 'Elisha', 'Daud', 'Chacha', 'Babu', 'Abasi',
  'Zuhura', 'Yasmin', 'Wema', 'Vena', 'Tumaini', 'Sia', 'Rukia', 'Pendo', 'Oksana', 'Nuru', 'Mwana', 'Lulu',
  'Khadija', 'Johari', 'Imani', 'Hawa', 'Ghati', 'Farida', 'Ester', 'Dora', 'Chausiku', 'Bint', 'Aida'
];

let altIndex = 0;

names.forEach(fullName => {
  const parts = fullName.split(' ');
  const firstName = parts[0];
  if (usedFirstNames.has(firstName)) {
    // Duplicate found, replace it
    let newFirstName = altFirstNames[altIndex++];
    while (usedFirstNames.has(newFirstName)) {
       newFirstName = altFirstNames[altIndex++];
    }
    const newFullName = newFirstName + ' ' + parts.slice(1).join(' ');
    duplicateReplacements[fullName] = newFullName;
    usedFirstNames.add(newFirstName);
  } else {
    usedFirstNames.add(firstName);
  }
});

// Now replace them in the file
for (const [oldName, newName] of Object.entries(duplicateReplacements)) {
  // Be careful with replacing to only replace the exact name inside quotes
  const regex = new RegExp('name:\\s*"' + oldName + '"', 'g');
  data = data.replace(regex, 'name: "' + newName + '"');
}

fs.writeFileSync('src/data.ts', data);
console.log('Fixed', Object.keys(duplicateReplacements).length, 'duplicate names.');
