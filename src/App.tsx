import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Wallet, 
  UserPlus, MessageCircle, Send, Globe, MessageSquare, X,
  Activity, ChevronRight, ChevronLeft, Smartphone, Users, ArrowDownToLine, ChevronDown, PhoneCall,
  Video, Phone, Mic, PhoneOff, CreditCard
} from 'lucide-react';
import { orderData, livePayouts, initialComments, sliderImages, formatLocalCurrency } from './data';

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

// --- Age Verification Screen ---
function AgeVerification({ onVerify }: { onVerify: () => void }) {
  const [country, setCountry] = useState("Tanzania");
  const [language, setLanguage] = useState("Swahili");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 p-8 rounded-3xl max-w-md w-full border border-slate-700 shadow-2xl text-slate-100"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-[#00E676]/20 p-4 rounded-full border border-[#00E676]/50 w-24 h-24 flex items-center justify-center">
            <Globe className="w-12 h-12 text-[#00E676]" />
          </div>
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight uppercase text-white">ORDERVERIFY.SITE</h1>
        <p className="text-[#00E676] font-bold text-sm mb-6 bg-[#00E676]/10 py-2 px-4 rounded-full inline-block">
          Inapatikana Ulimwenguni Kote 🌍
        </p>
        
        <div className="space-y-4 mb-8 text-left">
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Chagua Nchi Uliyopo</label>
            <select 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E676] font-bold"
            >
              <option value="Tanzania">🇹🇿 Tanzania</option>
              <option value="Kenya">🇰🇪 Kenya</option>
              <option value="Uganda">🇺🇬 Uganda</option>
              <option value="Rwanda">🇷🇼 Rwanda</option>
              <option value="Burundi">🇧🇮 Burundi</option>
              <option value="Congo">🇨🇩 DRC Congo</option>
              <option value="Other">🌍 Nchi Nyingine (Other)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Chagua Lugha / Language</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E676] font-bold"
            >
              <option value="Swahili">Swahili</option>
              <option value="English">English</option>
              <option value="French">Français</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Thibitisha Umri Wako</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={onVerify}
              className="flex-1 bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-4 rounded-xl transition-all shadow-lg shadow-[#00E676]/20"
            >
              Mimi ni 18+
            </button>
            <button 
              onClick={() => alert('Samahani, huduma hii ni kwa wale wenye umri wa miaka 18 na zaidi pekee.')}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold py-4 px-4 rounded-xl transition-all opacity-70"
            >
              Chini ya 18
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TopPopupTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % livePayouts.length);
        setIsVisible(true);
      }, 500);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentPayout = livePayouts[currentIndex];
  
  const actionType = currentIndex % 3; 
  let text = "";
  let highlight = "";
  
  if (actionType === 0) {
    text = "amefungua akaunti mpya";
    highlight = "Hongera!";
  } else if (actionType === 1) {
    text = "amelipia ada ya usajili";
    highlight = "Tayari!";
  } else {
    text = `amelipwa ${currentPayout.amountStr} kwa kuthibitisha order`;
    highlight = "Malipo!";
  }

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex justify-center items-center px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-full py-2 px-4 shadow-2xl flex items-center gap-3 text-xs sm:text-sm text-white max-w-md w-full justify-between pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${actionType === 2 ? 'bg-[#00E676]' : actionType === 0 ? 'bg-indigo-500' : 'bg-[#FFC107]'}`} />
              <p>
                <strong className="font-black">{currentPayout.name}</strong> {text}
              </p>
            </div>
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${actionType === 2 ? 'bg-[#00E676]/20 text-[#00E676]' : actionType === 0 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[#FFC107]/20 text-[#FFC107]'}`}>
              {highlight}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function LiveClock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
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
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Mfumo Upo Live</p>
          <p className="text-white text-sm font-bold">Data Hubadilika Kila Baada ya Masaa 12</p>
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
  const [balance, setBalance] = useState(0);
  const [verifiedOrders, setVerifiedOrders] = useState<number[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState("");
  
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

  // Slider State
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % sliderImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // Comments State
  const [comments, setComments] = useState(initialComments);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      name: "Mgeni (Wewe)",
      text: newCommentText,
      time: "Sasa hivi",
      avatar: "https://i.pravatar.cc/150?img=32"
    };
    setComments([newCommentObj, ...comments]);
    setNewCommentText("");
  };

  const handleConfirmAction = (orderId: number, payout: number) => {
    setVerifiedOrders(prev => [...prev, orderId]);
    setBalance(prev => prev + payout);
    setToastMessage(`Umelipwa TZS ${payout.toLocaleString()}! Angalia salio lako kama limeongezeka na kama halijaongezeka wasiliana na agent wetu`);
    setActiveVerification(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const simulateCall = (type: 'calling-video' | 'calling-voice') => {
    setCallStatus(type);
    setTimeout(() => {
      setCallStatus('idle');
      setActiveVerification(null);
      handleActionRequiresAuth("Mteja anapatikana, lakini ili aweze kupokea simu yako lazima uwe umekamilisha usajili wa akaunti kwanza.");
    }, 4500);
  };

  const handleActionRequiresAuth = (message: string) => {
    setModalMessage(message);
    setShowRegisterModal(true);
  };


  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans pb-32 relative">
      
      <Toast message={toastMessage} visible={showToast} />
      
      {/* Top Navigation */}
      <header className="bg-[#151620] p-4 flex justify-between items-center rounded-b-3xl shadow-lg border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-indigo-500 bg-slate-900 flex items-center justify-center font-black text-[8px] text-white leading-tight text-center">
            ORDER<br/><span className="text-[#00E676]">VERIFY</span>
          </div>
          <div>
            <h2 className="font-black text-lg leading-none tracking-tight">ORDER<span className="text-[#00E676]">VERIFY</span></h2>
            <p className="text-[9px] text-slate-400">Verify Orders • Earn Income</p>
          </div>
        </div>
        <button 
          onClick={() => handleActionRequiresAuth("Ili kupata akaunti yako na kuanza kuthibitisha order, tafadhali jisajili kwanza.")}
          className="bg-[#00E676] text-black font-bold px-5 py-1.5 rounded-full text-xs"
        >
          Jisajili
        </button>

      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <LiveClock />

        
        {/* 3 Top Cards */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="bg-gradient-to-b from-[#00E676] to-[#00B259] rounded-2xl p-4 flex flex-col items-center justify-center text-black font-black shadow-lg shadow-[#00E676]/20 transition-transform active:scale-95 border-2 border-[#00E676]"
          >
            <Wallet className="w-8 h-8 mb-2 opacity-90" />
            <span className="text-sm">Toa pesa</span>
          </button>
          
          <div className="bg-[#1C1D24] border-2 border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[13px] mb-2 text-slate-300">Balance</span>
            <span className="bg-[#0B0C10] border border-slate-800 text-[#00E676] text-xs font-black px-2 py-1.5 rounded-full w-full">
              TZS {balance.toLocaleString()}
            </span>
          </div>
          
          <div className="bg-[#1C1D24] border-2 border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[13px] mb-2 text-slate-300">Net Profit</span>
            <span className="bg-[#0B0C10] border border-slate-800 text-[#FFB800] text-xs font-black px-2 py-1.5 rounded-full w-full">
              TZS {balance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome to <span className="text-[#00E676]">OrderVerify</span></h2>
          <p className="text-sm text-slate-400">Verify Orders. Earn income.</p>
        </div>

        {/* Ticker between welcome and slider */}
        <div className="relative h-14 flex justify-center items-center my-2 w-full z-30">
          <TopPopupTicker />
        </div>

        {/* Hero Card */}
        <div className="border border-[#FFC107] rounded-3xl overflow-hidden shadow-[0_0_15px_rgba(255,193,7,0.15)] mt-4">
          <div className="h-48 sm:h-56 bg-slate-800 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={heroIndex}
                src={sliderImages[heroIndex]} 
                alt="Product Slider" 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="bg-[#0B0C10] p-3 border-t border-slate-800">
            <a 
              href="https://chat.whatsapp.com/D1b8NV1tkMo0uPGHdE4rjR?s=cl&p=a&mlu=4&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#20b958] text-white font-black text-center py-3 rounded-xl uppercase text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" /> JIUNGE NA GROUP LETU
            </a>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="bg-[#1C1D24] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl mt-6">
          <h2 className="text-lg font-black leading-tight mb-3 text-white uppercase tracking-wide">
            KWANINI UNALIPWA KWA KUTHIBITISHA ORDER?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
            Kama mshirika wa <span className="text-[#00E676] font-bold">OrderVerify</span>, jukumu lako ni kuthibitisha uwepo wa bidhaa na utayari wa mteja. Unapothibitisha order, unaipa kampuni uhakika wa kufanya mauzo bila mteja kughairi. Kutokana na kazi hii muhimu ya kulinda mauzo ya kampuni, <span className="text-white font-bold">utalipwa kamisheni ya asilimia 5% ya thamani halisi ya bidhaa hiyo.</span> Mfano, ukithibitisha bidhaa ya TZS 100,000, utalipwa TZS 5,000 papo hapo kwenye akaunti yako.
            Anza sasa kwa mtaji wa <span className="text-white font-bold">TZS 14,500</span> tu na urudishe mtaji wako haraka!
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
          <p className="text-[#00E676] text-sm font-bold mb-4">Zinazosubiri Kuthibitishwa (5% Kamisheni)</p>
          
          <div className="inline-flex items-center gap-2 bg-[#1C1D24] border border-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            📅 Orodha Zilizopo Sasa Hivi
          </div>
        </div>

        {/* Order Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {currentOrders.map((order) => {
            const isVerified = verifiedOrders.includes(order.id);
            
            return (
              <div key={order.id} className={`bg-[#1C1D24] text-white rounded-2xl overflow-hidden flex flex-col shadow-xl border ${isVerified ? 'border-slate-800 opacity-60' : 'border-slate-700 hover:border-[#00E676]/50 transition-colors'}`}>
                {/* Product Image Top */}
                <div className="h-24 bg-slate-800 relative">
                  <img src={order.productImage} alt={order.product} className={`w-full h-full object-cover ${isVerified ? 'grayscale' : ''}`} />
                  {isVerified && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-[#00E676] text-black text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> THIBITISHO TAYARI
                      </div>
                    </div>
                  )}
                  {!isVerified && (
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-700 shadow-lg">
                      {order.flag} {order.country}
                    </div>
                  )}
                </div>
                
                <div className="p-2.5 flex-1 flex flex-col">
                  
                  {/* User Profile */}
                  <div className="flex items-center gap-2 mb-2">
                    <img src={order.avatar} alt={order.name} className="w-7 h-7 rounded-full border border-slate-700 object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[11px] truncate text-slate-300">{order.name}</h4>
                      <p className="text-[9px] text-slate-500 truncate">Mteja wa {order.country}</p>
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
                  <div className="bg-[#0B0C10] rounded-xl p-1.5 mb-2 border border-slate-800 text-center flex flex-col items-center">
                    <p className="text-[8px] font-bold text-slate-500 uppercase mb-0.5">MALIPO YAKO (5%)</p>
                    <p className="text-[#00E676] font-black text-xs">TZS {order.payout.toLocaleString()}</p>
                  </div>

                  {/* Action Button / Success Status */}
                  <div className="mt-auto relative space-y-2">
                    {isVerified ? (
                      <div className="bg-[#00E676] text-black text-[9px] font-bold p-2 rounded-xl text-center shadow-lg border border-[#00E676] z-10 flex flex-col items-center gap-0.5">
                        <span>🎉 Umelipwa TZS {order.payout.toLocaleString()}!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveVerification(order);
                          setCallStatus('idle');
                          setVerificationText("SEND");
                        }}
                        className="w-full py-2 rounded-xl font-black text-[11px] uppercase flex items-center justify-center gap-1 transition-transform bg-[#00E676] text-black hover:scale-105 active:scale-95 shadow-md shadow-[#00E676]/20"
                      >
                        THIBITISHA ORDER
                      </button>
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
            <div className="bg-gradient-to-r from-indigo-900 to-[#1C1D24] border border-indigo-500/30 rounded-3xl p-6 text-center w-full shadow-xl">
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">
                Kuna Order Zaidi ya 1,450 Zinasubiri!
              </h3>
              <p className="text-indigo-200 text-sm mb-4">
                Ili kuendelea kuona order nyingi zaidi zenye malipo makubwa, unahitaji kukamilisha usajili wa akaunti yako leo.
              </p>
              <a 
                href="https://adsblog.app/page/reg.php?reg=Joddie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#00E676] text-black font-black px-8 py-3 rounded-full text-sm hover:bg-[#00C260] transition-colors"
              >
                JISAJILI SASA KUFUNGUA ORDER ZOTE
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a 
            href="https://adsblog.app/page/reg.php?reg=Joddie"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00E676] text-black font-black text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
          >
            <UserPlus className="w-5 h-5" /> JISAJILI HAPA
          </a>
          <a 
            href="sms:+255740463671?body=Habari%20Naomba%20unielekeze%20zaidi%20kuhusu%20kuthibitisha%20order%20za%20wateja%20na%20kulipwa"
            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
          >
            <MessageSquare className="w-5 h-5 text-blue-400" /> Tuma Ujumbe
          </a>
          <button 
            onClick={() => handleActionRequiresAuth("Ili ku-install App, tafadhali jisajili kwanza.")}
            className="bg-slate-800 text-white border border-slate-600 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
          >
            <Smartphone className="w-5 h-5 text-indigo-400" /> Install App
          </button>
        </div>

        {/* Registration Instructions */}
        <div className="bg-[#1C1D24] border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl mt-8">
          <h2 className="text-xl font-black mb-4 text-[#00E676] uppercase tracking-wide flex items-center gap-2 border-b border-slate-700 pb-3">
            <UserPlus className="w-6 h-6" /> JINSI YA KUJISAJILI
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-medium text-slate-300">
            <p className="flex items-start gap-2">
              <span className="text-xl">1️⃣</span>
              <span>Weka email yako yoyote tu afu changanya na namba 👉👉 <span className="text-white italic">mfano anny33@gmail.com</span></span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">2️⃣</span>
              <span>Weka namba ya simu 👉👉 <span className="text-white italic">mfano 0740463678 au +255777729109</span></span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">3️⃣</span>
              <span>Weka jina la usajili wa laini yako <span className="text-white italic">Mfano Emma zakayo sas we weka lako</span></span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">4️⃣</span>
              <span>Weka username yako jina moja changanya na namba 2 afu bananisha maneno <span className="text-white italic">mfano juma55 au mussa44 usiruke nafasi</span></span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">5️⃣</span>
              <span>WEKA Paswerd yako yoyote tu cha msingi uwe unaikumbuka na iwe namba nne tu</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">6️⃣</span>
              <span>Rudia hiyo Paswerd tena</span>
            </p>
            
            <div className="mt-6 bg-[#00E676]/10 border border-[#00E676]/30 p-4 rounded-xl">
              <p className="text-white font-bold mb-3">Hakikisha unakariri username na password yako ulizo jaza hapo wakati wa kujisajili</p>
              <p className="text-white font-bold mb-3">Afu bofya hilo neno <span className="text-[#00E676] italic">SIGN UP</span></p>
              <p className="text-[#00E676] font-black italic border-t border-[#00E676]/20 pt-3">Ukimaliza kujisajili lipia automatic au lipia kwa Lipa Namba itakayo onekana Baada ya kujisajili Kisha tuma taarifa kwa agent wetu. Ukishindwa wasiliana na agent wetu.</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-[#1C1D24] border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-[#00E676]" />
              Maoni ya Wateja Wetu
            </h3>
            <span className="text-[#00E676] text-xs font-bold bg-[#00E676]/10 px-3 py-1 rounded-full">
              {comments.length} Comments
            </span>
          </div>
          
          <div className="space-y-4">
            {comments.slice(0, showAllComments ? comments.length : 4).map((comment) => (
              <div key={comment.id} className="flex flex-col gap-3 bg-[#0B0C10] p-3 rounded-2xl border border-slate-800">
                <div className="flex gap-3">
                  <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full border border-slate-700 object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{comment.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{comment.text}</p>
                    <span className="text-[10px] text-slate-500 mt-2 block">{comment.time}</span>
                  </div>
                </div>
                
                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 mt-1 space-y-2 border-l-2 border-slate-800 pl-3">
                    {comment.replies.map((reply: any) => (
                      <div key={reply.id} className="flex gap-2">
                        <img src={reply.avatar} alt={reply.name} className="w-6 h-6 rounded-full border border-slate-700 object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-white">{reply.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="mt-5 flex gap-2">
            <input 
              type="text" 
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Andika maoni yako hapa..." 
              className="flex-1 bg-[#0B0C10] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E676]"
            />
            <button 
              type="submit"
              className="bg-[#00E676] text-black font-bold px-5 py-3 rounded-xl text-sm hover:bg-[#00C260] transition-colors"
            >
              Tuma
            </button>
          </form>
          
          {!showAllComments && comments.length > 4 && (
            <button 
              onClick={() => setShowAllComments(true)}
              className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              View All <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-12 mb-6 border-t border-slate-800 pt-8 pb-4 text-center">
          <h2 className="text-xl font-black mb-4 tracking-tight uppercase text-white">ORDERVERIFY</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-400 mb-6">
            <a href="#" className="hover:text-[#00E676] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#00E676] transition-colors">Contact Support</a>
            <a href="#" className="hover:text-[#00E676] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00E676] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#00E676] transition-colors">FAQ</a>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} OrderVerify Inc. All rights reserved. <br className="sm:hidden" />
            Global Order Verification & Processing System.
          </p>
        </div>

      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C1D24] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative border border-slate-700"
            >
              <h3 className="text-white font-black text-lg mb-5 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#00E676]" /> KUTOA PESA 
              </h3>
              
              <div className="mb-4">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">1. Chagua Mtandao</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelectedNetwork('mpesa')}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'mpesa' ? 'bg-[#E3000F] text-white border-[#E3000F] shadow-[0_0_15px_rgba(227,0,15,0.4)] scale-105' : 'bg-[#E3000F]/10 border-[#E3000F]/30 text-[#E3000F] hover:border-[#E3000F]'}`}
                  >
                    M-Pesa
                  </button>
                  <button 
                    onClick={() => setSelectedNetwork('tigo')}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'tigo' ? 'bg-[#003B71] text-white border-[#003B71] shadow-[0_0_15px_rgba(0,59,113,0.4)] scale-105' : 'bg-[#003B71]/10 border-[#003B71]/30 text-[#4A90E2] hover:border-[#003B71]'}`}
                  >
                    Tigo Pesa
                  </button>
                  <button 
                    onClick={() => setSelectedNetwork('airtel')}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all ${selectedNetwork === 'airtel' ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.4)] scale-105' : 'bg-[#FF0000]/10 border-[#FF0000]/30 text-[#FF4D4D] hover:border-[#FF0000]'}`}
                  >
                    Airtel Money
                  </button>
                  <button 
                    onClick={() => setSelectedNetwork('halopesa')}
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
                  className="w-full bg-[#0B0C10] border border-slate-700 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#00E676] focus:outline-none focus:ring-1 focus:ring-[#00E676]"
                />
              </div>

              <div className="mb-6">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">3. Kiasi (TZS)</label>
                <input 
                  type="number" 
                  placeholder="Kuanzia 1,000 TZS" 
                  className="w-full bg-[#0B0C10] border border-slate-700 rounded-xl px-4 py-3.5 text-white font-black text-lg focus:outline-none focus:border-[#00E676]"
                />
                <p className="text-[10px] text-slate-500 mt-1">Kutoa pesa ni kuanzia elfu moja (1,000 TZS).</p>
              </div>

              <button 
                onClick={() => {
                  setShowWithdrawModal(false);
                  handleActionRequiresAuth("Ili kuruhusiwa kutoa pesa kwenda kwenye namba yako, lazima uwe umekamilisha usajili wa akaunti kwanza.");
                }}
                className="w-full bg-[#00E676] text-black font-black py-4 rounded-xl hover:bg-[#00C260] transition-colors uppercase tracking-wider text-sm shadow-lg shadow-[#00E676]/20"
              >
                TUMA MAOMBI YA PESA
              </button>
              
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="w-full mt-3 text-slate-400 font-bold py-3 text-xs hover:text-white transition-colors"
              >
                Funga
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C10]/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C1D24] rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border border-slate-700 text-center"
            >
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 text-[#FFC107] p-3 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Usajili Unahitajika</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {modalMessage}
              </p>
              <div className="space-y-3">
                <a 
                  href="https://adsblog.app/page/reg.php?reg=Joddie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#00E676] hover:bg-[#00C260] text-black font-black py-4 px-4 rounded-xl transition-colors shadow-lg"
                >
                  JISAJILI SASA (14,500/=)
                </a>
                <button 
                  onClick={() => setShowRegisterModal(false)}
                  className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-4 rounded-xl transition-colors"
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
                    onClick={() => setActiveVerification(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-black bg-slate-100 rounded-full p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <img src={activeVerification.avatar} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#00E676] object-cover" />
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
                    <button onClick={() => simulateCall('calling-video')} className="bg-white border border-slate-200 rounded-2xl py-4 flex flex-col items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                      <Video className="w-6 h-6 mb-1 text-indigo-500" />
                      <span className="text-[10px] font-black uppercase tracking-wide">Video Call</span>
                    </button>
                    <button onClick={() => simulateCall('calling-voice')} className="bg-white border border-slate-200 rounded-2xl py-4 flex flex-col items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                      <Phone className="w-6 h-6 mb-1 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-wide">Voice Call</span>
                    </button>
                  </div>
                  
                  <motion.button 
                    onClick={() => handleConfirmAction(activeVerification.id, activeVerification.payout)}
                    animate={{ rotate: [-2, 2, -2, 2, 0], scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-full bg-[#00E676] text-black font-black px-5 py-4 rounded-2xl hover:bg-[#00C260] shadow-[0_5px_15px_rgba(0,230,118,0.3)] flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  >
                    <Send className="w-5 h-5" /> SEND ORDER
                  </motion.button>
                </div>
              ) : (
                <div className="p-8 py-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-900 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="relative w-28 h-28 mx-auto mb-6">
                      <img src={activeVerification.avatar} className="w-full h-full rounded-full border-4 border-[#00E676] object-cover relative z-10" />
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
    </div>
  );
}

export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  if (!isAgeVerified) {
    return <AgeVerification onVerify={() => setIsAgeVerified(true)} />;
  }

  return <Dashboard />;
}
