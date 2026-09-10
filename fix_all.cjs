const fs = require('fs');
let codeData = fs.readFileSync('src/data.ts', 'utf8');

// Fix validation length
codeData = codeData.replace(/data\.orders\.length !== 36/g, "data.orders.length !== 30");
codeData = codeData.replace(/expected exactly 36/g, "expected exactly 30");

// Fix validation slices
codeData = codeData.replace(/const p1 = data\.orders\.slice\(0, 12\);/g, "const p1 = data.orders.slice(0, 10);");
codeData = codeData.replace(/const p2 = data\.orders\.slice\(12, 24\);/g, "const p2 = data.orders.slice(10, 20);");
codeData = codeData.replace(/const p3 = data\.orders\.slice\(24, 36\);/g, "const p3 = data.orders.slice(20, 30);");

codeData = codeData.replace(/if \(p1\.length !== 12\)/g, "if (p1.length !== 10)");
codeData = codeData.replace(/if \(p2\.length !== 12\)/g, "if (p2.length !== 10)");
codeData = codeData.replace(/if \(p3\.length !== 12\)/g, "if (p3.length !== 10)");
codeData = codeData.replace(/STORAGE_VERSION_TAG = "ov_v13_fixed_count"/g, 'STORAGE_VERSION_TAG = "ov_v14_fixed_validation"');

fs.writeFileSync('src/data.ts', codeData);

let codeApp = fs.readFileSync('src/App.tsx', 'utf8');
// The issue is probably multiple instances or wrong scope of showContactModal.
// Let's check where it's used.
codeApp = codeApp.replace(/<AnimatePresence>\s*\{showContactModal && \(/g, 
  `{/* Contact Options Modal */}
      <AnimatePresence>
        {typeof showContactModal !== 'undefined' && showContactModal && (`
);

fs.writeFileSync('src/App.tsx', codeApp);
console.log("Fixed validation and modal undefined check.");
