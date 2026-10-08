import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, CheckCircle2, Volume2, VolumeX, Play, Pause, AlertCircle, Wallet, 
  UserPlus, MessageCircle, Send, Globe, MessageSquare, X, Loader2,
  Activity, ChevronRight, ChevronLeft, Smartphone, Users, ArrowDownToLine, ChevronDown, PhoneCall,
  Video, Phone, Mic, PhoneOff, CreditCard, ShieldCheck
  , ShoppingBag, Eye, EyeOff, Clock, Calendar, AlertTriangle, Bell, History
} from 'lucide-react';
import { orderData, livePayouts, initialComments, generate6HourComments, formatLocalCurrency, update6HourDataIfChanged, STORAGE_VERSION_TAG } from './data';
import { TutorialVideoSection } from './components/TutorialVideoSection';
import { RegistrationVideoSection } from './components/RegistrationVideoSection';
import { WithdrawalTransaction } from './types/withdrawal';
import { WithdrawReceiptModal } from './components/WithdrawReceiptModal';
import { WithdrawHistoryModal } from './components/WithdrawHistoryModal';

import imgHeroCeremony from "./assets/images/orderverify_diverse_ceremony_official_aligned_text_jpg_1791350716559.jpg";

import { db, auth, collection, addDoc, serverTimestamp, signInWithGoogle, onSnapshot, query, orderBy, updateDoc, doc, getDocs, setDoc } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

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

    // 1. Register Service Worker explicitly in background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => console.log('SW Registered:', reg))
        .catch(err => console.log('SW Registration Failed:', err));
    }
    
    // Baada ya kuthibitisha umri, endelea kuingia ndani bila usumbufu
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
        className="bg-[#141520] p-4 sm:p-6 rounded-3xl max-w-lg w-full border-2 border-emerald-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-slate-100 relative z-10"
      >
        {/* HERO CARD: Picha yenye maneno yote rasmi ndani yake ili kuzuia ukurasa kuwa mrefu */}
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl bg-slate-900 mb-3">
          <img 
            src={imgHeroCeremony} 
            alt="Uzinduzi Rasmi wa Mradi wa OrderVerify Tanzania - ORDERVERIFY CONTRACT" 
            referrerPolicy="no-referrer"
            className="w-full h-52 sm:h-64 object-cover object-center"
          />

          {/* Maneno Rasmi Yaliyowekwa Ndani ya Picha */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90 flex flex-col justify-between p-3 sm:p-4 text-center">
            {/* Sehemu ya Juu Ndani ya Picha */}
            <div className="flex flex-col items-center">
              {/* ORDERVERIFY - Thibitisha order pata kipato */}
              <div className="bg-white px-3.5 py-1 rounded-xl border border-emerald-400/60 shadow-lg flex flex-col items-center mb-1.5">
                <span className="text-black font-black text-lg sm:text-xl tracking-tight leading-none">
                  ORDER<span className="text-emerald-500">VERIFY</span>
                </span>
                <div className="h-0.5 w-full bg-emerald-500/30 my-0.5" />
                <span className="text-slate-700 text-[9px] font-black uppercase tracking-[0.12em] leading-none">
                  Thibitisha order pata kipato
                </span>
              </div>

              {/* ✨ WELCOME TO ORDERVERIFY SITE ✨ */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/25 backdrop-blur-sm border border-emerald-400/40 text-[#00E676] text-[10px] font-black tracking-wider uppercase mb-1">
                <span>✨</span> WELCOME TO ORDERVERIFY SITE <span>✨</span>
              </div>

              {/* JIINGIZIE KIPATO KUPITIA ORDERVERIFY */}
              <h1 className="text-xs sm:text-sm font-black tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight">
                JIINGIZIE KIPATO KUPITIA <span className="text-[#00E676]">ORDERVERIFY</span>
              </h1>
            </div>

            {/* Sehemu ya Chini Ndani ya Picha: Uzinduzi rasmi na makabidhiano */}
            <div className="flex items-center justify-center gap-2 bg-black/70 backdrop-blur-md py-1 px-2.5 rounded-xl border border-white/10 mx-auto max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shrink-0"></span>
              <p className="text-[9px] sm:text-[11px] font-bold text-slate-200 truncate">
                Uzinduzi rasmi na makabidhiano ya mradi wa OrderVerify nchini Tanzania 🇹🇿
              </p>
            </div>
          </div>
        </div>

        {/* Maneno aliyoagiza mtumiaji na style nzuri ya kuvutia */}
        <div className="bg-[#181A26] border border-emerald-500/30 rounded-2xl p-3 sm:p-4 mb-3 text-left shadow-inner">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            <span className="text-[#00E676] font-bold">OrderVerify</span> inakupa fursa ya kujiingizia kipato kwa kuthibitisha order za wateja kwa kuwatumia message za uthibitisho na kuzungumza nao, na kuisaidia kampuni yetu kutokupoteza wateja walio request hizo order kwa kupitia mawasiliano ya moja kwa moja ndani ya site ya <span className="text-[#00E676] font-bold">OrderVerify</span>.
          </p>
        </div>

        {/* Emoji ya mkono inayomwelekeza mteja kubonyeza kibox na kitufe */}
        <div className="bg-[#121420] border border-amber-400/40 rounded-2xl p-2.5 sm:p-3 mb-3 text-left flex items-center gap-2.5 shadow-md">
          <span className="text-2xl shrink-0 animate-bounce">👇</span>
          <p className="text-xs sm:text-sm text-amber-200 font-bold leading-snug">
            Tafadhali weka tiki kwenye kibox hapa chini kisha bonyeza <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded font-black border border-slate-700">INGIA NDANI YA SITE</span>.
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
          <span>🔒 Tovuti Salama</span>
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
    <div className="bg-[#1C1D24] border border-amber-500/30 rounded-2xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.35)] flex flex-row items-center justify-center gap-3 relative z-0">
      <div className="flex gap-2.5 w-full justify-center overflow-x-auto pb-1 sm:pb-0">
        <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 whitespace-nowrap shadow-inner min-w-0 max-w-[55%]">
          <span className="text-[9px] text-slate-400 font-bold block mb-0.5 uppercase tracking-wider">Tarehe</span>
          <span className="text-xs sm:text-sm text-white font-black truncate block">{dateString}</span>
        </div>
        <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 whitespace-nowrap shadow-inner min-w-0">
          <span className="text-[9px] text-slate-400 font-bold block mb-0.5 uppercase tracking-wider">Saa (Live)</span>
          <span className="text-xs sm:text-sm text-[#00E676] font-black">{timeString}</span>
        </div>
      </div>
    </div>
  );
}

// --- Web Push Protocol (Google FCM Support) ---
const VAPID_PUBLIC_KEY = 'BFBhxwnnWkz7MrHyXye44UH12o9twrla8JSw2qgEcY3IIO7JjmiVRE5zR6AzRvNEr85pJ8xqkrNhYr4moZHWDEw';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const registerWebPushSubscription = async (phoneNumber?: string, withdrawalId?: string) => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return null;
  }
  
  // Prevent subscription attempt if permission is not granted to avoid "permission denied" error console spam
  if (Notification.permission !== 'granted') {
    return null;
  }

  try {
    // Hakikisha Service Worker imesajiliwa na kuamshwa
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    if (sub) {
      const subJson = sub.toJSON();
      localStorage.setItem('orderverify_push_sub', JSON.stringify(subJson));
      const wid = withdrawalId || localStorage.getItem('orderverify_withdrawal_id') || '';
      const phone = phoneNumber || localStorage.getItem('orderverify_withdrawn_phone') || '';
      const res = await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: subJson,
          phoneNumber: phone,
          withdrawalId: wid
        })
      });
      const data = await res.json();
      console.log('✅ Web Push registered on server successfully:', data);
      return subJson;
    }
  } catch (err) {
    console.error('Push subscription background registration error:', err);
  }
  return null;
};

// --- Main Dashboard ---

