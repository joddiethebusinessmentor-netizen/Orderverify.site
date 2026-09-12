const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCode = `setShowInstallAppModal(false);
                    setRegisterModalStep('instructions');
                    setShowRegisterConfirmModal(true);`;

const newCode = `setShowInstallAppModal(false);
                    if (userStatus === 'registered') {
                      setShowAlreadyRegisteredModal(true);
                    } else {
                      setRegisterModalStep('instructions');
                      setShowRegisterConfirmModal(true);
                    }`;

code = code.replace(oldCode, newCode);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated install app modal");
