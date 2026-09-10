const fs = require('fs');
let codeData = fs.readFileSync('src/data.ts', 'utf8');

codeData = codeData.replace(/if \(setP1\.size !== 12\) errors\.push\("Page 1 has duplicate products internally\."\);/g, 'if (setP1.size !== 10) errors.push("Page 1 has duplicate products internally.");');
codeData = codeData.replace(/if \(setP2\.size !== 12\) errors\.push\("Page 2 has duplicate products internally\."\);/g, 'if (setP2.size !== 10) errors.push("Page 2 has duplicate products internally.");');
codeData = codeData.replace(/if \(setP3\.size !== 12\) errors\.push\("Page 3 has duplicate products internally\."\);/g, 'if (setP3.size !== 10) errors.push("Page 3 has duplicate products internally.");');

fs.writeFileSync('src/data.ts', codeData);
console.log("Fixed validation set sizes");