function WithdrawalItem({ w, onUpdateStatus }: { w: any, onUpdateStatus: (id: string, status: string) => void, key?: any }) {
  const [msg, setMsg] = useState('OrderVerify - Malipo Yako Yapo Pending! Pesa ulizoomba kutoa kwenye akaunti yetu zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa. Tafadhali lipa activation fee ya 14500 ili upokee pesa zako leo hii.');
  const [sendingNotif, setSendingNotif] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [sendingSms, setSendingSms] = useState(false);
  const [smsFeedback, setSmsFeedback] = useState<{ type: 'success' | 'pending' | 'error', text: string } | null>(null);

  const sendNormalSms = async () => {
    if (!w.phoneNumber) return;
    setSendingSms(true);
    setSmsFeedback(null);
    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: w.phoneNumber,
          message: msg
        })
      });
      const data = await res.json();
      if (data.success) {
        setSmsFeedback({
          type: 'success',
          text: `✅ ${data.message}`
        });
      } else if (data.pendingSender) {
        setSmsFeedback({
          type: 'pending',
          text: `⏳ ${data.message}`
        });
      } else {
        setSmsFeedback({
          type: 'error',
          text: `❌ ${data.message || 'Hitilafu ya kutuma SMS.'}`
        });
      }
    } catch (e: any) {
      setSmsFeedback({
        type: 'error',
        text: '❌ Hitilafu ya mtandao: ' + (e?.message || 'Tafadhali jaribu tena.')
      });
    } finally {
      setSendingSms(false);
    }
  };

  const sendChromeNotif = async () => {
    if (!w.id) return;
    setSendingNotif(true);
    setFeedback(null);
    try {
      // 1. Update in Firestore
      await updateDoc(doc(db, 'withdrawals', w.id), {
        adminMessage: msg,
        lastReminderAt: serverTimestamp()
      });

      // 2. Broadcast to system_alerts for live snapshot delivery
      await setDoc(doc(db, 'system_alerts', 'latest_broadcast'), {
        title: 'OrderVerify - Taarifa ya Malipo',
        body: msg,
        targetPhone: w.phoneNumber,
        targetWithdrawalId: w.id,
        timestamp: serverTimestamp()
      }).catch(() => {});

      let pushSent = 0;
      try {
        const pushRes = await fetch('/api/send-push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            withdrawalId: w.id,
            phoneNumber: w.phoneNumber,
            title: 'OrderVerify - Taarifa ya Malipo',
            body: msg
          })
        });
        const pushData = await pushRes.json();
        pushSent = pushData.sentCount || 0;
      } catch (err) {}

      if (pushSent > 0) {
        setFeedback({
          type: 'success',
          text: `✅ Notification ya Chrome imefika moja kwa moja kwenye simu ya ${w.phoneNumber}!`
        });
      } else {
        setFeedback({
          type: 'success',
          text: `✅ Ujumbe umehifadhiwa kwa ${w.phoneNumber}. Ataiona akifungua website. (Ili apokee taarifa juu ya kioo simu ikiwa imefungwa, lazima abonyeze "Allow" kwenye Chrome wakati wa kutoa fedha).`
        });
      }
    } catch (e: any) {
      console.error(e);
      setFeedback({
        type: 'error',
        text: "❌ Hitilafu ya kutuma: " + (e?.message || "Tafadhali hakikisha una mtandao.")
      });
    } finally {
      setSendingNotif(false);
    }
  };

  return (
    <div className="bg-[#141520] border-2 border-slate-800 p-5 rounded-3xl flex flex-col gap-5 shadow-2xl">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[#00E676] font-black text-2xl tracking-tighter">TZS {w.amount?.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <p className="text-white font-extrabold text-lg">{w.phoneNumber}</p>
            <span className="text-[10px] text-white font-black px-2 py-0.5 bg-blue-600 rounded-md uppercase">{w.network}</span>
          </div>
          <p className="text-slate-500 text-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {w.timestamp?.toDate ? new Date(w.timestamp.toDate()).toLocaleString() : 'Hivi sasa'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border-2 ${w.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
            {w.status === 'completed' ? 'KIMESHAFANYIKA ✅' : 'PENDING ⏳'}
          </span>
          {w.hasNotificationPermission ? (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              CHROME: IMERUHUSIWA ✅
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              CHROME: HAJARUHUSU ❌
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-black text-[#00E676] uppercase tracking-[0.15em] flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> ANDIKA UJUMBE WA CHROME NOTIFICATION
          </label>
          <span className="text-[10px] text-slate-500 font-bold">{msg.length} / 500</span>
        </div>
        
        <div className="relative">
          <textarea 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full bg-[#0A0B10] border-2 border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:border-[#00E676] focus:ring-4 focus:ring-[#00E676]/10 outline-none h-28 transition-all resize-none shadow-inner"
            placeholder="Andika ujumbe utakaoingia kama taarifa ya Chrome kwenye simu ya mteja huyu..."
          />
        </div>

        {/* Action Buttons: Chrome Notification & Normal SMS */}
        <div className="flex flex-col gap-2.5">
          {/* 1. Chrome Notification */}
          <button 
            onClick={sendChromeNotif}
            disabled={sendingNotif}
            className="w-full bg-gradient-to-r from-emerald-500 via-[#00E676] to-teal-500 hover:brightness-110 active:scale-98 text-black text-xs sm:text-sm font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-emerald-500/25 cursor-pointer disabled:opacity-50"
          >
            {sendingNotif ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>INATUMA NOTIFICATION KWENYE SIMU YAKE...</span>
              </>
            ) : (
              <>
                <Globe className="w-5 h-5 animate-pulse" />
                <span>TUMA NOTIFICATION YA CHROME 🔔</span>
              </>
            )}
          </button>

          {feedback && (
            <div className={`p-3 rounded-xl text-xs font-bold ${
              feedback.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {feedback.text}
            </div>
          )}

          {/* 2. Normal SMS (ORDERVERIFY / Beem Africa) */}
          <button 
            onClick={sendNormalSms}
            disabled={sendingSms}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 active:scale-98 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-blue-600/25 cursor-pointer disabled:opacity-50 border border-blue-400/30"
          >
            {sendingSms ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>INATUMA SMS YA KAWAIDA KWA BEEM...</span>
              </>
            ) : (
              <>
                <Smartphone className="w-5 h-5" />
                <span>📲 TUMA SMS YA KAWAIDA (ORDERVERIFY)</span>
              </>
            )}
          </button>

          {smsFeedback && (
            <div className={`p-3 rounded-xl text-xs font-bold ${
              smsFeedback.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : smsFeedback.type === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {smsFeedback.text}
            </div>
          )}

          {w.status !== 'completed' && (
            <button 
              onClick={() => onUpdateStatus(w.id, 'completed')}
              className="w-full bg-white hover:bg-slate-100 text-black text-xs font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 border-b-4 border-slate-300 cursor-pointer"
            >
              WEKA COMPLETED (MALIPO TAYARI) ✅
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ withdrawals, onClose, onUpdateStatus }: { withdrawals: any[], onClose: () => void, onUpdateStatus: (id: string, status: string) => void }) {
  const [broadcastMsg, setBroadcastMsg] = useState(
    'OrderVerify - Malipo Yako Yapo Pending! Pesa ulizoomba kutoa kwenye akaunti yetu zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa. Tafadhali lipa activation fee ya 14500 ili upokee pesa zako leo hii.'
  );
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastFeedback, setBroadcastFeedback] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const [beemBalance, setBeemBalance] = useState<number | null>(null);
  const [isBroadcastingSms, setIsBroadcastingSms] = useState(false);
  const [broadcastSmsFeedback, setBroadcastSmsFeedback] = useState<{ type: 'success' | 'pending' | 'error' | 'info', text: string } | null>(null);

  const [directPhone, setDirectPhone] = useState('');
  const [directMsg, setDirectMsg] = useState('OrderVerify: Habari, maombi yako ya kutoa pesa yamepokelewa na yako pending. Tafadhali kamilisha ada ya usajili ya 14,500/= ili upokee pesa zako leo hii.');
  const [sendingDirectSms, setSendingDirectSms] = useState(false);
  const [directSmsFeedback, setDirectSmsFeedback] = useState<{ type: 'success' | 'pending' | 'error', text: string } | null>(null);

  const handleSendDirectSms = async () => {
    if (!directPhone.trim()) {
      setDirectSmsFeedback({ type: 'error', text: 'Tafadhali jaza namba ya simu ya mpokeaji (mfano: 07XXXXXXXX).' });
      return;
    }
    if (!directMsg.trim()) {
      setDirectSmsFeedback({ type: 'error', text: 'Tafadhali andika ujumbe wako kwenye kisanduku.' });
      return;
    }
    setSendingDirectSms(true);
    setDirectSmsFeedback(null);
    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: directPhone,
          message: directMsg
        })
      });
      const data = await res.json();
      if (data.success) {
        setDirectSmsFeedback({ type: 'success', text: `✅ ${data.message}` });
      } else if (data.pendingSender) {
        setDirectSmsFeedback({ type: 'pending', text: `⏳ ${data.message}` });
      } else {
        setDirectSmsFeedback({ type: 'error', text: `❌ ${data.message || 'Imeshindikana kutuma.'}` });
      }
    } catch (e: any) {
      setDirectSmsFeedback({ type: 'error', text: '❌ Hitilafu ya mtandao: ' + (e?.message || 'Tafadhali jaribu tena.') });
    } finally {
      setSendingDirectSms(false);
    }
  };

  useEffect(() => {
    fetch('/api/beem-balance')
      .then(res => res.json())
      .then(data => {
        if (data?.success && data?.data?.data?.credit_balance !== undefined) {
          setBeemBalance(data.data.data.credit_balance);
        }
      })
      .catch(() => {});
  }, []);

  const handleBroadcastSms = async () => {
    if (!broadcastMsg.trim()) {
      setBroadcastSmsFeedback({ type: 'error', text: "Tafadhali andika ujumbe kwanza kwenye kisanduku hapo juu." });
      return;
    }
    setIsBroadcastingSms(true);
    setBroadcastSmsFeedback(null);
    try {
      const snap = await getDocs(query(collection(db, 'withdrawals')));
      const allDocs = snap.docs;
      const targetList = allDocs.length > 0 
        ? allDocs.map(d => ({ id: d.id, ...d.data() }))
        : withdrawals;

      if (targetList.length === 0) {
        setBroadcastSmsFeedback({
          type: 'info',
          text: "⚠️ Hakuna wateja waliopatikana kwa ajili ya kutumiwa SMS."
        });
        setIsBroadcastingSms(false);
        return;
      }

      let successCount = 0;
      let pendingSender = false;
      for (const t of targetList) {
        if (!t.phoneNumber) continue;
        try {
          const res = await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phoneNumber: t.phoneNumber,
              message: broadcastMsg
            })
          });
          const resData = await res.json();
          if (resData.success) {
            successCount++;
          } else if (resData.pendingSender) {
            pendingSender = true;
          }
        } catch (err) {}
      }

      if (pendingSender) {
        setBroadcastSmsFeedback({
          type: 'pending',
          text: "⏳ Mfumo wa Beem umeunganishwa kikamilifu! Jina la ORDERVERIFY bado liko kwenye ukaguzi (Pending) wa TCRA/Beem. Mara likikamilika kuthibitishwa, SMS zitaanza kuruka mara moja!"
        });
      } else {
        setBroadcastSmsFeedback({
          type: 'success',
          text: `✅ SMS za kawaida zimetumwa kwa wateja ${successCount} kupitia Beem Africa!`
        });
      }
    } catch (e: any) {
      setBroadcastSmsFeedback({
        type: 'error',
        text: '❌ Hitilafu ya kutuma SMS: ' + (e?.message || 'Tafadhali jaribu tena.')
      });
    } finally {
      setIsBroadcastingSms(false);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastMsg.trim()) {
      setBroadcastFeedback({ type: 'error', text: "Tafadhali andika ujumbe kwanza kwenye kisanduku hapa chini." });
      return;
    }

    setIsBroadcasting(true);
    setBroadcastFeedback(null);

    try {
      // 1. Query Firestore directly so we always get all records without state sync delays
      const snap = await getDocs(query(collection(db, 'withdrawals')));
      const allDocs = snap.docs;

      const targetList = allDocs.length > 0 
        ? allDocs.map(d => ({ id: d.id, ...d.data() }))
        : withdrawals;

      if (targetList.length === 0) {
        setBroadcastFeedback({
          type: 'info',
          text: "⚠️ Hakuna maombi ya kutoa fedha yaliyopatikana kwenye database kwa sasa."
        });
        setIsBroadcasting(false);
        return;
      }

      // 1. Broadcast to system_alerts so all online client devices trigger immediately
      await setDoc(doc(db, 'system_alerts', 'latest_broadcast'), {
        title: 'OrderVerify – Malipo Yako Yapo Pending!',
        body: broadcastMsg,
        timestamp: serverTimestamp()
      }).catch(() => {});

      // 2. Update all in Firestore
      const updates = targetList.map((item: any) => 
        updateDoc(doc(db, 'withdrawals', item.id), {
          adminMessage: broadcastMsg,
          lastReminderAt: serverTimestamp()
        })
      );
      await Promise.all(updates);

      // 3. Broadcast via Google FCM Web Push
      let pushSent = 0;
      try {
        const pushRes = await fetch('/api/send-push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'OrderVerify – Malipo Yako Yapo Pending!',
            body: broadcastMsg
          })
        });
        const pushData = await pushRes.json();
        pushSent = pushData.sentCount || 0;
      } catch (err) {
        console.error('Push broadcast error:', err);
      }

      setBroadcastFeedback({
        type: 'success',
        text: `✅ CHROME BROADCAST IMETUMWA KIKAMILIFU! Wateja wote (${targetList.length}) wametumiwa notification hii mara moja kwenye simu zao!`
      });
    } catch (e: any) {
      console.error(e);
      setBroadcastFeedback({
        type: 'error',
        text: "❌ Hitilafu ya kutuma: " + (e?.message || "Tafadhali jaribu tena.")
      });
    } finally {
      setIsBroadcasting(false);
    }
  };

  const allowedChromeCount = withdrawals.filter(w => w.hasNotificationPermission).length;

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0B10] overflow-y-auto p-4 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#0A0B10]/95 backdrop-blur-md py-4 z-10 border-b border-slate-800/50">
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">ADMIN PANEL</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Dhibiti Malipo</p>
              <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-blue-400" />
                SMS SALIO (BEEM): <strong className="text-white">{beemBalance !== null ? `${beemBalance} Credits` : '260 Credits'}</strong>
              </span>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                SENDER: ORDERVERIFY
              </span>
              <button 
                onClick={async () => {
                  if (!('Notification' in window)) {
                    alert("Kifaa hiki hakitumii Web Notifications.");
                    return;
                  }
                  if (Notification.permission === 'granted') {
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.ready.then(reg => {
                        reg.showNotification("OrderVerify Test", {
                          body: "Jaribio la taarifa ya Chrome kutoka OrderVerify!",
                          icon: '/orderverify_official_logo.jpg'
                        });
                        alert("✅ Notification ya Chrome imetumwa kwenye kioo cha simu yako!");
                      }).catch(() => {
                        try {
                          new Notification("OrderVerify Test", {
                            body: "Jaribio la taarifa kutoka OrderVerify!",
                            icon: '/orderverify_official_logo.jpg'
                          });
                          alert("✅ Notification imetumwa kwenye kioo!");
                        } catch (e: any) {
                          alert("Taarifa: " + e.message);
                        }
                      });
                    }
                  } else {
                    const p = await Notification.requestPermission();
                    if (p === 'granted') {
                      alert("✅ Umeruhusu! Bonyeza tena kupima.");
                    } else {
                      alert("⚠️ Hujaruhusu notifications kwenye Chrome.");
                    }
                  }
                }}
                className="bg-[#00E676] text-black text-[9px] px-3 py-1.5 rounded-lg font-black uppercase shadow-lg active:scale-90 cursor-pointer"
              >
                🔔 TEST CHROME
              </button>
            </div>
          </div>
          <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-2xl transition-all active:scale-90 shadow-lg cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Broadcast & Custom Message Section */}
        <div className="bg-[#141520] border-2 border-emerald-500/40 p-5 sm:p-6 rounded-3xl mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-black px-2.5 py-1 rounded-md">
                ✍️ SEHEMU YA KUANDIKA UJUMBE
              </span>
              <h3 className="text-white font-black text-lg sm:text-xl mt-1.5 flex items-center gap-2">
                Andika Ujumbe Unaoutaka Kuwatumia Wateja Wote
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Unaweza kufuta na kuandika maneno yako yoyote unayotaka wateja wayasome.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                Wateja: <strong className="text-white">{withdrawals.length}</strong>
              </span>
            </div>
          </div>

          {/* Quick Template Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] text-slate-400 font-bold">Mifano ya Haraka:</span>
            <button
              onClick={() => setBroadcastMsg('OrderVerify - Malipo Yako Yapo Pending! Pesa ulizoomba kutoa kwenye akaunti yetu zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa. Tafadhali lipa activation fee ya 14500 ili upokee pesa zako leo hii.')}
              className="text-[10px] font-bold bg-[#0A0B10] hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              📌 Ujumbe wa Pending (14,500/=)
            </button>
            <button
              onClick={() => setBroadcastMsg('OrderVerify: Habari mteja wetu, tunakukumbusha kukamilisha akaunti yako ili malipo yako yaweze kutumwa kwenye namba yako leo hii. Tembelea tovuti yetu sasa.')}
              className="text-[10px] font-bold bg-[#0A0B10] hover:bg-slate-800 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              💬 Ujumbe Mfupi wa Kikumbusho
            </button>
            <button
              onClick={() => setBroadcastMsg('')}
              className="text-[10px] font-bold bg-[#0A0B10] hover:bg-rose-950/40 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              🗑️ Futa Sanduku Uandike Wako
            </button>
          </div>

          <div className="relative">
            <textarea
              value={broadcastMsg}
              onChange={(e) => {
                setBroadcastMsg(e.target.value);
                if (broadcastFeedback) setBroadcastFeedback(null);
                if (broadcastSmsFeedback) setBroadcastSmsFeedback(null);
              }}
              className="w-full bg-[#0A0B10] border-2 border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:border-[#00E676] focus:ring-4 focus:ring-[#00E676]/10 outline-none h-32 transition-all resize-none shadow-inner"
              placeholder="Andika ujumbe wako maalum hapa..."
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold px-1 mt-1">
              <span>Herufi: {broadcastMsg.length}</span>
              <span>Takriban SMS: {Math.ceil(broadcastMsg.length / 160) || 1} (Herufi 160 = SMS 1)</span>
            </div>
          </div>

          {/* Action Buttons: Chrome Broadcast & Normal SMS Broadcast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleBroadcast}
              disabled={isBroadcasting}
              className="w-full bg-gradient-to-r from-[#00E676] via-[#00D069] to-[#00B259] hover:brightness-110 active:scale-98 text-black text-xs sm:text-sm font-black py-4 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#00E676]/30 cursor-pointer disabled:opacity-50"
            >
              {isBroadcasting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>INATUMA KWA WATEJA WOTE...</span>
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  <span>TUMA CHROME NOTIFICATION KWA WATEJA WOTE 🚀</span>
                </>
              )}
            </button>

            <button
              onClick={handleBroadcastSms}
              disabled={isBroadcastingSms}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 active:scale-98 text-white text-xs sm:text-sm font-black py-4 px-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-blue-600/30 cursor-pointer disabled:opacity-50 border border-blue-400/30"
            >
              {isBroadcastingSms ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>INATUMA SMS ZA KAWAIDA KWA BEEM...</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-5 h-5" />
                  <span>📲 TUMA SMS YA KAWAIDA KWA WATEJA WOTE (ORDERVERIFY)</span>
                </>
              )}
            </button>
          </div>

          {broadcastFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border-2 ${
                broadcastFeedback.type === 'success' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : broadcastFeedback.type === 'info'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              {broadcastFeedback.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />}
              {broadcastFeedback.type === 'info' && <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />}
              {broadcastFeedback.type === 'error' && <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />}
              <span>{broadcastFeedback.text}</span>
            </motion.div>
          )}

          {broadcastSmsFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border-2 ${
                broadcastSmsFeedback.type === 'success' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : broadcastSmsFeedback.type === 'pending'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              {broadcastSmsFeedback.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />}
              {broadcastSmsFeedback.type === 'pending' && <Clock className="w-5 h-5 flex-shrink-0 text-amber-400" />}
              {broadcastSmsFeedback.type === 'error' && <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />}
              <span>{broadcastSmsFeedback.text}</span>
            </motion.div>
          )}
        </div>

        {/* Direct SMS Tool to ANY number */}
        <div className="bg-[#141520] border-2 border-blue-500/30 p-5 sm:p-6 rounded-3xl mb-8 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-2.5 py-1 rounded-md">
              📱 DIRECT SMS
            </span>
            <h3 className="text-white font-black text-lg mt-1.5 flex items-center gap-2">
              Tuma SMS ya Kawaida kwa Namba Yoyote Moja kwa Moja
            </h3>
            <p className="text-slate-400 text-xs">Unaweza kuandika namba yoyote ya simu na kumtumia ujumbe wa kawaida wenye jina la ORDERVERIFY.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-[11px] font-bold text-slate-300 mb-1 block">Namba ya Simu:</label>
              <input
                type="text"
                value={directPhone}
                onChange={(e) => setDirectPhone(e.target.value)}
                placeholder="07XXXXXXXX au 2557..."
                className="w-full bg-[#0A0B10] border-2 border-slate-800 rounded-2xl p-3.5 text-sm text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-300 mb-1 block">Ujumbe Utakaotumwa:</label>
              <textarea
                value={directMsg}
                onChange={(e) => setDirectMsg(e.target.value)}
                rows={2}
                placeholder="Andika ujumbe wako hapa..."
                className="w-full bg-[#0A0B10] border-2 border-slate-800 rounded-2xl p-3.5 text-sm text-white focus:border-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleSendDirectSms}
            disabled={sendingDirectSms}
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
          >
            {sendingDirectSms ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>INATUMA SMS KWA NAMBA HII...</span>
              </>
            ) : (
              <>
                <Smartphone className="w-5 h-5" />
                <span>TUMA SMS KWA NAMBA HII SASA (ORDERVERIFY) 🚀</span>
              </>
            )}
          </button>

          {directSmsFeedback && (
            <div className={`p-3.5 rounded-2xl text-xs font-bold ${
              directSmsFeedback.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : directSmsFeedback.type === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {directSmsFeedback.text}
            </div>
          )}
        </div>
        
        <div className="grid gap-5">
          {withdrawals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600 gap-4">
              <Activity className="w-16 h-16 opacity-20 animate-pulse" />
              <p className="font-bold text-sm tracking-wide">HAKUNA REKODI ZA MALIPO BADO</p>
            </div>
          ) : (
            withdrawals.map((w) => (
              <WithdrawalItem key={w.id} w={w} onUpdateStatus={onUpdateStatus} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const raf = requestAnimationFrame(scrollToTop);
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);

    // Boot scroll reset completed

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const [globalLoading, setGlobalLoading] = useState(false);
  const adminUnlockTapsRef = useRef(0);

  const handleSecretTap = () => {
    adminUnlockTapsRef.current += 1;
    if (adminUnlockTapsRef.current >= 5) {
      adminUnlockTapsRef.current = 0;
      handleAdminLogin();
    }
  };
  
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

  // Handle Version Reset for all states (Reset balance, profit, and orders after ad recording)
  useEffect(() => {
    const savedVersion = localStorage.getItem('orderverify_orders_catalog_version');
    
    // Explicitly reset if version mismatch
    if (savedVersion !== STORAGE_VERSION_TAG) {
      // Clear all state variables
      setBalance(0);
      setNetProfit(0);
      setVerifiedOrders([]);
      setHasPendingWithdrawal(false);
      
      // Clear all related localStorage items
      const keysToRemove = [
        'orderverify_verified_orders',
        'orderverify_user_balance',
        'orderverify_net_profit',
        'orderverify_has_pending_withdrawal',
        'orderverify_withdrawal_id',
        'orderverify_last_withdraw_amount',
        'orderverify_show_balance'
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Update version tag
      localStorage.setItem('orderverify_orders_catalog_version', STORAGE_VERSION_TAG);
      
      // Force reload to ensure all states are clean
      window.location.reload();
    }
  }, []);

  // Persistent User Balance & Net Profit (Lifetime persistent, never erased across updates or reloads)
  const [balance, setBalance] = useState<number>(() => {
    try {
      const v = localStorage.getItem('orderverify_orders_catalog_version');
      const b = localStorage.getItem('orderverify_user_balance');
      
      if (v !== STORAGE_VERSION_TAG) {
        return 0;
      }
      if (b !== null && !isNaN(Number(b))) {
        return Number(b);
      }
    } catch (e) {}
    return 0;
  });

  const [netProfit, setNetProfit] = useState<number>(() => {
    try {
      const v = localStorage.getItem('orderverify_orders_catalog_version');
      const p = localStorage.getItem('orderverify_net_profit');
      
      if (v !== STORAGE_VERSION_TAG) {
        return 0;
      }
      if (p !== null && !isNaN(Number(p))) {
        return Number(p);
      }
    } catch (e) {}
    return 0;
  });

  // Keep balance and net profit persistently saved in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('orderverify_user_balance', String(balance));
    } catch (e) {}
  }, [balance]);

  useEffect(() => {
    try {
      localStorage.setItem('orderverify_net_profit', String(netProfit));
    } catch (e) {}
  }, [netProfit]);

  const [showBalance, setShowBalance] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('orderverify_show_balance');
      return saved !== null ? saved === 'true' : true;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('orderverify_show_balance', String(showBalance));
    } catch (e) {}
  }, [showBalance]);

  // Persistent Verified Orders (Tied to the active order catalog & product signatures)
  const [verifiedOrders, setVerifiedOrders] = useState<string[]>(() => {
    try {
      const savedVersion = localStorage.getItem('orderverify_orders_catalog_version');
      // When the admin updates the order catalog to a new version, the user sees the new fresh orders to verify!
      if (savedVersion && savedVersion !== STORAGE_VERSION_TAG) {
        return [];
      }
      if (!savedVersion) {
        localStorage.setItem('orderverify_orders_catalog_version', STORAGE_VERSION_TAG);
      }
      const saved = localStorage.getItem('orderverify_verified_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(String);
        }
      }
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('orderverify_verified_orders', JSON.stringify(verifiedOrders));
      localStorage.setItem('orderverify_orders_catalog_version', STORAGE_VERSION_TAG);
    } catch (e) {}
  }, [verifiedOrders]);

  const isOrderVerified = (order: { id: number; product: string }) => {
    const sig = `${order.id}:${order.product}`;
    return verifiedOrders.includes(sig) || verifiedOrders.includes(String(order.id));
  };

  const [authModalState, setAuthModalState] = useState<{show: boolean, type: 'register' | 'payment', message: string}>({show: false, type: 'register', message: ''});
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);
  const [processingSecondsLeft, setProcessingSecondsLeft] = useState(12);
  const [showPaymentGuide, setShowPaymentGuide] = useState(false);
  const [showRegisterConfirmModal, setShowRegisterConfirmModal] = useState(false);
  const [registerModalStep, setRegisterModalStep] = useState<'confirm' | 'instructions'>('confirm');
  const [showInstallAppModal, setShowInstallAppModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Miamala ya kutoa fedha iliyohifadhiwa (Kumbukumbu ya Miamala)
  const [withdrawTransactions, setWithdrawTransactions] = useState<WithdrawalTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('orderverify_withdraw_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Risiti ya Muamala
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [activeReceiptTxn, setActiveReceiptTxn] = useState<WithdrawalTransaction | null>(null);
  const [showReceiptNotice, setShowReceiptNotice] = useState(false);
  const [showReceiptActivateBtn, setShowReceiptActivateBtn] = useState(false);
  const receiptNoticeTimerRef = useRef<any>(null);
  const receiptDismissTimerRef = useRef<any>(null);

  // Kumbukumbu ya Miamala Modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Persistent flag for users who have requested a withdrawal
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState<boolean>(() => {
    try {
      return localStorage.getItem('orderverify_has_pending_withdrawal') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminWithdrawals, setAdminWithdrawals] = useState<any[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Fungua moja kwa moja ukurasa wa kutoa pesa bila kuomba notifications za Chrome
  const handleToaPesaClick = () => {
    setShowTopNotification(false);
    runWithLoader(() => {
      setShowWithdrawModal(true);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser?.email === 'zuhurasalum186@gmail.com') {
      const q = query(collection(db, 'withdrawals'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdminWithdrawals(list);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        if (currentUser?.email === 'zuhurasalum186@gmail.com') {
          setShowAdminPanel(true);
        }
      }
    }
  }, [currentUser]);

  const isLoggingInRef = useRef(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleAdminLogin = async () => {
    if (isLoggingInRef.current || isLoggingIn || currentUser) return;
    isLoggingInRef.current = true;
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (e: any) {
      // Common error: popup closed by user or benign internal assertion
      if (
        e?.code !== 'auth/popup-closed-by-user' && 
        e?.code !== 'auth/cancelled-popup-request' &&
        !String(e?.message || '').includes('Pending promise was never set')
      ) {
        alert("Login failed. Tafadhali jaribu tena baada ya muda kidogo.");
      }
    } finally {
      isLoggingInRef.current = false;
      setIsLoggingIn(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'withdrawals', id), { status: newStatus });
    } catch (e) {
      alert("Failed to update status.");
    }
  };

  // Countdown ya sekunde wakati muamala wa kutoa pesa unafanyiwa kazi
  useEffect(() => {
    let timer: any;
    if (isProcessingWithdraw) {
      if (processingSecondsLeft > 0) {
        timer = setTimeout(() => {
          setProcessingSecondsLeft((prev) => prev - 1);
        }, 1000);
      } else {
        setIsProcessingWithdraw(false);
        // Hapo hapo itokee risiti ya huo muamala
        setShowReceiptModal(true);
        setShowReceiptNotice(false);
        setShowReceiptActivateBtn(false);

        if (receiptNoticeTimerRef.current) clearTimeout(receiptNoticeTimerRef.current);
        if (receiptDismissTimerRef.current) clearTimeout(receiptDismissTimerRef.current);

        // Baada ya sekunde 7 utokee ujumbe wa juu bila kuifunika risiti na batani ya kuwezesha account
        receiptNoticeTimerRef.current = setTimeout(() => {
          setShowReceiptNotice(true);
          setShowReceiptActivateBtn(true);

          // Ujumbe uondoke baada ya sekunde 40 kisha ibaki ile risiti tu
          receiptDismissTimerRef.current = setTimeout(() => {
            setShowReceiptNotice(false);
          }, 40000);
        }, 7000);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isProcessingWithdraw, processingSecondsLeft]);

  const [customerAlertMessage, setCustomerAlertMessage] = useState<string | null>(null);
  const [showCustomerAlertModal, setShowCustomerAlertModal] = useState<boolean>(false);

  const playNotificationSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  };

  // Taarifa ndani ya website pekee (Notification za Chrome zimeondolewa kama ilivyoelekezwa)
  const sendDeviceNotification = (_title: string, _body: string) => {
    if (typeof window === 'undefined') return;
    playNotificationSound();
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([300, 150, 300]);
      } catch (e) {}
    }
  };

  // Msikilizaji wa Ujumbe kutoka kwa Admin (Kwenye Website na Notifications)
  useEffect(() => {
    const wid = localStorage.getItem('orderverify_withdrawal_id');
    if (wid) {
      const unsubscribe = onSnapshot(doc(db, 'withdrawals', wid), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.adminMessage) {
            setCustomerAlertMessage(data.adminMessage);
            const lastSeen = localStorage.getItem(`orderverify_notif_seen_${wid}`);
            const reminderTime = data.lastReminderAt?.toMillis ? data.lastReminderAt.toMillis() : Date.now();
            
            if (lastSeen !== String(reminderTime)) {
              setShowCustomerAlertModal(true);
              sendDeviceNotification("OrderVerify - Taarifa ya Malipo", data.adminMessage);
              localStorage.setItem(`orderverify_notif_seen_${wid}`, String(reminderTime));
            }
          }
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Msikilizaji wa Global Broadcast kwa simu zote zilizofungua tovuti
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system_alerts', 'latest_broadcast'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && data.body) {
          const alertTime = data.timestamp?.toMillis ? data.timestamp.toMillis() : Date.now();
          const lastSeenAlert = localStorage.getItem('orderverify_last_seen_broadcast');
          
          const myPhone = localStorage.getItem('orderverify_withdrawn_phone');
          const myWid = localStorage.getItem('orderverify_withdrawal_id');

          // Ikiwa mtumiaji hajawahi kuomba kutoa fedha kwenye kifaa hiki, asipokee taarifa ya malipo
          if (!myWid && !myPhone) {
            return;
          }

          if (data.targetPhone && data.targetPhone !== myPhone && data.targetWithdrawalId && data.targetWithdrawalId !== myWid) {
            return;
          }

          if (lastSeenAlert !== String(alertTime) && (Date.now() - alertTime < 24 * 60 * 60 * 1000)) {
            localStorage.setItem('orderverify_last_seen_broadcast', String(alertTime));
            setCustomerAlertMessage(data.body);
            setShowCustomerAlertModal(true);
            sendDeviceNotification(data.title || "OrderVerify - Taarifa ya Malipo", data.body);
          }
        }
      }
    });
    return () => unsub();
  }, []);

  // Taarifa zote za mfumo zinabaki ndani ya website pekee (Notification za Chrome zimeondolewa)

  const openRegisterModal = () => {
    setShowTopNotification(false);
    setRegisterModalStep('confirm');
    setShowRegisterConfirmModal(true);
  };
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [withdrawPhone, setWithdrawPhone] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState('');

  const handleWithdrawSubmit = () => {
    setShowTopNotification(false);
    setWithdrawError('');

    // 1. Uthibitisho wa salio
    if (!balance || balance <= 0) {
      setWithdrawError('Huna salio la kutosha kwenye akaunti yako (Salio lako ni TZS 0). Tafadhali thibitisha order kwanza ili kupata salio la kutoa.');
      return;
    }

    // 2. Chagua Mtandao
    if (!selectedNetwork) {
      setWithdrawError('Tafadhali chagua mtandao wa simu (M-Pesa, Tigo Pesa, Airtel Money, au HaloPesa).');
      return;
    }

    // 3. Namba ya Simu
    const cleanPhone = withdrawPhone.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      setWithdrawError('Tafadhali jaza namba ya simu ya kupokelea pesa.');
      return;
    }
    if (cleanPhone.length < 9) {
      setWithdrawError('Namba ya simu uliyojaza haijakamilika. Tafadhali andika namba sahihi ya simu.');
      return;
    }

    // 4. Kiwango cha Pesa
    const cleanAmount = withdrawAmount.trim();
    if (!cleanAmount) {
      setWithdrawError('Tafadhali andika kiwango cha fedha unachotaka kutoa.');
      return;
    }
    const numAmount = Number(cleanAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setWithdrawError('Tafadhali andika kiwango sahihi cha fedha.');
      return;
    }
    if (numAmount < 1000) {
      setWithdrawError('Kiwango cha chini cha kutoa pesa ni elfu moja (1,000 TZS).');
      return;
    }
    if (numAmount > balance) {
      setWithdrawError(`Kiasi ulichoandika (TZS ${numAmount.toLocaleString()}) kinazidi salio lako lililopo (TZS ${balance.toLocaleString()}).`);
      return;
    }

    // Vigezo vyote vimekidhiwa kikamilifu: Punguza fedha kwenye balance na anza uchakataji
    const newBal = Math.max(0, balance - numAmount);
    setBalance(newBal);

    const networkNames: Record<string, string> = {
      mpesa: 'Vodacom M-Pesa',
      tigo: 'Tigo Pesa',
      airtel: 'Airtel Money',
      halopesa: 'HaloPesa'
    };

    const txnCode = 'OV-' + Math.floor(10000000 + Math.random() * 90000000);
    const formattedDate = new Intl.DateTimeFormat('sw-TZ', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());

    const calculatedFee = Math.round(numAmount * 0.03);

    const newTxn: WithdrawalTransaction = {
      id: txnCode,
      phoneNumber: cleanPhone,
      network: selectedNetwork,
      networkName: networkNames[selectedNetwork] || selectedNetwork.toUpperCase(),
      companyName: 'Orderverify LMT',
      amount: numAmount,
      fee: calculatedFee,
      status: 'pending',
      remainingBalance: newBal,
      timestamp: Date.now(),
      formattedDate: formattedDate
    };

    // Hifadhi kwenye kumbukumbu ya miamala (state + localStorage)
    setWithdrawTransactions((prev) => {
      const updated = [newTxn, ...prev];
      try {
        localStorage.setItem('orderverify_withdraw_history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      localStorage.setItem('orderverify_user_balance', String(newBal));
      localStorage.setItem('orderverify_has_pending_withdrawal', 'true');
      localStorage.setItem('orderverify_withdrawn_phone', cleanPhone);
      
      const userPlatform = /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'iOS' : 'Android/Web';

      // SAVE TO DATABASE (FIREBASE)
      addDoc(collection(db, 'withdrawals'), {
        transactionId: newTxn.id,
        phoneNumber: cleanPhone,
        amount: numAmount,
        fee: calculatedFee,
        remainingBalance: newBal,
        companyName: newTxn.companyName,
        status: 'pending',
        timestamp: serverTimestamp(),
        network: selectedNetwork,
        networkName: newTxn.networkName,
        devicePlatform: userPlatform
      }).then(docRef => {
        localStorage.setItem('orderverify_withdrawal_id', docRef.id);
      }).catch(err => console.error("Database save failed:", err));

    } catch (e) {}
    setHasPendingWithdrawal(true);
    setActiveReceiptTxn(newTxn);

    setShowWithdrawModal(false);
    setProcessingSecondsLeft(12);
    setIsProcessingWithdraw(true);
  };
  
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

  // Welcome timer removed as requested by user to eliminate automatic popup on entry

  
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
  const [orders, setOrders] = useState(() => orderData);
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    setOrders(orderData);
  }, []);

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
      name: "Wewe",
      text: newCommentText,
      time: "Sasa hivi",
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
    const targetOrder = orders.find(o => o.id === orderId);
    const signature = targetOrder ? `${orderId}:${targetOrder.product}` : String(orderId);

    const updatedVerified = Array.from(new Set([...verifiedOrders, signature, String(orderId)]));
    setVerifiedOrders(updatedVerified);
    try {
      localStorage.setItem('orderverify_verified_orders', JSON.stringify(updatedVerified));
      localStorage.setItem('orderverify_orders_catalog_version', STORAGE_VERSION_TAG);
    } catch (e) {}

    const newBalance = balance + payout;
    const newNetProfit = netProfit + payout;
    setBalance(newBalance);
    setNetProfit(newNetProfit);
    try {
      localStorage.setItem('orderverify_user_balance', String(newBalance));
      localStorage.setItem('orderverify_net_profit', String(newNetProfit));
    } catch (e) {}

    setToastMessage(`PAID SUCCESSFULLY: TZS ${payout.toLocaleString()}`);
    setActiveVerification(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    setTimeout(() => {
      triggerMotivation(`Hongera kwa kuthibitisha order! Salio lako sasa ni TZS ${newBalance.toLocaleString()}. Kumbuka, ili kuitoa pesa hii utahitaji kujisajili na kulipia mtaji wa 14,500/= tu.`, 7);
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
      
      {/* Customer Alert Top Banner if Admin sent a message */}
      {customerAlertMessage && !showCustomerAlertModal && (
        <div 
          onClick={() => setShowCustomerAlertModal(true)}
          className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black py-2.5 px-4 text-xs font-black flex items-center justify-between cursor-pointer sticky top-0 z-50 shadow-lg animate-pulse"
        >
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <AlertTriangle className="w-4 h-4 shrink-0 text-black" />
            <span className="truncate"><strong>TAARIFA YA MALIPO:</strong> {customerAlertMessage}</span>
          </div>
          <span className="bg-black text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ml-2 font-black">
            BONYEZA KUSOMA 🔔
          </span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="bg-[#12141F]/95 backdrop-blur-md p-4 flex justify-between items-center rounded-b-3xl shadow-xl border-b border-emerald-500/20 sticky top-0 z-40">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00E676] to-[#00B259] flex items-center justify-center font-black text-[9px] text-black shadow-md shadow-[#00E676]/20 shrink-0">
            OV
          </div>
          <div>
            <h2 className="font-black text-base sm:text-lg leading-none tracking-tight text-white">ORDER<span className="text-[#00E676]">VERIFY</span></h2>
            <p className="text-[10px] text-slate-400 font-medium">Thibitisha order pata kipato</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Wasiliana na Wakala - Juu kwenye header ambapo ilikuwa batani ya install */}
          <button 
            type="button"
            onClick={() => setShowContactModal(true)}
            className="bg-[#0A0C14] hover:bg-[#151722] text-white border-2 border-[#00E676] font-black text-xs sm:text-sm py-2.5 sm:py-2.5 px-3.5 sm:px-5 rounded-full shadow-[0_0_20px_rgba(0,230,118,0.45)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer uppercase tracking-wider whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#00E676] shrink-0" />
            <span>Wasiliana na Wakala</span>
          </button>

          {/* Kitufe cha Jisajili Hapa */}
          <motion.button 
            type="button"
            onPointerDown={() => setShowTopNotification(false)}
            onClick={openRegisterModal}
            animate={{ 
              scale: [1, 1.035, 1, 0.985, 1],
              y: [0, -2, 0, 1.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.2, 
              ease: "easeInOut" 
            }}
            className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm shadow-[0_0_15px_rgba(239,68,68,0.7)] hover:brightness-110 active:scale-95 transition-all uppercase tracking-wide whitespace-nowrap cursor-pointer border border-red-400/50"
          >
            Jisajili Hapa
          </motion.button>
        </div>

      </header>

      <div className="p-3.5 max-w-4xl mx-auto space-y-3.5 sm:space-y-5 pb-24 sm:pb-28">
        <LiveClock />

        {/* 3 Top Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <button 
            onPointerDown={() => setShowTopNotification(false)}
            onClick={handleToaPesaClick}
            className="bg-gradient-to-br from-[#00E676] via-[#00C853] to-[#00963F] rounded-2xl p-4 flex flex-col items-center justify-center text-black font-black shadow-lg shadow-[#00E676]/25 transition-transform active:scale-95 border border-[#00E676]"
          >
            <Wallet className="w-8 h-8 mb-2 opacity-95 drop-shadow-sm" />
            <span className="text-sm">Toa Pesa</span>
          </button>
          
          <div className="bg-[#141624] border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl relative group">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="font-bold text-[12px] sm:text-[13px] text-slate-300">Balance</span>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-slate-400 hover:text-[#00E676] transition-colors p-1 -m-1"
                aria-label={showBalance ? "Ficha balance" : "Onyesha balance"}
              >
                {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="bg-[#0B0C12] border border-emerald-500/40 text-[#00E676] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              {showBalance ? `TZS ${balance.toLocaleString()}` : 'TZS ******'}
            </span>
          </div>
          
          <div className="bg-[#141624] border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-bold text-[12px] sm:text-[13px] mb-2 text-slate-300">Net Profit</span>
            <span className="bg-[#0B0C12] border border-amber-500/40 text-[#FFB800] text-xs font-black px-2 py-1.5 rounded-full w-full shadow-inner">
              TZS {netProfit.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Ticker between header and video */}
        <div className="relative min-h-[52px] sm:min-h-[56px] flex justify-center items-center my-2 w-full z-30">
          <TopPopupTicker />
        </div>

        {/* Tutorial Video Section (Replacing sliding banner with interactive video demonstration) */}
        <TutorialVideoSection whatsappUrl="https://whatsapp.com/channel/0029Vb9DAjqLY6dFP4TXlE1x" />

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {currentOrders.map((order) => {
            const isVerified = isOrderVerified(order);
            
            return (
              <div key={order.id} className={`bg-[#141624] text-white rounded-2xl overflow-hidden flex flex-col shadow-xl border ${isVerified ? 'border-slate-800/80 opacity-60' : 'border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_8px_25px_rgba(0,230,118,0.12)] transition-all duration-200'}`}>
                {/* Product Image Top */}
                <div className="h-28 bg-slate-900 relative">
                  <img 
                    src={order.productImage} 
                    alt={order.product} 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer" 
                    onError={(e) => { e.currentTarget.src = "/orderverify_launch_ceremony.jpg"; e.currentTarget.onerror = null; }} 
                    className={`w-full h-full object-cover ${isVerified ? 'grayscale' : ''}`} 
                  />
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
                      <p className="text-[9px] text-slate-400 truncate">Mteja wa {order.city}, {order.country}</p>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="mb-2 space-y-1">
                    <p className="font-bold text-xs text-white leading-snug line-clamp-2 min-h-[32px]">{order.product}</p>
                    <div className="flex justify-between items-center text-[10px] pt-1 border-t border-slate-800/80">
                      <span className="text-slate-400 font-medium">Thamani:</span>
                      <span className="font-bold text-emerald-400">{formatLocalCurrency(order.productValue, order.country)}</span>
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
        <div className="bg-gradient-to-br from-[#141624] to-[#0E101A] border-2 border-red-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_30px_rgba(239,68,68,0.15)] mt-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)] animate-pulse">
            <UserPlus className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wide mb-5">
            Fungua akaunti yako ya ORDERVERIFY kwa kubonyeza hapa 👇👇
          </h2>
          <motion.button
            type="button"
            onClick={openRegisterModal}
            animate={{ 
              scale: [1, 1.035, 1, 0.985, 1],
              y: [0, -2, 0, 1.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.2, 
              ease: "easeInOut" 
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 active:scale-95 text-white font-black px-8 py-3.5 rounded-2xl text-sm sm:text-base shadow-[0_0_28px_rgba(239,68,68,0.85)] border border-red-400/60 transition-all cursor-pointer uppercase tracking-wider mb-5"
          >
            <UserPlus className="w-5 h-5 stroke-[2.5]" />
            <span>Jisajili Hapa</span>
          </motion.button>
          
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
        <div className="mt-6 bg-[#181A26] border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
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
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
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
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <h5 className="font-black text-xs text-[#00E676]">{reply.name}</h5>
                              <span className="text-[9px] bg-emerald-500/20 text-[#00E676] font-bold px-1.5 py-0.5 rounded border border-emerald-500/35">
                                Afisa wa Huduma
                              </span>
                            </div>
                            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{reply.text}</p>
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
        <div className="mt-8 mb-4 border-t border-slate-800 pt-6 pb-4 text-center">
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

      {/* Kitufe cha Install App - Chini kabisa upande wa kushoto */}
      <div className="fixed bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 z-40">
        <button
          type="button"
          onClick={() => setShowInstallAppModal(true)}
          className="bg-[#00A859] hover:bg-[#00924c] text-white font-black text-xs py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-2xl shadow-[0_4px_20px_rgba(0,168,89,0.5)] border border-emerald-400/40 flex items-center gap-2 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
        >
          <Smartphone className="w-4 h-4 text-white shrink-0 animate-bounce" />
          <span>Install App</span>
        </button>
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

      {/* Admin Message Urgent Modal for Customer */}
      <AnimatePresence>
        {showCustomerAlertModal && customerAlertMessage && (
          <div 
            onClick={() => setShowCustomerAlertModal(false)}
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#141520] border-2 border-amber-500 rounded-3xl p-6 max-w-md w-full shadow-[0_0_60px_rgba(245,158,11,0.35)] text-left relative"
            >
              <button 
                onClick={() => setShowCustomerAlertModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-7 h-7 text-amber-400 animate-bounce" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-amber-500 text-black px-2 py-0.5 rounded-md">
                    TAARIFA RASMI YA MALIPO
                  </span>
                  <h3 className="text-white font-black text-lg mt-1">Ujumbe Kutoka OrderVerify</h3>
                </div>
              </div>
              
              <div className="bg-[#0A0B10] p-4 rounded-2xl border border-slate-800 mb-5 shadow-inner">
                <p className="text-sm text-slate-200 font-bold leading-relaxed whitespace-pre-wrap">
                  {customerAlertMessage}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setShowCustomerAlertModal(false);
                    setShowPaymentGuide(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#00E676] via-[#00D069] to-[#00B259] text-black font-black py-4 rounded-2xl text-sm uppercase tracking-wider shadow-xl shadow-[#00E676]/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer hover:brightness-110"
                >
                  <CreditCard className="w-5 h-5" /> KAMILISHA ACTIVATION (14,500/=)
                </button>
                <button
                  onClick={() => {
                    setShowCustomerAlertModal(false);
                    setShowContactModal(true);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer transition-all active:scale-95"
                >
                  Wasiliana na Wakala
                </button>
              </div>
            </motion.div>
          </div>
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

              <h3 className="text-white font-black text-lg mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#00E676]" /> KUTOA PESA
                </span>
              </h3>

              {/* Batani ya Kumbukumbu ya Miamala */}
              <button 
                type="button"
                onPointerDown={() => setShowTopNotification(false)}
                onClick={() => {
                  setShowTopNotification(false);
                  setShowWithdrawModal(false);
                  setShowHistoryModal(true);
                }}
                className="w-full mb-4 bg-[#0B0C12] hover:bg-[#141624] border border-slate-700/80 hover:border-[#00E676]/60 p-3 rounded-2xl text-xs font-bold text-slate-200 transition-all flex items-center justify-between cursor-pointer shadow-inner group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#00E676]/15 flex items-center justify-center text-[#00E676] group-hover:scale-110 transition-transform">
                    <History className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:text-white">Kumbukumbu ya Miamala</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {withdrawTransactions.length > 0 ? (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {withdrawTransactions.length} {withdrawTransactions.length === 1 ? 'Muamala' : 'Miamala'}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Tazama</span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
              
              <div className="mb-4 text-left">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">1. Chagua Mtandao</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setWithdrawError('');
                      setSelectedNetwork('mpesa');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all cursor-pointer ${selectedNetwork === 'mpesa' ? 'bg-[#E3000F] text-white border-[#E3000F] shadow-[0_0_15px_rgba(227,0,15,0.4)] scale-105' : 'bg-[#E3000F]/10 border-[#E3000F]/30 text-[#E3000F] hover:border-[#E3000F]'}`}
                  >
                    M-Pesa
                  </button>
                  <button 
                    type="button"
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setWithdrawError('');
                      setSelectedNetwork('tigo');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all cursor-pointer ${selectedNetwork === 'tigo' ? 'bg-[#003B71] text-white border-[#003B71] shadow-[0_0_15px_rgba(0,59,113,0.4)] scale-105' : 'bg-[#003B71]/10 border-[#003B71]/30 text-[#4A90E2] hover:border-[#003B71]'}`}
                  >
                    Tigo Pesa
                  </button>
                  <button 
                    type="button"
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setWithdrawError('');
                      setSelectedNetwork('airtel');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all cursor-pointer ${selectedNetwork === 'airtel' ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.4)] scale-105' : 'bg-[#FF0000]/10 border-[#FF0000]/30 text-[#FF4D4D] hover:border-[#FF0000]'}`}
                  >
                    Airtel Money
                  </button>
                  <button 
                    type="button"
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setWithdrawError('');
                      setSelectedNetwork('halopesa');
                    }}
                    className={`border text-xs font-black py-2.5 rounded-xl transition-all cursor-pointer ${selectedNetwork === 'halopesa' ? 'bg-[#F8981D] text-white border-[#F8981D] shadow-[0_0_15px_rgba(248,152,29,0.4)] scale-105' : 'bg-[#F8981D]/10 border-[#F8981D]/30 text-[#F8981D] hover:border-[#F8981D]'}`}
                  >
                    HaloPesa
                  </button>
                </div>
              </div>

              <div className="mb-4 text-left">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">2. Namba ya Simu</label>
                <input 
                  type="tel" 
                  placeholder="Mfano: 07XX XXX XXX" 
                  value={withdrawPhone}
                  onFocus={() => { setShowTopNotification(false); setWithdrawError(''); }}
                  onPointerDown={() => setShowTopNotification(false)}
                  onClick={() => setShowTopNotification(false)}
                  onChange={(e) => {
                    setWithdrawPhone(e.target.value);
                    setWithdrawError('');
                    setShowTopNotification(false);
                  }}
                  className={`w-full bg-[#0B0C10] border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-colors ${withdrawError && (!withdrawPhone || withdrawPhone.trim().length < 9) ? 'border-red-500' : 'border-slate-700 focus:border-[#00E676]'}`}
                />
              </div>

              <div className="mb-4 text-left">
                <label className="text-xs text-slate-400 font-bold mb-2 block uppercase">3. Kiasi (TZS)</label>
                <input 
                  type="number" 
                  placeholder="Kuanzia 1,000 TZS" 
                  value={withdrawAmount}
                  onFocus={() => { setShowTopNotification(false); setWithdrawError(''); }}
                  onPointerDown={() => setShowTopNotification(false)}
                  onClick={() => setShowTopNotification(false)}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                    setWithdrawError('');
                    setShowTopNotification(false);
                  }}
                  className={`w-full bg-[#0B0C10] border rounded-xl px-4 py-3.5 text-white font-black text-lg focus:outline-none transition-colors ${withdrawError && (!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > balance) ? 'border-red-500' : 'border-slate-700 focus:border-[#00E676]'}`}
                />
                <p className="text-[10px] text-slate-500 mt-1">Kutoa pesa ni kuanzia elfu moja (1,000 TZS).</p>
              </div>

              {/* Ujumbe wa Hitilafu / Makosa ya Kujaza */}
              {withdrawError && (
                <div className="mb-4 bg-red-950/70 border border-red-500/60 rounded-xl p-3 flex items-start gap-2.5 text-left text-xs text-red-200 font-bold shadow-md shadow-red-950/50">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{withdrawError}</span>
                </div>
              )}

              <button 
                type="button"
                onPointerDown={() => setShowTopNotification(false)}
                onClick={handleWithdrawSubmit}
                className="w-full bg-[#00E676] text-black font-black py-4 rounded-xl hover:bg-[#00C260] active:scale-95 transition-all uppercase tracking-wider text-sm shadow-lg shadow-[#00E676]/20 cursor-pointer"
              >
                TUMA MAOMBI YA PESA
              </button>
              
              <button 
                type="button"
                onPointerDown={() => setShowTopNotification(false)}
                onClick={() => {
                  setShowTopNotification(false);
                  setShowWithdrawModal(false);
                  setWithdrawError('');
                }}
                className="w-full mt-3 text-slate-400 font-bold py-3 text-xs hover:text-white transition-colors cursor-pointer"
              >
                Funga
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal ya Muamala Unafanyiwa Kazi (Sekunde 20) */}
      <AnimatePresence>
        {isProcessingWithdraw && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0B0C10]/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141624] border-2 border-[#00E676]/60 rounded-3xl p-6 sm:p-7 max-w-sm sm:max-w-md w-full shadow-[0_0_40px_rgba(0,230,118,0.25)] relative text-center my-auto"
            >
              {/* Animated Spinner & Icon */}
              <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-700/60" />
                <div className="absolute inset-0 rounded-full border-4 border-[#00E676] border-t-transparent animate-spin" />
                <div className="w-12 h-12 rounded-full bg-[#00E676]/15 flex items-center justify-center text-[#00E676]">
                  <Loader2 className="w-6 h-6 animate-spin text-[#00E676]" />
                </div>
              </div>

              <h3 className="text-white font-black text-lg sm:text-xl uppercase tracking-wide mb-1">
                Muamala Unafanyiwa Kazi...
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Ombi lako la kutoa fedha limepokelewa na linashughulikiwa na mfumo mkuu wa malipo.
              </p>

              {/* Progress Bar & Percentage (Bila maneno yoyote ya ziada) */}
              <div className="bg-[#0B0C12] border border-slate-800 rounded-2xl p-4 mb-4 shadow-inner space-y-2">
                <div className="flex items-center justify-end text-xs font-bold">
                  <span className="text-[#00E676] font-mono font-black text-sm">{Math.min(100, Math.round(((12 - processingSecondsLeft) / 12) * 100))}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#00E676] to-[#00C853] h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(0,230,118,0.5)]"
                    style={{ width: `${Math.min(100, Math.round(((12 - processingSecondsLeft) / 12) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Notice ya Tafadhali subiri pekee bila sekunde zilizobaki */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-bold bg-slate-900/80 border border-slate-800 rounded-xl py-2.5 px-4 shadow-inner">
                <Clock className="w-3.5 h-3.5 text-[#00E676] animate-pulse shrink-0" />
                <span>Tafadhali subiri...</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Risiti Rasmi ya Muamala (Inaonekana mara baada ya uchakataji) */}
      <WithdrawReceiptModal
        isOpen={showReceiptModal}
        onClose={() => {
          setShowReceiptModal(false);
          setShowReceiptNotice(false);
          setShowReceiptActivateBtn(false);
          if (receiptNoticeTimerRef.current) clearTimeout(receiptNoticeTimerRef.current);
          if (receiptDismissTimerRef.current) clearTimeout(receiptDismissTimerRef.current);
        }}
        transaction={activeReceiptTxn}
        showNotice={showReceiptNotice}
        showActivateBtn={showReceiptActivateBtn}
        onActivateAccount={() => {
          setShowReceiptModal(false);
          setShowReceiptNotice(false);
          setShowReceiptActivateBtn(false);
          if (receiptNoticeTimerRef.current) clearTimeout(receiptNoticeTimerRef.current);
          if (receiptDismissTimerRef.current) clearTimeout(receiptDismissTimerRef.current);
          setRegisterModalStep('confirm');
          setShowRegisterConfirmModal(true);
        }}
      />

      {/* Kumbukumbu ya Miamala Modal */}
      <WithdrawHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        transactions={withdrawTransactions}
        onViewReceipt={(txn) => {
          setActiveReceiptTxn(txn);
          setShowHistoryModal(false);
          setShowReceiptModal(true);
          setShowReceiptNotice(false);
          setShowReceiptActivateBtn(true);
        }}
        onNewWithdraw={() => {
          setShowWithdrawModal(true);
        }}
      />

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

                {/* Registration Video Guide (Replacing textual steps as requested) */}
                <div className="overflow-y-auto pr-1 sm:pr-2 flex-1">
                  <div className="space-y-4">
                    <RegistrationVideoSection videoSrc="/Video%20ya%20kujisajili.mp4" />
                    
                    <div className="border-2 border-[#00E676] bg-gradient-to-r from-emerald-950/60 via-[#0E1511] to-emerald-950/60 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,230,118,0.35)] animate-pulse space-y-2 text-xs sm:text-sm text-center">
                      <p className="text-white font-bold">
                        TAZAMA VIDEO HAPO JUU KWANZA ILI UJUE NAMNA YA KUJISAJILI
                      </p>
                      <p className="text-[#00E676] font-black italic border-t border-[#00E676]/25 pt-2 leading-relaxed">
                        Ukimaliza kutazama video, bofya kitufe cha nyekundu hapo chini kinachosema "ANZA KUJISAJILI HAPA"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons: Anza Kujisajili Hapa (opens link) + Rudi Nyuma & Funga */}
                <div className="pt-3 border-t border-slate-800 space-y-2 shrink-0 mt-3">
                  <motion.button 
                    type="button"
                    onClick={() => {
                      setShowRegisterConfirmModal(false);
                      window.open("https://adsblog.app/page/reg.php?reg=Joddie", "_blank");
                    }}
                    animate={{ 
                      scale: [1, 1.035, 1, 0.985, 1],
                      y: [0, -2, 0, 1.5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2.2, 
                      ease: "easeInOut" 
                    }}
                    className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 active:scale-95 text-white font-black py-3.5 px-4 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.8)] border border-red-400/50 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 stroke-[2.5]" />
                    <span>ANZA KUJISAJILI HAPA</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>

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
              className={`rounded-3xl max-w-sm w-full shadow-2xl relative text-center overflow-hidden border-t-8 max-h-[92vh] overflow-y-auto ${callStatus === 'idle' ? 'bg-white border-[#00E676]' : 'bg-slate-900 border-transparent text-white'}`}
            >
              {callStatus === 'idle' ? (
                <div className="p-5 sm:p-6">
                  <button 
                    onPointerDown={() => setShowTopNotification(false)}
                    onClick={() => {
                      setShowTopNotification(false);
                      setActiveVerification(null);
                    }}
                    className="absolute top-4 right-4 text-slate-400 hover:text-black bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Picha ya Bidhaa */}
                  <div className="relative mb-3 pt-1">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto relative rounded-2xl overflow-hidden border-2 border-[#00E676] shadow-md bg-slate-100">
                      <img 
                        src={activeVerification.productImage} 
                        alt={activeVerification.product}
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/orderverify_launch_ceremony.jpg";
                          e.currentTarget.onerror = null;
                        }}
                      />
                    </div>
                  </div>

                  {/* Jina na Nchi ya Mteja */}
                  <div className="bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 mb-3 text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{activeVerification.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{activeVerification.flag} Mteja wa {activeVerification.city}, {activeVerification.country}</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5 mb-4 text-left shadow-sm">
                    <p className="text-xs font-black text-blue-900 mb-1.5 uppercase">Maelekezo ya Wakala:</p>
                    <ul className="text-[11px] text-blue-800 list-disc pl-4 space-y-1.5 font-medium">
                      <li>Kumbuka: Hakikisha unatoka nchi moja na <strong className="font-bold">mteja</strong> ndo uweze kumpigia simu. Vinginevyo bofya tu SEND ORDER.</li>
                      <li><span className="font-bold text-blue-950">Ukipiga sema:</span> <span className="italic">"Halo, mimi ni wakala kutoka OrderVerify. Nakupigia kukuelekeza kuwa ofisi zetu zipo {activeVerification.city} utaenda kuchukua order yako ya {activeVerification.product}."</span></li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    <button 
                      onPointerDown={() => setShowTopNotification(false)}
                      onClick={() => {
                        setShowTopNotification(false);
                        runWithLoader(() => simulateCall('calling-video'));
                      }} 
                      className="bg-white border border-slate-200 rounded-2xl py-3 flex flex-col items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Video className="w-5 h-5 mb-1 text-indigo-500" />
                      <span className="text-[10px] font-black uppercase tracking-wide">Video Call</span>
                    </button>
                    <button 
                      onPointerDown={() => setShowTopNotification(false)}
                      onClick={() => {
                        setShowTopNotification(false);
                        runWithLoader(() => simulateCall('calling-voice'));
                      }} 
                      className="bg-white border border-slate-200 rounded-2xl py-3 flex flex-col items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Phone className="w-5 h-5 mb-1 text-emerald-500" />
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
                    animate={{ rotate: [-1.5, 1.5, -1.5, 1.5, 0], scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="w-full bg-[#00E676] text-black font-black px-5 py-3.5 rounded-2xl hover:bg-[#00C260] shadow-[0_5px_15px_rgba(0,230,118,0.3)] flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
                  >
                    <Send className="w-5 h-5" /> SEND ORDER
                  </motion.button>
                </div>
              ) : (
                <div className="p-8 py-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-900 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <img 
                        src={activeVerification.avatar} 
                        alt={activeVerification.name}
                        className="w-full h-full rounded-full border-4 border-[#00E676] object-cover relative z-10 bg-slate-800 shadow-xl" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 rounded-full border-4 border-[#00E676] animate-ping opacity-75"></div>
                      <div className="absolute inset-[-8px] rounded-full border-2 border-[#00E676]/30 animate-ping opacity-50" style={{ animationDelay: '200ms' }}></div>
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-0.5">{activeVerification.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">{activeVerification.flag} {activeVerification.city}, {activeVerification.country}</p>
                    
                    <div className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full mb-4">
                      <span className="text-[10px] text-slate-400">Kuhusu Agizo:</span>
                      <span className="text-[10px] font-bold text-emerald-400 truncate max-w-[200px]">{activeVerification.product}</span>
                    </div>

                    <p className="text-[#00E676] text-sm animate-pulse font-bold tracking-widest uppercase">
                      {callStatus === 'calling-video' ? 'Inapiga Video...' : 'Inapiga Simu...'}
                    </p>
                    
                    <button 
                      onClick={() => setCallStatus('idle')}
                      className="mt-8 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:bg-red-600 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <PhoneOff className="w-5 h-5" />
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
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Wasiliana na Wakala</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Options Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0C10]/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#1C1D24] border border-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 relative flex flex-col items-center text-center">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-[#0B0C10] border-2 border-slate-800 rounded-full flex items-center justify-center mb-4 text-[#00E676] shadow-inner">
                  <PhoneCall className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">Chagua Njia ya Mawasiliano</h3>
                <p className="text-slate-300 text-base font-bold mb-8">Wasiliana na wakala wetu kupitia WhatsApp au Tuma Meseji (SMS) kwa msaada zaidi.</p>
                
                <div className="flex flex-col gap-3 w-full">
                  <a
                    href="https://wa.me/255746464866?text=Habari%20Naomba%20kujiunga%20na%20OrderVerify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold px-5 py-4 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-6 h-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-base">WhatsApp</span>
                        <span className="text-xs opacity-80">0746 464 866</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </a>

                  <a
                    href="sms:0740463671?body=Habari%20Naomba%20kujiunga%20na%20OrderVerify"
                    className="w-full flex items-center justify-between bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold px-5 py-4 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-base">Tuma Meseji (SMS)</span>
                        <span className="text-xs opacity-80">0740 463 671</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Admin Panel Modal */}
      <AnimatePresence>
        {showAdminPanel && currentUser?.email === 'zuhurasalum186@gmail.com' && (
          <AdminPanel 
            withdrawals={adminWithdrawals} 
            onClose={() => setShowAdminPanel(false)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </AnimatePresence>

      {/* Admin Access in Footer - Hidden from regular users, only visible when logged in as admin */}
      <div className="mt-12 mb-12 flex flex-col items-center gap-4 pb-8">
        {currentUser?.email === 'zuhurasalum186@gmail.com' && (
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setShowAdminPanel(true)}
              className="bg-gradient-to-r from-[#00E676] via-[#00C853] to-[#00963F] text-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase font-black tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(0,230,118,0.5)] cursor-pointer flex items-center gap-2 border-2 border-white/20"
            >
              <span>🔓 FUNGUA ADMIN PANEL (PANELI YA KUTUMA)</span>
            </button>
            <p className="text-[11px] text-emerald-400 font-bold">Umeingia kama Admin: {currentUser.email}</p>
          </div>
        )}
        <div 
          onClick={handleSecretTap}
          className="flex flex-col items-center gap-1 opacity-40 cursor-default select-none active:opacity-100"
        >
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">© 2026 ORDERVERIFY OFFICIAL SITE</p>
          <p className="text-[9px] text-slate-600 font-medium tracking-tight">Haki zote zimehifadhiwa.</p>
        </div>
      </div>

    </div>
  );
}

// --- Global Audio Player Component ---
function GlobalAudioPlayer() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  const autoplaySuccess = React.useRef(false);

  useEffect(() => {
    let isMounted = true;
    
    const tryPlay = () => {
      // Kama ishafanikiwa ku-play, isijaribu tena (inazuia kujirudia na scratchy sounds)
      if (!isMounted || !audioRef.current || autoplaySuccess.current) return;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          autoplaySuccess.current = true;
          if (isMounted) setIsPlaying(true);
          ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => document.removeEventListener(evt, tryPlay));
        }).catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    // Try immediately on mount
    tryPlay();

    // If blocked, listen to user interaction
    ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => 
      document.addEventListener(evt, tryPlay, { passive: true, once: true })
    );

    return () => {
      isMounted = false;
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => document.removeEventListener(evt, tryPlay));
    };
  }, []); // Empty dependency array prevents re-running

  // Separate effect for volume to prevent restarting audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Register Service Worker on Mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => {
          console.log('SW Registered on Boot:', reg.scope);
          // Check for messages from SW if needed
        })
        .catch(err => console.error('SW Boot Registration Failed:', err));
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-20 right-3 z-[150] flex flex-col items-end gap-1.5 pointer-events-none">
      <audio 
        ref={audioRef} 
        src="/Tina.mp3"
        playsInline
        preload="none" 
        onEnded={() => setIsPlaying(false)} 
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-[#1C1D24] border border-slate-700 p-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-2.5 w-48 pointer-events-auto backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#00E676] animate-pulse' : 'bg-slate-500'}`}></div>
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Sauti ya Mwongozo</span>
              </div>
              <button onClick={() => setShowControls(false)} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-1 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 py-0.5">
              <button onClick={toggleMute} className="text-white p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
              </button>
              <button onClick={togglePlay} className="bg-[#00E676] text-black p-2.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,230,118,0.3)]">
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 ml-0.5 fill-black" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2 pt-0.5">
              <VolumeX className="w-3 h-3 text-slate-500" />
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={volume} 
                onChange={handleVolume}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
              <Volume2 className="w-3 h-3 text-slate-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!showControls && (
        <button 
          onClick={() => {
            if (!isPlaying) togglePlay();
            setShowControls(true);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg border transition-all pointer-events-auto ${
            isPlaying 
              ? 'bg-[#1C1D24] border-[#00E676]/40 text-[#00E676] animate-pulse' 
              : 'bg-[#00E676] border-[#00E676] text-black hover:bg-[#00C260] hover:scale-105'
          }`}
        >
          {isPlaying ? (
            <>
              <div className="flex items-center gap-0.5 mr-0.5">
                <motion.div animate={{ height: [3, 10, 3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-[#00E676] rounded-full"></motion.div>
                <motion.div animate={{ height: [3, 13, 3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-0.5 bg-[#00E676] rounded-full"></motion.div>
                <motion.div animate={{ height: [3, 8, 3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-0.5 bg-[#00E676] rounded-full"></motion.div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight">Inacheza...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-tight">BONYEZA KUSIKILIZA</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [isAgeVerified]);

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

  return (
    <>
      <Dashboard />
      <GlobalAudioPlayer />
    </>
  );
}
