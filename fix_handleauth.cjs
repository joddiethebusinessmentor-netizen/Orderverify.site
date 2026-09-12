const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldHandleAuth = `const handleActionRequiresAuth = (message: string) => {
    setShowRegisterConfirmModal(true);
  };`;

const newHandleAuth = `const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'registered') {
      setShowAlreadyRegisteredModal(true);
    } else {
      setShowRegisterConfirmModal(true);
    }
  };`;

code = code.replace(oldHandleAuth, newHandleAuth);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated handleActionRequiresAuth");
