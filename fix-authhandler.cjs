const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHandler = `  const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'visitor') {
      setAuthModalState({ show: true, type: 'register', message });
    } else if (userStatus === 'registered') {
      setAuthModalState({ show: true, type: 'payment', message: message + " Tafadhali lipia mtaji wa 14,500 kwanza." });
    }
  };`;
const newHandler = `  const handleActionRequiresAuth = (message: string) => {
    triggerMotivation("Tafadhali jisajili kisha ulipie mtaji wa 14,500/= ili uweze kuendelea na hatua hii.");
    setTimeout(() => {
      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
    }, 2500);
  };`;
content = content.replace(oldHandler, newHandler);
fs.writeFileSync('src/App.tsx', content);
