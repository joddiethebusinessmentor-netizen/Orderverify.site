const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

code = code.replace(
  'if (o.productValue < 100000 || o.productValue > 500000) {',
  'if (o.productValue < 80000 || o.productValue > 700000) {'
);
code = code.replace(
  'errors.push(`Order #${idx+1} value ${o.productValue} out of 100k-500k bounds.`);',
  'errors.push(`Order #${idx+1} value ${o.productValue} out of 80k-700k bounds.`);'
);

code = code.replace(/STORAGE_VERSION_TAG = "ov_v18_replace_coffee_thermo"/g, 'STORAGE_VERSION_TAG = "ov_v19_fix_validation_bounds"');

fs.writeFileSync('src/data.ts', code);
console.log("Updated validation bounds");
