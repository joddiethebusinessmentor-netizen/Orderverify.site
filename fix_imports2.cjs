const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'import { UserCheck, motion, AnimatePresence } from \'motion/react\';',
  'import { motion, AnimatePresence } from \'motion/react\';'
);

code = code.replace(
  'import { CheckCircle2,',
  'import { UserCheck, CheckCircle2,'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed imports again");
