const fs = require('fs');

const appFile = 'src/App.tsx';
let app = fs.readFileSync(appFile, 'utf8');

const warningComponent = `
// --- In-App Browser Warning Component ---
function InAppBrowserWarning() {
  const handleOpenBrowser = () => {
    // Attempt standard window open
    window.open(window.location.href, '_blank');
    
    // For Android, fallback to intent URL for Chrome
    const isAndroid = /android/i.test(navigator.userAgent);
    if (isAndroid) {
      const url = window.location.href.replace(/^https?:\\/\\//, '');
      window.location.href = \`intent://\${url}#Intent;scheme=https;package=com.android.chrome;end;\`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe className="w-10 h-10 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Fungua kwenye Browser</h1>
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          Ili kufurahia OrderVerify bila matatizo (kama kuangalia video), tafadhali fungua kupitia browser yako (Chrome, Safari, n.k).
        </p>
        
        <div className="bg-slate-800/50 rounded-xl p-4 mb-8 border border-slate-700/50">
          <p className="text-slate-300 text-sm font-medium mb-2">Hatua za kufuata (Kama kitufe hakifanyi kazi):</p>
          <ol className="text-left text-sm text-slate-400 space-y-2 list-decimal list-inside">
            <li>Bofya vitufe vitatu <span className="font-bold text-white">(⋮)</span> au <span className="font-bold text-white">(⋯)</span> hapo juu kulia.</li>
            <li>Chagua <span className="font-bold text-white">"Open in Browser"</span> au <span className="font-bold text-white">"Fungua kwenye Browser"</span>.</li>
          </ol>
        </div>

        <button 
          onClick={handleOpenBrowser}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Globe className="w-5 h-5" />
          <span>Open in Browser</span>
        </button>
      </div>
    </div>
  );
}
`;

if (!app.includes('InAppBrowserWarning')) {
  // Insert before export default function App()
  app = app.replace('export default function App() {', warningComponent + '\nexport default function App() {');
  
  // Add state to App
  const appStart = `export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  useEffect(() => {
    // Check for TikTok or other in-app browsers
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const inAppRegex = /TikTok|Bytedance|FBAV|FBAN|Instagram|Line|Snapchat/i;
    if (inAppRegex.test(userAgent)) {
      setIsInAppBrowser(true);
    }
  }, []);
`;
  app = app.replace(/export default function App\(\) \{\s*const \[isAgeVerified, setIsAgeVerified\] = useState\(false\);/, appStart);
  
  // Add conditional render
  const condition = `
  if (isInAppBrowser) {
    return <InAppBrowserWarning />;
  }

  if (!isAgeVerified) {`;
  app = app.replace('  if (!isAgeVerified) {', condition);
  
  fs.writeFileSync(appFile, app);
  console.log('Successfully injected in-app browser detection and warning screen.');
} else {
  console.log('Already injected.');
}
