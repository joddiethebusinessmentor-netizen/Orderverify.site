const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove text from LiveClock
content = content.replace(
  '<p className="text-white text-sm font-bold">Data Hubadilika Kila Baada ya Masaa 12</p>',
  ''
);

// 2. Update Orodha instructions
content = content.replace(
  '<div className="inline-flex items-center gap-2 bg-[#1C1D24] border border-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-lg">\n            📅 Orodha Zilizopo Sasa Hivi\n          </div>',
  `<div className="inline-flex flex-col items-center gap-2 bg-[#1C1D24] border border-slate-700 px-4 py-3 rounded-2xl text-xs shadow-lg max-w-lg mx-auto">
            <span className="font-bold text-sm">📅 Orodha Zilizopo Sasa Hivi</span>
            <p className="text-slate-300 text-center font-medium leading-relaxed border-t border-slate-700 pt-2">
              <strong className="text-[#00E676]">Jinsi ya kuanza:</strong> Kusoma maelezo ya mteja kwanza, kisha bonyeza <span className="bg-[#00E676]/20 text-[#00E676] px-2 py-0.5 rounded">Thibitisha Order</span> na ufuate hatua zinazofuata ili kuingiza kamisheni yako.
            </p>
          </div>`
);

// 3. Add Loader2 to lucide imports
if (!content.includes('Loader2')) {
  content = content.replace('import { CheckCircle2, ChevronRight, ', 'import { CheckCircle2, ChevronRight, Loader2, ');
}

// 4. Inject global loading state and wrapper inside Dashboard
const globalLoadingState = `
  const [globalLoading, setGlobalLoading] = useState(false);
  
  const runWithLoader = (action: () => void) => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      action();
    }, 2500); // 2.5 seconds loading simulation
  };
`;
content = content.replace('function Dashboard() {\n  const [balance, setBalance] = useState(0);', 'function Dashboard() {\n' + globalLoadingState + '\n  const [balance, setBalance] = useState(0);');

// 5. Replace onClick actions with runWithLoader
content = content.replace(
  /onClick=\{\(\) => handleActionRequiresAuth/g,
  'onClick={() => runWithLoader(() => handleActionRequiresAuth'
);
// Fix the closing parentheses for these replacements
// "Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza.")}
content = content.replace(
  /jisajili kwanza\."\)\}/g,
  'jisajili kwanza."))} '
);
content = content.replace(
  /usajili wa akaunti kwanza\."\)\}/g,
  'usajili wa akaunti kwanza."))} '
);
content = content.replace(
  /tafadhali jisajili kwanza\."\)\}/g,
  'tafadhali jisajili kwanza."))} '
);
// The install app button
content = content.replace(
  /onClick=\{\(\) => handleActionRequiresAuth\("Ili ku-install App, tafadhali jisajili kwanza\."\)\}/g,
  'onClick={() => runWithLoader(() => handleActionRequiresAuth("Ili ku-install App, tafadhali jisajili kwanza."))}'
);

// 6. Comments submit
content = content.replace(
  'setComments([newCommentObj, ...comments]);\n    setNewCommentText("");',
  'runWithLoader(() => {\n      setComments([newCommentObj, ...comments]);\n      setNewCommentText("");\n    });'
);

// 7. Withdraw button
content = content.replace(
  'onClick={() => setShowWithdrawModal(true)}',
  'onClick={() => runWithLoader(() => setShowWithdrawModal(true))}'
);

// 8. Order confirm click (setActiveVerification)
content = content.replace(
  'onClick={() => setActiveVerification(order)}',
  'onClick={() => runWithLoader(() => setActiveVerification(order))}'
);

// 9. Pagination buttons
content = content.replace(
  'onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}',
  'onClick={() => runWithLoader(() => setCurrentPage(prev => Math.max(prev - 1, 1)))}'
);
content = content.replace(
  'onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}',
  'onClick={() => runWithLoader(() => setCurrentPage(prev => Math.min(prev + 1, totalPages)))}'
);

// 10. Voice/Video call simulate
content = content.replace(
  'onClick={() => simulateCall(\'calling-video\')}',
  'onClick={() => runWithLoader(() => simulateCall(\'calling-video\'))}'
);
content = content.replace(
  'onClick={() => simulateCall(\'calling-voice\')}',
  'onClick={() => runWithLoader(() => simulateCall(\'calling-voice\'))}'
);

// 11. Add GlobalLoader component at the end of Dashboard render (before final </div>)
const globalLoaderJSX = `
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {globalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0C10]/80 backdrop-blur-sm"
          >
            <Loader2 className="w-12 h-12 text-[#00E676] animate-spin mb-4" />
            <p className="text-white font-bold text-sm animate-pulse">Inapakia...</p>
          </motion.div>
        )}
      </AnimatePresence>
`;
content = content.replace('      {/* Withdraw Modal */}', globalLoaderJSX + '\n      {/* Withdraw Modal */}');

fs.writeFileSync('src/App.tsx', content);
