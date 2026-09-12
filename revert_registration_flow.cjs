const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove state
code = code.replace(
  "const [showPaymentGuide, setShowPaymentGuide] = useState(false);\n  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);",
  "const [showPaymentGuide, setShowPaymentGuide] = useState(false);"
);

// 2. Revert openRegisterModal
const newOpenRegisterModal = `const openRegisterModal = () => {
    setShowTopNotification(false);
    if (userStatus === 'registered') {
      setShowAlreadyRegisteredModal(true);
    } else {
      setRegisterModalStep('confirm');
      setShowRegisterConfirmModal(true);
    }
  };`;
const oldOpenRegisterModal = `const openRegisterModal = () => {
    setShowTopNotification(false);
    setRegisterModalStep('confirm');
    setShowRegisterConfirmModal(true);
  };`;
code = code.replace(newOpenRegisterModal, oldOpenRegisterModal);

// 3. Revert window.open logic
const newWindowOpen = `setShowRegisterConfirmModal(false);
                      setUserStatus('registered');
                      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");`;
const oldWindowOpen = `setShowRegisterConfirmModal(false);
                      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");`;
code = code.replace(newWindowOpen, oldWindowOpen);

// 4. Revert handleActionRequiresAuth
const newHandleAuth = `const handleActionRequiresAuth = (message: string) => {
    if (userStatus === 'registered') {
      setShowAlreadyRegisteredModal(true);
    } else {
      setShowRegisterConfirmModal(true);
    }
  };`;
const oldHandleAuth = `const handleActionRequiresAuth = (message: string) => {
    setShowRegisterConfirmModal(true);
  };`;
code = code.replace(newHandleAuth, oldHandleAuth);

// 5. Revert withdraw
const newWithdraw = `triggerMotivation("Ili kuruhusiwa kutoa pesa zote kwenda kwenye namba yako, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.", 7);
                      if (userStatus === 'registered') {
                        setShowAlreadyRegisteredModal(true);
                      } else {
                        setShowRegisterConfirmModal(true);
                      }`;
const oldWithdraw = `triggerMotivation("Ili kuruhusiwa kutoa pesa zote kwenda kwenye namba yako, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.", 7);
                      setShowRegisterConfirmModal(true);`;
code = code.replace(newWithdraw, oldWithdraw);

// 6. Revert install app
const newInstall = `setShowInstallAppModal(false);
                    if (userStatus === 'registered') {
                      setShowAlreadyRegisteredModal(true);
                    } else {
                      setRegisterModalStep('instructions');
                      setShowRegisterConfirmModal(true);
                    }`;
const oldInstall = `setShowInstallAppModal(false);
                    setRegisterModalStep('instructions');
                    setShowRegisterConfirmModal(true);`;
code = code.replace(newInstall, oldInstall);

// 7. Remove Already Registered Modal JSX
const alreadyRegisteredStart = code.indexOf('{/* Already Registered Modal */}');
const paymentGuideStart = code.indexOf('{/* Payment Guide Modal */}');

if (alreadyRegisteredStart !== -1 && paymentGuideStart !== -1) {
  code = code.substring(0, alreadyRegisteredStart) + code.substring(paymentGuideStart);
}

fs.writeFileSync('src/App.tsx', code);
console.log("Reverted registration flow successfully.");
