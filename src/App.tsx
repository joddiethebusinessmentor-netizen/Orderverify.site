import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Wallet, 
  UserPlus, MessageCircle, Send, Globe, MessageSquare, X, Loader2,
  Activity, ChevronRight, ChevronLeft, Smartphone, Users, ArrowDownToLine, ChevronDown, PhoneCall,
  Video, Phone, Mic, PhoneOff, CreditCard, ShieldCheck
} from 'lucide-react';
import { orderData, livePayouts, initialComments, generate6HourComments, formatLocalCurrency, update6HourDataIfChanged } from './data';
import { TutorialVideoSection } from './components/TutorialVideoSection';

// --- Toast Component ---
function Toast({ message, visible }: { message: string, visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
          className="fixed top-1/2 left-1/2 z-[100] flex justify-center pointer-events-none w-max max-w-[90vw]"
        >
          <div className="bg-[#00E676] text-black px-6 py-4 rounded-3xl font-bold shadow-2xl flex flex-col items-center gap-2 text-center border-4 border-[#1C1D24]">
            <CheckCircle2 className="w-8 h-8 mb-1" />
            <p className="text-sm">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Function to generate name initials (e.g. Juma Hamisi -> JH)
function getInitials(name: string): string {
  if (!name) return "OV";
  // Remove content in brackets/parentheses like "(Afisa wa Huduma)", "(Mwanachama)", "(Dar es Salaam)"
  const clean = name.replace(/\(.*?\)/g, "").replace(/[^a-zA-Z\s]/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "OV";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// --- Age Verification / Welcome Gateway Screen ---
function AgeVerification({ onVerify }: { onVerify: () => void }) {
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEnter = () => {
    if (!isChecked) {
      setErrorMsg("Tafadhali bonyeza kibox kuthibitisha kuwa una umri wa zaidi ya miaka 18+ kwanza.");
      return;
    }
    onVerify();
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden">
      {/* Ambient soft glow background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E676]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#141520] p-6 sm:p-8 rounded-3xl max-w-lg w-full border-2 border-emerald-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-slate-100 relative z-10"
      >
        {/* LOGO RASMI YA ORDERVERIFY (Ukubwa wa kawaida usiozidi sana) */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative mb-3 flex items-center justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00E676]/35 via-emerald-400/25 to-[#00E676]/35 rounded-2xl blur-md opacity-60" />
            <div className="relative bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border border-emerald-400/40 shadow-xl flex items-center justify-center">
              <img 
                src="/orderverify_official_logo.jpg" 
                alt="OrderVerify Logo" 
                className="h-12 sm:h-14 w-auto max-w-[190px] object-contain block"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-[#00E676] text-[11px] font-black tracking-wider uppercase mb-2">
            <span>✨</span> WELCOME TO ORDERVERIFY SITE <span>✨</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-snug">
            JIINGIZIE KIPATO KUPITIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00C853]">ORDERVERIFY</span>
          </h1>
        </div>

        {/* Maneno aliyoagiza mtumiaji na style nzuri ya kuvutia */}
        <div className="bg-[#181A26] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-5 text-left shadow-inner space-y-3.5">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            <span className="text-[#00E676] font-bold">OrderVerify</span> inakupa fursa ya kujiingizia kipato cha uhakika kwa kuthibitisha order za wateja kwa kuwatumia message za uthibitisho na kuzungumza nao, na kuisaidia kampuni yetu kutokupoteza wateja walio request hizo order kwa kupitia mawasiliano ya moja kwa moja ndani ya site ya <span className="text-[#00E676] font-bold">OrderVerify</span>.
          </p>
        </div>

        {/* Emoji ya mkono inayomwelekeza mteja kubonyeza kibox na kitufe */}
        <div className="bg-[#121420] border border-amber-400/40 rounded-2xl p-3.5 mb-5 text-left flex items-center gap-3 shadow-md">
          <span className="text-3xl shrink-0 animate-bounce">👇</span>
          <p className="text-xs sm:text-sm text-amber-200 font-bold leading-snug">
            Tafadhali weka alama ya tiki kwenye kibox hapa chini, kisha bonyeza kitufe cha <span className="text-white bg-slate-800 px-2 py-0.5 rounded font-black border border-slate-700">INGIA NDANI YA SITE</span> ili kufungua website.
          </p>
        </div>

        {/* Thibitisha Umri - Mfumo wa Kibox (Checkbox) yenye 18+ pekee */}
        <div className="space-y-3 text-left">
          <div 
            onClick={() => {
              setIsChecked(!isChecked);
              setErrorMsg("");
            }}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
              isChecked 
                ? 'bg-[#00E676]/15 border-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.3)]' 
                : 'bg-[#0B0C12] border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
              isChecked 
                ? 'bg-[#00E676] border-[#00E676] text-black shadow-sm' 
                : 'border-slate-500 bg-slate-900'
            }`}>
              {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
            </div>
            <label className="text-xs sm:text-sm text-white font-bold cursor-pointer leading-snug">
              Nina umri wa zaidi ya miaka 18+
            </label>
          </div>

          {errorMsg && (
            <p className="text-xs text-amber-400 font-bold flex items-center gap-1.5 px-1 animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{errorMsg}</span>
            </p>
          )}

          <button 
            onClick={handleEnter}
            className={`w-full font-black py-4 px-5 rounded-2xl transition-all shadow-xl text-sm sm:text-base uppercase tracking-wider cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
              isChecked
                ? 'bg-gradient-to-r from-[#00E676] via-[#00D069] to-[#00B259] hover:brightness-110 text-black shadow-[#00E676]/35'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-400 border border-slate-700'
            }`}
          >
            <span>INGIA NDANI YA SITE</span>
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Trust Note chini */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <span>🔒 Tovuti Salama • Malipo ya Papo Hapo M-Pesa, Airtel, Tigo & HaloPesa</span>
        </div>
      </motion.div>
    </div>
  );
}

function TopPopupTicker() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(() => Math.floor(Math.random() * livePayouts.length));
  const [displayCount, setDisplayCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Taarifa hubadilika kila baada ya sekunde 15 (15000ms)
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        // Chagua mwanachama mwingine wa nasibu (bila kurudia aliyepita mara moja)
        setCurrentMemberIndex((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * livePayouts.length);
          } while (next === prev && livePayouts.length > 1);
          return next;
        });

        setDisplayCount((c) => c + 1);
        setIsVisible(true);
      }, 400);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentPayout = livePayouts[currentMemberIndex] || livePayouts[0];
  // Ondoa jina la mkoa kabisa, libaki jina la mwanachama pekee
  const cleanName = (currentPayout.name || "").replace(/\(.*?\)/g, "").trim();

  return (
    <div className="w-full flex justify-center items-center px-2 sm:px-4 pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={displayCount}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl sm:rounded-full py-2.5 px-4 sm:px-6 shadow-2xl flex items-center justify-center gap-2.5 text-xs sm:text-sm text-white max-w-xl w-auto text-center pointer-events-auto"
          >
            <div className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse bg-[#00E676] shadow-[0_0_8px_#00E676]" />
            <p className="leading-snug text-slate-200 text-center font-medium">
              Hongera <strong className="font-black text-white">{cleanName}</strong> kwa kulipwa{" "}
              <span className="font-black text-[#00E676]">{currentPayout.amountStr}</span> kwa kuthibitisha order
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function LiveClock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => { setTime(new Date()); update6HourDataIfChanged(); }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateString = time.toLocaleDateString('sw-TZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className="bg-[#1C1D24] border border-slate-800 rounded-2xl p-4 mb-2 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="bg-[#00E676]/20 p-2 rounded-lg">
          <Activity className="w-5 h-5 text-[#00E676] animate-pulse" />
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
          <span className="text-xs text-slate-400 font-bold block mb-0.5">Tarehe</span>
          <span className="text-sm text-white font-black">{dateString}</span>
        </div>
        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
          <span className="text-xs text-slate-400 font-bold block mb-0.5">Saa (Live)</span>
          <span className="text-sm text-[#00E676] font-black">{timeString}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Dashboard ---

function Dashboard() {

  const [globalLoading, setGlobalLoading] = useState(false);
  
  const runWithLoader = (action: () => void) => {
    setShowTopNotification(false);
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      action();
    }, 2000); // 2 seconds loading simulation
  };

  const [userStatus, setUserStatus] = useState<"visitor" | "registered" | "activated">(() => {
    const saved = localStorage.getItem('orderverify_status');
    return (saved as "visitor" | "registered" | "activated") || "visitor";
  });
  
  useEffect(() => {
    localStorage.setItem('orderverify_status', userStatus);
  }, [userStatus]);

  const [balance, setBalance] = useState(0);
  const [verifiedOrders, setVerifiedOrders] = useState<number[]>([]);

  const [authModalState, setAuthModalState] = useState<{show: boolean, type: 'register' | 'payment', message: string}>({show: false, type: 'register', message: ''});
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPaymentGuide, setShowPaymentGuide] = useState(false);
  const [showRegisterConfirmModal, setShowRegisterConfirmModal] = useState(false);
  const [registerModalStep, setRegisterModalStep] = useState<'confirm' | 'instructions'>('confirm');
  const [showInstallAppModal, setShowInstallAppModal] = useState(false);

  const openRegisterModal = () => {
    setShowTopNotification(false);
    setRegisterModalStep('confirm');
    setShowRegisterConfirmModal(true);
  };
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  
  const [topNotification, setTopNotification] = useState("");
  const [showTopNotification, setShowTopNotification] = useState(false);
  const notificationTimerRef = React.useRef<any>(null);

  const dismissTopNotification = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }
    setShowTopNotification(false);
  };

  const triggerMotivation = (message: string, durationSec: number = 7) => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }
    setTopNotification(message);
    setShowTopNotification(true);
    if (durationSec > 0) {
      notificationTimerRef.current = setTimeout(() => {
        setShowTopNotification(false);
      }, durationSec * 1000);
    }
  };

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      triggerMotivation("Karibu kwenye site yetu ambayo itakusaidia kutimiza ndoto zako kwa kuthibitisha order za wateja na kulipwa", 7);
    }, 1500);
    return () => clearTimeout(welcomeTimer);
  }, []);

  
  // Verification Interaction
  const [activeVerification, setActiveVerification] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling-video' | 'calling-voice'>('idle');
  const [verificationText, setVerificationText] = useState("SEND");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;
  const totalPages = 3;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  // Comments State - Generated dynamically from 16-hour epoch pool (45+ items)
  const [allComments, setAllComments] = useState<any[]>(() => generate6HourComments());
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  // Rotate comments and sync with 6-hour refresh
  useEffect(() => {
    let lastEpoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
    let dynamicComments = generate6HourComments();
    setAllComments(dynamicComments);

    const interval = setInterval(() => {
      const currentEpoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
      if (currentEpoch !== lastEpoch) {
        lastEpoch = currentEpoch;
        dynamicComments = generate6HourComments();
        setAllComments(dynamicComments);
        setCurrentCommentIndex(0);
      } else {
        setCurrentCommentIndex(prev => (prev + 1) % dynamicComments.length);
      }
    }, 13000); // 13 seconds per comment so user can read comfortably before it changes
    
    return () => clearInterval(interval);
  }, []);

  const currentLiveComment = allComments[currentCommentIndex] || allComments[0];
  // Fake add comment handler
  const [newCommentText, setNewCommentText] = useState("");
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      name: "Wewe (Mwanachama)",
      location: "Tanzania 🇹🇿",
      type: "Maoni Mapya ✍️",
      text: newCommentText,
      time: "Sasa hivi",
      avatar: "https://i.pravatar.cc/150?img=32",
      replies: []
    };
    // Insert right after current so they see it next
    const newComments = [...allComments];
    newComments.splice(currentCommentIndex + 1, 0, newCommentObj);
    setAllComments(newComments);
    setCurrentCommentIndex(currentCommentIndex + 1);
    setNewCommentText("");
  };

  const handleConfirmAction = (orderId: number, payout: number) => {
    setVerifiedOrders(prev => [...prev, orderId]);
    setBalance(prev => prev + payout);
    setToastMessage(`PAID SUCCESSFULLY: TZS ${payout.toLocaleString()}`);
    setActiveVerification(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    setTimeout(() => {
      triggerMotivation(`Hongera kwa kuthibitisha order! Salio lako sasa ni TZS ${(balance + payout).toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili na kulipia mtaji wa 14,500/= tu.`, 7);
    }, 2000);
  };

  const simulateCall = (type: 'calling-video' | 'calling-voice') => {
    setCallStatus(type);
    setTimeout(() => {
      setCallStatus('idle');
      setActiveVerification(null);
      handleActionRequiresAuth("");
    }, 4500);
  };

  const handleActionRequiresAuth = (message: string) => {
    setShowRegisterConfirmModal(true);
  };


  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans pb-32 relative">
      {/* Top Floating Notification */}
      <AnimatePresence>
        {showTopNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-4 right-4 z-[200] max-w-md mx-auto"
          >
            <div 
              onPointerDown={() => setShowTopNotification(false)}
              onClick={() => setShowTopNotification(false)}
              className="bg-gradient-to-r from-slate-900 to-[#1C1D24] border-2 border-[#00E676] rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,230,118,0.2)] flex items-start gap-4 cursor-pointer select-none"
            >
              <div className="bg-[#00E676]/20 p-2 rounded-full mt-1">
                <AlertCircle className="w-6 h-6 text-[#00E676] animate-pulse" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-black text-sm uppercase mb-1">Taarifa Muhimu</h4>
                <p className="text-slate-300 text-xs font-medium leading-relaxed">{topNotification}</p>
              </div>
              <button 
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setShowTopNotification(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTopNotification(false);
                }} 
                className="text-slate-500 hover:text-white mt-1 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <Toast message={toastMessage} visible={showToast} />
      
      {/* Top Navigation */}
      <header className="bg-[#12141F]/95 backdrop-blur-md p-4 flex justify-between items-center rounded-b-3xl shadow-xl border-b border-emerald-500/20 sticky top-0 z-40">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00E676] to-[#00B259] flex items-center justify-center font-black text-[9px] text-black shadow-md shadow-[#00E676]/20 shrink-0">
            OV
          </div>
          <div>
            <h2 className="font-black text-base sm:text-lg leading-none tracking-tight text-white">ORDER<span className="text-[#00E676]">VERIFY</span></h2>
            <p className="text-[10px] text-slate-400 font-medium">Verify Orders • Pata Kipato</p>
          </div>
        </div>
        {/* Kitufe cha Jisajili Hapa chenye rangi nyekundu inayowakawaka */}
        <button 
          type="button"
          onPointerDown={() => setShowTopNotification(false)}
          onClick={openRegisterModal}
          className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-[0_0_22px_rgba(239,68,68,0.85)] border border-red-400/50 animate-pulse cursor-pointer hover:brightness-110 active:scale-95 transition-all"
        >
          Jisajili Hapa
        </button>

      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-6 pb-28 sm:pb-32">
        <LiveClock />

        {/* 3 Top Cards */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onPointerDown={() => setShowTopNotification(false)}
            onClick={() => runWithLoader(() => {
              setShowWithdrawModal(true);
              setTimeout(() => {
                triggerMotivation("Jaza namba yako kisha utume maombi. Kumbuka: Ili kutoa pesa zako leo, unapaswa kujisajili kisha kulipia mtaji wa 14,500/=.", 7);
              }, 1000);
            })}
            className="bg-gradient-to-br from-[#00E676] via-[#00C853] to-[#00963F] rounded-2xl p-4 flex flex-col items-center justify-center text-black font-black shadow-lg shadow-[#00E676]/25 transition-transform active:scale-95 border border-[#00E676]"
          >
            <Wallet className="w-8 h-8 mb-2 opacity-95 drop-shadow-sm" />
            <span className="text-sm">Toa Pesa</span>
          </button>
          
          <div className="bg-[#141624] border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[12px] sm:text-[13px] mb-2 text-slate-300">Balance</span>
            <span className="bg-[#0B0C12] border border-emerald-500/40 text-[#00E676] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              TZS {balance.toLocaleString()}
            </span>
          </div>
          
          <div className="bg-[#141624] border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[12px] sm:text-[13px] mb-2 text-slate-300">Net Profit</span>
            <span className="bg-[#0B0C12] border border-amber-500/40 text-[#FFB800] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              TZS {balance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Ticker between header and video */}
        <div className="relative min-h-[52px] sm:min-h-[56px] flex justify-center items-center my-2 w-full z-30">
          <TopPopupTicker />
        </div>

        {/* Tutorial Video Section (Replacing sliding banner with interactive video demonstration) */}
        <TutorialVideoSection whatsappUrl="https://chat.whatsapp.com/D1b8NV1tkMo0uPGHdE4rjR?s=cl&p=a&mlu=4&ilr=4" />

        {/* Explanation Section */}
        <div className="bg-gradient-to-br from-[#141624] to-[#0E101A] border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-xl mt-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#00E676]/20 border border-[#00E676]/40 flex items-center justify-center text-[#00E676] font-black text-sm">
              💡
            </div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
              KWANINI UNALIPWA KWA KUTHIBITISHA ORDER?
            </h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            Ukisha kuwa mshirika wa <span className="text-[#00E676] font-bold">OrderVerify</span>, jukumu lako litakua ni kuthibitisha uwepo wa bidhaa na utayari wa mteja. Unapothibitisha order, unaipa kampuni uhakika wa kufanya mauzo bila mteja kughairi. Kutokana na kazi hii muhimu ya kulinda mauzo ya kampuni, <span className="text-white font-bold">utalipwa kamisheni ya asilimia 5% ya thamani halisi ya bidhaa hiyo.</span> Mfano, ukithibitisha bidhaa ya TZS 100,000, utalipwa TZS 5,000 papo hapo kwenye akaunti yako. Jisajili kwa kufungua akaunti yako ya <span className="text-[#00E676] font-bold">OrderVerify</span> kwa mtaji wa elfu kumi na nne na mia tano <span className="text-[#00E676] font-bold">14,500 tu</span> ili uanze kunufaika na site hii.
          </p>
        </div>

        {/* Orders Header */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> LIVE
          </div>
          <h3 className="font-black flex items-center justify-center gap-2 text-xl mb-1 text-white uppercase tracking-tight">
            <Activity className="w-6 h-6 text-[#00E676]" /> Orodha ya Bidhaa
          </h3>
          <p className="text-[#00E676] text-sm font-bold mb-2">Zinazosubiri Kuthibitishwa (5% Kamisheni)</p>
          <div className="max-w-xl mx-auto bg-[#141622] border border-emerald-500/25 rounded-2xl py-2.5 px-4 mb-4 text-center shadow-md">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              💡 <span className="text-white font-bold">Jinsi ya kuanza kufanya kazi:</span> Bonyeza neno <span className="text-[#00E676] font-bold">"Thibitisha Order"</span> kwenye bidhaa yoyote hapa chini, kisha utaona maelekezo yanayofuata ili ukamilishe na kulipwa.
            </p>
          </div>
        </div>

        {/* Order Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {currentOrders.map((order) => {
            const isVerified = verifiedOrders.includes(order.id);
            
            return (
              <div key={order.id} className={`bg-[#141624] text-white rounded-2xl overflow-hidden flex flex-col shadow-xl border ${isVerified ? 'border-slate-800/80 opacity-60' : 'border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_8px_25px_rgba(0,230,118,0.12)] transition-all duration-200'}`}>
                {/* Product Image Top */}
                <div className="h-24 bg-slate-900 relative">
                  <img src={order.productImage} alt={order.product} className={`w-full h-full object-cover ${isVerified ? 'grayscale' : ''}`} />
                  {isVerified && (
                    <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center backdrop-blur-[1px]">
                      <div className="bg-slate-900 border border-[#00E676] text-[#00E676] text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,230,118,0.35)]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED & SECURED
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-2.5 flex-1 flex flex-col">
                  
                  {/* User Profile */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-black/85 text-white text-[9px] font-bold px-1.5 py-1 rounded border border-slate-700/80 shadow-md shrink-0">
                      {order.flag} {order.country}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[11px] truncate text-slate-200">{order.name}</h4>
                      <p className="text-[9px] text-slate-400 truncate">Mteja wa {order.country}</p>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="mb-2 space-y-1">
                    <p className="font-bold text-xs text-white leading-tight line-clamp-1">{order.product}</p>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">Thamani:</span>
                      <span className="font-bold text-white">{formatLocalCurrency(order.productValue, order.country)}</span>
                    </div>
                  </div>
                  
                  {/* Stats & Payout */}
                  <div className="bg-[#0B0C12] rounded-xl p-1.5 mb-2 border border-emerald-500/30 text-center flex flex-col items-center shadow-inner">
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 tracking-wider">MALIPO YAKO (5%)</p>
                    <p className="text-[#00E676] font-black text-xs">TZS {order.payout.toLocaleString()}</p>
                  </div>

                  {/* Action Button / Success Status */}
                  <div className="mt-auto relative space-y-2">
                    {isVerified ? (
                      <div className="bg-[#10121A] text-[#00E676] text-[10px] sm:text-[11px] font-bold py-2 rounded-xl text-center shadow-inner border border-emerald-500/30 z-10 flex flex-col items-center justify-center gap-0.5">
                        <span className="flex items-center gap-1 opacity-95"><CheckCircle2 className="w-3 h-3" /> PAID</span>
                        <span className="text-white font-black">+TZS {order.payout.toLocaleString()}</span>
                      </div>
                    ) : (
                      <motion.button
                        onPointerDown={() => setShowTopNotification(false)}
                        onClick={() => runWithLoader(() => {
                          setActiveVerification(order);
                          setCallStatus('idle');
                          setVerificationText("SEND");
                          setTimeout(() => {
                            triggerMotivation("Bonyeza send order au piga simu na uthibitishe ili uingize kamisheni yako sasa hivi.");
                          }, 1000);
                        })}
                        animate={{ 
                          scale: [1, 1.025, 1, 0.985, 1],
                          y: [0, -1.5, 0, 1, 0]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2.2, 
                          ease: "easeInOut" 
                        }}
                        className="w-full py-2.5 rounded-xl font-black text-[11px] uppercase flex items-center justify-center gap-1 transition-all bg-gradient-to-r from-[#00E676] to-[#00C853] text-black hover:brightness-105 active:scale-95 shadow-md shadow-[#00E676]/25 cursor-pointer"
                      >
                        THIBITISHA ORDER
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination & Next Button */}
        <div className="mt-8 flex justify-center gap-3">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center gap-2 transition-colors shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" /> Rudi Nyuma
            </button>
          )}
          
          {currentPage < totalPages ? (
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="bg-[#00E676] hover:bg-[#00C260] text-black font-bold py-4 px-6 rounded-2xl flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(0,230,118,0.3)]"
            >
              Ukurasa Unaofuata <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="bg-gradient-to-br from-[#141624] to-[#0E101A] border border-emerald-500/30 rounded-2xl p-5 text-center w-full shadow-xl">
              <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                Kuna Order Zaidi ya 1,450 Zinasubiri
              </h4>
              <p className="text-xs text-slate-300 mb-3.5 leading-relaxed max-w-lg mx-auto">
                Ili kuendelea kuona order nyingi zaidi zenye malipo makubwa, unahitaji kukamilisha usajili wa akaunti yako leo.
              </p>
              <button
                type="button"
                onClick={openRegisterModal}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black px-6 py-2.5 rounded-full text-xs shadow-[0_0_20px_rgba(239,68,68,0.8)] border border-red-400/50 animate-pulse hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" /> Jisajili Sasa Kufungua Order Zote
              </button>
            </div>
          )}
        </div>

        {/* Kitufe cha Jisajili Hapa (Sehemu iliyotolewa maelezo) chenye rangi nyekundu inayowakawaka */}
        <div className="bg-gradient-to-br from-[#141624] to-[#0E101A] border-2 border-red-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_30px_rgba(239,68,68,0.15)] mt-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)] animate-pulse">
            <UserPlus className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wide mb-5">
            Fungua akaunti yako ya ORDERVERIFY kwa kubonyeza hapa 👇👇
          </h2>
          <button
            type="button"
            onClick={openRegisterModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 active:scale-95 text-white font-black px-8 py-3.5 rounded-2xl text-sm sm:text-base shadow-[0_0_28px_rgba(239,68,68,0.85)] border border-red-400/60 animate-pulse transition-all cursor-pointer uppercase tracking-wider mb-5"
          >
            <UserPlus className="w-5 h-5 stroke-[2.5]" />
            <span>Jisajili Hapa</span>
          </button>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-3 leading-relaxed font-medium">
            Ukimaliza kujisajili na ukashindwa kulipia bonyeza hapa ili kupata muongozo wa kulipia akaunti yako,,
          </p>
          <button
            type="button"
            onClick={() => setShowPaymentGuide(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-[0_0_15px_rgba(0,230,118,0.3)] border border-emerald-400/50 transition-all cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Muongozo wa Kulipia</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-[#181A26] border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2 text-base sm:text-lg text-white">
              <Users className="w-5 h-5 text-[#00E676]" />
              Maoni ya Wateja Wetu
            </h3>

            {/* Subtle Controls to browse comments without displaying numbers */}
            <div className="flex items-center gap-1.5 bg-[#0D0E16] border border-slate-700/80 rounded-xl p-1">
              <button 
                type="button"
                onClick={() => setCurrentCommentIndex(prev => (prev - 1 + allComments.length) % allComments.length)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Maoni yaliyopita"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => setCurrentCommentIndex(prev => (prev + 1) % allComments.length)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Maoni yanayofuata"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="relative min-h-[140px]">
            <AnimatePresence mode="popLayout">
              {currentLiveComment && (
                <motion.div 
                  layout
                  key={currentLiveComment.id || currentCommentIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-3 bg-[#0D0E16] p-4 sm:p-5 rounded-2xl border border-slate-800/90 shadow-xl w-full"
                >
                  <div className="flex gap-3 items-start">
                    <div 
                      aria-label={currentLiveComment.name}
                      className="w-10 h-10 rounded-full bg-[#1C1F30] border-2 border-[#00E676]/60 text-[#00E676] font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-md select-none uppercase tracking-wider"
                    >
                      {getInitials(currentLiveComment.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-white">{currentLiveComment.name}</h4>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed mt-1">{currentLiveComment.text}</p>
                    </div>
                  </div>

                  {/* Nested Agent/Admin Replies */}
                  {currentLiveComment.replies && currentLiveComment.replies.length > 0 && (
                    <div className="ml-4 sm:ml-8 mt-1 space-y-2 border-l-2 border-[#00E676]/40 pl-3 py-1.5 bg-[#141624] rounded-r-xl pr-3">
                      {currentLiveComment.replies.map((reply: any) => (
                        <div key={reply.id} className="flex gap-2.5 items-start">
                          <div 
                            aria-label={reply.name}
                            className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-[#00E676] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 select-none uppercase tracking-wider"
                          >
                            {getInitials(reply.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="font-black text-xs text-[#00E676]">{reply.name}</h5>
                              <span className="text-[9px] bg-emerald-500/20 text-[#00E676] font-bold px-1.5 py-0.2 rounded border border-emerald-500/35">
                                Afisa wa Huduma
                              </span>
                            </div>
                            <p className="text-xs text-slate-200 mt-1 leading-relaxed">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
            <input 
              type="text" 
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Andika maoni yako hapa..." 
              className="flex-1 bg-[#0D0E16] border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00E676]"
            />
            <button 
              type="submit"
              className="bg-[#00E676] text-black font-bold px-5 py-3 rounded-xl text-xs sm:text-sm hover:bg-[#00C260] transition-colors shrink-0 cursor-pointer"
            >
              Tuma
            </button>
          </form>
        </div>

        {/* Footer Section */}
        <div className="mt-12 mb-6 border-t border-slate-800 pt-8 pb-4 text-center">
          <h2 className="text-xl font-black mb-4 tracking-tight uppercase text-white">ORDERVERIFY</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-400 mb-6">
            <button onClick={() => runWithLoader(() => {})} className="hover:text-[#00E676] transition-colors">About Us</button>
            <button onClick={() => runWithLoader(() => {})} className="hover:text-[#00E676] transition-colors">Contact Support</button>
            <button onClick={() => runWithLoader(() => {})} className="hover:text-[#00E676] transition-colors">Privacy Policy</button>
            <button onClick={() => runWithLoader(() => {})} className="hover:text-[#00E676] transition-colors">Terms of Service</button>
            <button onClick={() => runWithLoader(() => {})} className="hover:text-[#00E676] transition-colors">FAQ</button>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} OrderVerify Inc. All rights reserved. <br className="sm:hidden" />
            Global Order Verification & Processing System.
          </p>
        </div>

      </div>

      {/* Fixed Bottom Action Bar - Imepandishwa kwa juu kidogo tu kama ilivyoagizwa */}
      <div className="fixed bottom-3.5 sm:bottom-4 left-3 right-3 max-w-md mx-auto z-40 bg-[#0B0C10]/95 backdrop-blur-md border border-slate-700/80 p-1.5 sm:p-2 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between gap-2">
          {/* 1. Kitufe cha Install App */}
          <button
            onClick={() => setShowInstallAppModal(true)}
            className="flex-1 bg-[#00A859] hover:bg-[#00924c] text-white font-extrabold text-[11px] sm:text-xs py-2 sm:py-2.5 px-3 rounded-xl shadow-[0_0_12px_rgba(0,168,89,0.45)] animate-pulse flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span>Install App</span>
          </button>

          {/* 2. Kitufe cha Wasiliana na Wakala - SMS text message */}
          <a
            href="sms:0740463671?body=Habari%20Naomba%20unielekeze%20zaidi%20kuhusu%20kuthibitisha%20order%20za%20wateja%20na%20kulipwa"
            className="flex-1 bg-[#0A0C14] hover:bg-[#151722] text-white border border-[#00E676] font-extrabold text-[11px] sm:text-xs py-2 sm:py-2.5 px-3 rounded-xl shadow-[0_0_12px_rgba(0,230,118,0.4)] animate-pulse flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
            <span>Wasiliana na Wakala</span>
            <span className="text-xs sm:text-sm leading-none">🇹🇿</span>
          </a>
        </div>
      </div>


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
            <p className="text-white font-bold text-sm animate-pulse">Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div 
            onClick={() => {
              setShowTopNotification(false);
              setShowWithdrawModal(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-sm"
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C1D24] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative border border-slate-700"
            >
              <button 
                onPointerDown={() => setShowTopNotification(false)}
                onClick={() => {
                  setShowTopNotification(false);
                  setShowWithdrawModal(false);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-white font-black text-lg mb-5 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#00E676]" /> KUTOA PESA 
              </h3>
              
              <div className="mb-4">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">1. Chagua Mtandao</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setSelectedNetwork('mpesa');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'mpesa' ? 'bg-[#E3000F] text-white border-[#E3000F] shadow-[0_0_15px_rgba(227,0,15,0.4)] scale-105' : 'bg-[#E3000F]/10 border-[#E3000F]/30 text-[#E3000F] hover:border-[#E3000F]'}`}
                  >
                    M-Pesa
                  </button>
                  <button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setSelectedNetwork('tigo');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'tigo' ? 'bg-[#003B71] text-white border-[#003B71] shadow-[0_0_15px_rgba(0,59,113,0.4)] scale-105' : 'bg-[#003B71]/10 border-[#003B71]/30 text-[#4A90E2] hover:border-[#003B71]'}`}
                  >
                    Tigo Pesa
                  </button>
                  <button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setSelectedNetwork('airtel');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'airtel' ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.4)] scale-105' : 'bg-[#FF0000]/10 border-[#FF0000]/30 text-[#FF4D4D] hover:border-[#FF0000]'}`}
                  >
                    Airtel Money
                  </button>
                  <button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setSelectedNetwork('halopesa');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'halopesa' ? 'bg-[#F8981D] text-white border-[#F8981D] shadow-[0_0_15px_rgba(248,152,29,0.4)] scale-105' : 'bg-[#F8981D]/10 border-[#F8981D]/30 text-[#F8981D] hover:border-[#F8981D]'}`}
                  >
                    HaloPesa
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">2. Namba ya Simu</label>
                <input 
                  type="tel" 
                  placeholder="Mfano: 07XX XXX XXX" 
                  onFocus={() => setShowTopNotification(false)}
                  onPointerDown={() => setShowTopNotification(false)}
                  onClick={() => setShowTopNotification(false)}
                  onChange={() => setShowTopNotification(false)}
                  className="w-full bg-[#0B0C10] border border-slate-700 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#00E676] focus:outline-none focus:ring-1 focus:ring-[#00E676]"
                />
              </div>

              <div className="mb-6">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">3. Kiasi (TZS)</label>
                <input 
                  type="number" 
                  placeholder="Kuanzia 1,000 TZS" 
                  onFocus={() => setShowTopNotification(false)}
                  onPointerDown={() => setShowTopNotification(false)}
                  onClick={() => setShowTopNotification(false)}
                  onChange={() => setShowTopNotification(false)}
                  className="w-full bg-[#0B0C10] border border-slate-700 rounded-xl px-4 py-3.5 text-white font-black text-lg focus:outline-none focus:border-[#00E676]"
                />
                <p className="text-[10px] text-slate-500 mt-1">Kutoa pesa ni kuanzia elfu moja (1,000 TZS).</p>
              </div>

              <button 
                onPointerDown={() => setShowTopNotification(false)}
                onClick={() => {
                  setShowTopNotification(false);
                  setShowWithdrawModal(false);
                  runWithLoader(() => {
                    setToastMessage("MAOMBI YAMEPOKELEWA KIKAMILIFU!");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2500);
                    setTimeout(() => {
                      triggerMotivation("Ili kuruhusiwa kutoa pesa zote kwenda kwenye namba yako, tafadhali jisajili kisha ulipie mtaji wa 14,500/=.", 7);
                      setShowRegisterConfirmModal(true);
                    }, 1800);
                  });
                }}
                className="w-full bg-[#00E676] text-black font-black py-4 rounded-xl hover:bg-[#00C260] transition-colors uppercase tracking-wider text-sm shadow-lg shadow-[#00E676]/20 cursor-pointer"
              >
                TUMA MAOMBI YA PESA
              </button>
              
              <button 
                onPointerDown={() => setShowTopNotification(false)}
                onClick={() => {
                  setShowTopNotification(false);
                  setShowWithdrawModal(false);
                }}
                className="w-full mt-3 text-slate-400 font-bold py-3 text-xs hover:text-white transition-colors cursor-pointer"
              >
                Funga
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Register Confirmation Modal: Step 1 (Uthibitisho wa Mtaji wa 14,500) & Step 2 (Maelezo ya Jinsi ya Kujisajili + Batani ya ANZA KUJISAJILI HAPA) */}
      <AnimatePresence>
        {showRegisterConfirmModal && (
          <div 
            onClick={() => setShowRegisterConfirmModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0B0C10]/95 backdrop-blur-md overflow-y-auto"
          >
            {registerModalStep === 'confirm' ? (
              <motion.div 
                key="register-step-confirm"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#141624] border-2 border-[#00E676] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center my-auto"
              >
                {/* Close Button */}
                <button 
                  type="button"
                  onClick={() => setShowRegisterConfirmModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
                  aria-label="Funga"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-14 h-14 rounded-2xl bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center mx-auto mb-3 text-[#00E676]">
                  <UserPlus className="w-7 h-7 stroke-[2.2]" />
                </div>

                <h3 className="text-white font-black text-lg mb-2 uppercase tracking-wide">
                  Fungua Akaunti ya OrderVerify
                </h3>

                <div className="bg-[#0B0C12] border border-slate-700/80 rounded-2xl p-4 mb-5 text-left space-y-3 shadow-inner">
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl shrink-0">👉</span>
                    <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">
                      Ili kufungua akaunti ya <span className="text-[#00E676] font-black">OrderVerify</span> unatakiwa kuwa na mtaji wa elfu kumi na nne na mia tano <span className="text-white bg-emerald-950 border border-emerald-500/50 px-2 py-0.5 rounded font-black">14,500 tu</span>.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Kama una mtaji huu, bonyeza <strong>ENDELEA</strong> ili kusoma maelekezo ya jinsi ya kujisajili.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Kama bado hauna mtaji, bonyeza <strong>FUNGA</strong>.</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Option ya Kuendelea au Kufunga */}
                <div className="space-y-2.5">
                  <button 
                    type="button"
                    onClick={() => setRegisterModalStep('instructions')}
                    className="w-full bg-gradient-to-r from-[#00E676] to-[#00C853] hover:brightness-110 active:scale-95 text-black font-black py-3.5 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00E676]/30 cursor-pointer"
                  >
                    <span>ENDELEA</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => setShowRegisterConfirmModal(false)}
                    className="w-full bg-[#1C1D26] hover:bg-[#252733] text-slate-300 font-bold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider border border-slate-700 cursor-pointer"
                  >
                    FUNGA
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Step 2: Maelezo ya Jinsi ya Kujisajili + Batani ya ANZA KUJISAJILI HAPA */
              <motion.div 
                key="register-step-instructions"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#141624] border-2 border-[#00E676] rounded-3xl p-5 sm:p-6 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl relative my-auto text-left"
              >
                {/* Close Button */}
                <button 
                  type="button"
                  onClick={() => setShowRegisterConfirmModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer z-10"
                  aria-label="Funga"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3 shrink-0 pr-8">
                  <div className="w-10 h-10 rounded-xl bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center text-[#00E676] shrink-0">
                    <UserPlus className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-wide leading-tight">
                      JINSI YA KUJISAJILI
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      Soma hatua hizi kwa makini kabla ya kuendelea
                    </p>
                  </div>
                </div>

                {/* Scrollable Content: Maelezo Halisi ya Usajili */}
                <div className="overflow-y-auto pr-1 sm:pr-2 space-y-4 text-xs sm:text-sm font-medium text-slate-300 flex-1">
                  <div className="bg-[#0B0C12] border border-slate-800 rounded-2xl p-4 space-y-3.5">
                    <p className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#00E676] font-black shrink-0">Hatua ya kwanza</span>
                      <span>Weka email yako yoyote tu afu changanya na namba 👉👉 <span className="text-white italic font-bold">mfano anny33@gmail.com</span></span>
                    </p>
                    <p className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#00E676] font-black shrink-0">Hatua ya pili</span>
                      <span>Weka namba yako ya simu kwa ajili ya kupokea pesa 👉👉 <span className="text-white italic font-bold">mfano 0740463678 au +255777729109</span></span>
                    </p>
                    <p className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#00E676] font-black shrink-0">Hatua ya tatu</span>
                      <span>Weka jina la usajili wa laini yako <span className="text-white italic font-bold">Mfano Emma zakayo sas we weka lako</span></span>
                    </p>
                    <p className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#00E676] font-black shrink-0">Hatua ya nne</span>
                      <span>Weka username yako jina moja changanya na namba 2 afu bananisha maneno <span className="text-white italic font-bold">mfano juma55 au mussa44 usiruke nafasi</span></span>
                    </p>
                    <p className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#00E676] font-black shrink-0">Hatua ya tano</span>
                      <span>WEKA Paswerd yako yoyote tu cha msingi uwe unaikumbuka na iwe namba nne tu</span>
                    </p>
                    <p className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#00E676] font-black shrink-0">Hatua ya sita</span>
                      <span>Rudia hiyo Paswerd tena</span>
                    </p>
                  </div>

                  {/* Maelezo ya Chini Yenye Muonekano Unaowakawaka (Glowing & Pulsing) */}
                  <div className="border-2 border-[#00E676] bg-gradient-to-r from-emerald-950/60 via-[#0E1511] to-emerald-950/60 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,230,118,0.35)] animate-pulse space-y-2 text-xs sm:text-sm">
                    <p className="text-white font-bold">
                      Hakikisha unakariri username na password yako ulizo jaza hapo wakati wa kujisajili
                    </p>
                    <p className="text-white font-bold">
                      Afu bofya hilo neno <span className="text-[#00E676] font-black italic underline decoration-2">SIGN UP</span>
                    </p>
                    <p className="text-[#00E676] font-black italic border-t border-[#00E676]/25 pt-2 leading-relaxed">
                      Ukimaliza kujisajili lipia automatic au lipia kwa Lipa Namba itakayo onekana Baada ya kujisajili Kisha tuma taarifa kwa agent wetu. Ukishindwa wasiliana na agent wetu.
                    </p>
                  </div>
                </div>

                {/* Footer Buttons: Anza Kujisajili Hapa (opens link) + Rudi Nyuma & Funga */}
                <div className="pt-3 border-t border-slate-800 space-y-2 shrink-0 mt-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowRegisterConfirmModal(false);
                      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
                    }}
                    className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 active:scale-95 text-white font-black py-3.5 px-4 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.8)] border border-red-400/50 animate-pulse cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 stroke-[2.5]" />
                    <span>ANZA KUJISAJILI HAPA</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setRegisterModalStep('confirm')}
                      className="flex-1 bg-[#1C1D26] hover:bg-[#252733] text-slate-300 font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider border border-slate-700 cursor-pointer text-center"
                    >
                      Rudi Nyuma
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowRegisterConfirmModal(false)}
                      className="flex-1 bg-[#1C1D26] hover:bg-[#252733] text-slate-400 hover:text-white font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider border border-slate-700 cursor-pointer text-center"
                    >
                      Funga
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Install App Modal (Isifunguke ila imwambie ajisajili kwanza na kulipia mtaji wa 14500 ndo ataweza kudownload) */}
      <AnimatePresence>
        {showInstallAppModal && (
          <div 
            onClick={() => setShowInstallAppModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-md"
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141624] border-2 border-[#00E676] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowInstallAppModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center mx-auto mb-3 text-[#00E676]">
                <Smartphone className="w-7 h-7 stroke-[2.2]" />
              </div>

              <h3 className="text-white font-black text-lg mb-2 uppercase tracking-wide">
                Pakua Application ya OrderVerify
              </h3>

              <div className="bg-[#0B0C12] border border-slate-700/80 rounded-2xl p-4 mb-5 text-left space-y-3 shadow-inner">
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl shrink-0">⚠️</span>
                  <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">
                    Ili kudownload application mpaka ujisajili na kulipia mtaji wa <span className="text-[#00E676] font-black underline decoration-2">14,500 tu</span>.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                    <span>Bonyeza <strong>ENDELEA</strong> ili ufungue link ya kujisajili na kuanza.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>Kama hauna mtaji kwa sasa, bonyeza <strong>FUNGA</strong>.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: ENDELEA au FUNGA */}
              <div className="space-y-2.5">
                <button 
                  type="button"
                  onClick={() => {
                    setShowInstallAppModal(false);
                    setRegisterModalStep('instructions');
                    setShowRegisterConfirmModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#00E676] to-[#00C853] hover:brightness-110 active:scale-95 text-black font-black py-3.5 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00E676]/30 cursor-pointer"
                >
                  <span>ENDELEA</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button 
                  onClick={() => setShowInstallAppModal(false)}
                  className="w-full bg-[#1C1D26] hover:bg-[#252733] text-slate-300 font-bold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider border border-slate-700 cursor-pointer"
                >
                  FUNGA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Verification Modal / Interactive Action */}
      <AnimatePresence>
        {activeVerification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`rounded-3xl max-w-sm w-full shadow-2xl relative text-center overflow-hidden border-t-8 ${callStatus === 'idle' ? 'bg-white border-[#00E676]' : 'bg-slate-900 border-transparent text-white'}`}
            >
              {callStatus === 'idle' ? (
                <div className="p-6">
                  <button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setActiveVerification(null);
                    }}
                    className="absolute top-4 right-4 text-slate-400 hover:text-black bg-slate-100 rounded-full p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <img 
                    src={activeVerification.avatar} 
                    alt={activeVerification.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#00E676] object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeVerification.name)}&background=141624&color=00E676&bold=true`;
                    }}
                  />
                  <h3 className="font-bold text-lg mb-1 text-slate-800">{activeVerification.name}</h3>
                  <p className="text-slate-500 text-xs mb-5 uppercase tracking-wide">Mteja wa {activeVerification.country}</p>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-5 text-left shadow-sm">
                    <p className="text-xs font-black text-blue-900 mb-1.5 uppercase">Maelekezo Muhimu:</p>
                    <ul className="text-[11px] text-blue-800 list-disc pl-4 space-y-1.5 font-medium">
                      <li>Kumbuka: Hakikisha unatoka nchi moja na <strong className="font-bold">mteja</strong> ndo uweze kumpigia simu. Vinginevyo bofya tu SEND ORDER.</li>
                      <li><span className="font-bold text-blue-950">Ukipiga sema:</span> <span className="italic">"Halo, mimi ni wakala kutoka OrderVerify. Nakupigia kukuelekeza kuwa ofisi zetu zipo {activeVerification.city} utaenda kuchukua order yako ya {activeVerification.product}."</span></li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                      onPointerDown={() => setShowTopNotification(false)}
                      onClick={() => {
                        setShowTopNotification(false);
                        runWithLoader(() => simulateCall('calling-video'));
                      }} 
                      className="bg-white border border-slate-200 rounded-2xl py-4 flex flex-col items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Video className="w-6 h-6 mb-1 text-indigo-500" />
                      <span className="text-[10px] font-black uppercase tracking-wide">Video Call</span>
                    </button>
                    <button 
                      onPointerDown={() => setShowTopNotification(false)}
                      onClick={() => {
                        setShowTopNotification(false);
                        runWithLoader(() => simulateCall('calling-voice'));
                      }} 
                      className="bg-white border border-slate-200 rounded-2xl py-4 flex flex-col items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Phone className="w-6 h-6 mb-1 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-wide">Voice Call</span>
                    </button>
                  </div>
                  
                  <motion.button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      runWithLoader(() => {
                        handleConfirmAction(activeVerification.id, activeVerification.payout);
                      });
                    }}
                    animate={{ rotate: [-2, 2, -2, 2, 0], scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-full bg-[#00E676] text-black font-black px-5 py-4 rounded-2xl hover:bg-[#00C260] shadow-[0_5px_15px_rgba(0,230,118,0.3)] flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
                  >
                    <Send className="w-5 h-5" /> SEND ORDER
                  </motion.button>
                </div>
              ) : (
                <div className="p-8 py-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-900 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="relative w-28 h-28 mx-auto mb-6">
                      <img 
                        src={activeVerification.avatar} 
                        alt={activeVerification.name}
                        className="w-full h-full rounded-full border-4 border-[#00E676] object-cover relative z-10" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeVerification.name)}&background=141624&color=00E676&bold=true`;
                        }}
                      />
                      <div className="absolute inset-0 rounded-full border-4 border-[#00E676] animate-ping opacity-75"></div>
                      <div className="absolute inset-[-10px] rounded-full border-2 border-[#00E676]/30 animate-ping opacity-50" style={{ animationDelay: '200ms' }}></div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-2">{activeVerification.name}</h3>
                    <p className="text-[#00E676] text-sm animate-pulse font-bold tracking-widest uppercase">
                      {callStatus === 'calling-video' ? 'Inapiga Video...' : 'Inapiga Simu...'}
                    </p>
                    
                    <button 
                      onClick={() => setCallStatus('idle')}
                      className="mt-12 bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:bg-red-600 transition-transform hover:scale-110"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Guide Modal */}
      <AnimatePresence>
        {showPaymentGuide && (
          <div 
            onClick={() => setShowPaymentGuide(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-[#0B0C10]/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141624] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-emerald-500/30 relative flex flex-col max-h-[90vh]"
            >
              <div className="bg-gradient-to-br from-emerald-600 to-[#00E676] p-6 text-center relative shrink-0">
                <button 
                  onClick={() => setShowPaymentGuide(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-black text-xl text-white uppercase tracking-wider">Muongozo wa Kulipia</h3>
              </div>

              <div className="p-5 sm:p-6 text-slate-300 text-sm sm:text-base leading-relaxed overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[#00E676] font-bold text-lg flex items-center gap-2 mb-2"><span className="text-xl">📌</span> JINSI YA KULIPIA ORDERVERIFY KUTUMIA AIRTEL MONEY</h4>
                    <ul className="space-y-1 pl-4">
                      <li>1️⃣ Bonyeza *150*60#</li>
                      <li>2️⃣ Chagua LIPIA BILL</li>
                      <li>3️⃣ Chagua LIPA KWA SIMU (MITANDAO YOTE)</li>
                      <li>4️⃣ Chagua LIPA KWA VODA LIPA</li>
                      <li>5️⃣ Weka kiasi: 14,500 TZS</li>
                      <li>6️⃣ Ingiza kumbukumbu ya malipo: 51330974</li>
                      <li>7️⃣ Majina: MOSSES TECHNOLOGY HELP COMPANY LIMITED</li>
                      <li>8️⃣ Ingiza namba ya siri yako</li>
                    </ul>
                    <p className="mt-2 text-white font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">✅ Malipo yameandaliwa vizuri, fuata hatua hizi na utakuwa umefanikiwa.</p>
                  </div>

                  <div>
                    <h4 className="text-blue-400 font-bold text-lg flex items-center gap-2 mb-2"><span className="text-xl">📌</span> JINSI YA KULIPIA ORDERVERIFY KUTUMIA TIGOPESA/YAS</h4>
                    <ul className="space-y-1 pl-4">
                      <li>1️⃣ Bonyeza *150*01#</li>
                      <li>2️⃣ Chagua LIPA KWA SIMU</li>
                      <li>3️⃣ Chagua KWENDA MITANDAO MINGINE</li>
                      <li>4️⃣ Chagua M-PESA</li>
                      <li>5️⃣ Weka namba ya malipo: 51330974<br/><span className="pl-6 text-xs text-slate-400">(MOSSES TECHNOLOGY HELP COMPANY LIMITED)</span></li>
                      <li>6️⃣ Weka kiasi: 14,500 TZS</li>
                      <li>7️⃣ Ingiza namba yako ya siri</li>
                    </ul>
                    <p className="mt-2 text-white font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">✅ Malipo yako tayari! Fuata hatua hizi na account yako ita-activate haraka.</p>
                  </div>

                  <div>
                    <h4 className="text-red-500 font-bold text-lg flex items-center gap-2 mb-2"><span className="text-xl">📌</span> JINSI YA KULIPIA ORDERVERIFY KUTUMIA VODACOM</h4>
                    <ul className="space-y-1 pl-4">
                      <li>1️⃣ Bonyeza *150*00#</li>
                      <li>2️⃣ Chagua LIPA KWA M-PESA</li>
                      <li>3️⃣ Chagua LIPA KWA SIMU</li>
                      <li>4️⃣ Weka namba ya malipo: 51330974<br/><span className="pl-6 text-xs text-slate-400">(MOSSES TECHNOLOGY HELP COMPANY LIMITED)</span></li>
                      <li>5️⃣ Weka kiasi: 14,500 TZS</li>
                      <li>6️⃣ Ingiza namba yako ya siri</li>
                    </ul>
                    <p className="mt-2 text-white font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">✅ Malipo yako yameandaliwa vizuri, fuata hatua hizi na account yako ita-activate haraka.</p>
                  </div>

                  <div>
                    <h4 className="text-orange-500 font-bold text-lg flex items-center gap-2 mb-2"><span className="text-xl">📌</span> JINSI YA KULIPIA ORDERVERIFY KUTUMIA HALOPESA</h4>
                    <ul className="space-y-1 pl-4">
                      <li>1️⃣ Bonyeza *150*88#</li>
                      <li>2️⃣ Chagua LIPIA BIDHAA</li>
                      <li>3️⃣ Chagua MPESA LIPA HAPA</li>
                      <li>4️⃣ Weka namba ya malipo: 51330974<br/><span className="pl-6 text-xs text-slate-400">(MOSSES TECHNOLOGY HELP COMPANY LIMITED)</span></li>
                      <li>5️⃣ Weka kiasi: 14,500 TZS</li>
                      <li>6️⃣ Ingiza namba yako ya siri</li>
                    </ul>
                    <p className="mt-2 text-white font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">✅ Fuata hatua hizi na account yako ita-activate haraka.</p>
                  </div>

                  <div className="bg-[#1C1F30] p-4 rounded-xl border border-slate-700/80 text-center">
                    <p className="font-bold text-slate-300 text-sm mb-1 tracking-widest">▬▬▬▬▬▬▬▬▬▬▬</p>
                    <h4 className="text-[#00E676] font-black uppercase text-base sm:text-lg mb-1">*ORDERVERIFY MALIPO KAMA LIPA NAMBA IMEGOMA*</h4>
                    <p className="font-bold text-slate-300 text-sm mb-3 tracking-widest">▬▬▬▬▬▬▬▬▬▬▬▬▬</p>
                    <p className="text-white font-bold mb-3">TUMA PESA KWENDA NAMBA YA M-PESA NAMBA <span className="text-xl text-[#00E676] block mt-1">0757303605</span></p>
                    <p className="text-slate-300 text-sm mb-4">MAJINA YATATOKEA <span className="font-bold text-white">*MUSA MOFUGA*</span> (ndiye CEO wa platform)</p>
                    <p className="font-bold text-slate-300 text-sm mb-1 tracking-widest">▬▬▬▬▬▬✅▬▬▬▬▬▬</p>
                    <p className="text-slate-400 text-xs">BY CEO</p>
                    <p className="text-white font-bold">Jina MUSA WILLIAM MOFUGA</p>
                    <p className="font-bold text-slate-300 text-sm mt-1 mb-1 tracking-widest">▬▬▬▬▬▬▬▬▬▬</p>
                    <p className="text-[#00E676] font-bold text-xs uppercase tracking-wide">NDIO CEO WA PLATFORM</p>
                    <p className="text-slate-400 text-xs mt-3">Info!</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0B0C12] shrink-0">
                <p className="text-xs sm:text-sm text-center text-slate-300 mb-3">
                  Ukimaliza kulipia au ukishindwa kulipia wasiliana na wakala wetu kwa kubonyeza hapa👇
                </p>
                <a 
                  href="sms:+255740463671?body=Habari%20nimesha%20fika%20kwenye%20malipo%20ya%20Orderverify%20naomba%20ushirikiano%20wako"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Wasiliana na Wakala</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  React.useEffect(() => {
    // Save the initial epoch when the app loads
    const initialEpoch = Math.floor(Date.now() / (16 * 60 * 60 * 1000));
    // Check every minute if the 16-hour window has passed
    const interval = setInterval(() => {
      const currentEpoch = Math.floor(Date.now() / (16 * 60 * 60 * 1000));
      if (currentEpoch !== initialEpoch) {
        window.location.reload(); // Automatically refresh everything for the new 16-hour cycle
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isAgeVerified) {
    return <AgeVerification onVerify={() => setIsAgeVerified(true)} />;
  }

  return <Dashboard />;
}
