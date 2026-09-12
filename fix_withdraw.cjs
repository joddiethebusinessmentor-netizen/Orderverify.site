const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCode = `triggerMotivation("Ili kuruhusiwa kutoa pesa zote kwenda kwenye namba yako, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.", 7);
                      setShowRegisterConfirmModal(true);`;

const newCode = `triggerMotivation("Ili kuruhusiwa kutoa pesa zote kwenda kwenye namba yako, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.", 7);
                      if (userStatus === 'registered') {
                        setShowAlreadyRegisteredModal(true);
                      } else {
                        setShowRegisterConfirmModal(true);
                      }`;

code = code.replace(oldCode, newCode);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated withdraw modal");
