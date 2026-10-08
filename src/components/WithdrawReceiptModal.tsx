import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CheckCircle2, AlertTriangle, ShieldCheck, Copy, Check, 
  ArrowRight, Download, Share2, Building2, Smartphone, 
  Clock, Hash, FileCheck, ExternalLink, ChevronLeft
} from 'lucide-react';
import { WithdrawalTransaction } from '../types/withdrawal';

interface WithdrawReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: WithdrawalTransaction | null;
  showNotice: boolean;
  showActivateBtn: boolean;
  onActivateAccount: () => void;
}

export function WithdrawReceiptModal({
  isOpen,
  onClose,
  transaction,
  showNotice,
  showActivateBtn,
  onActivateAccount
}: WithdrawReceiptModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen || !transaction) return null;

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(transaction.id);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {}
  };

  const handleCopySummary = () => {
    try {
      const summary = `RISITI YA MUAMALA - ORDERVERIFY TANZANIA
Namba ya Muamala: ${transaction.id}
Kampuni Inayolipa: ${transaction.companyName}
Namba ya Mpokeaji: ${transaction.phoneNumber}
Mtandao: ${transaction.networkName}
Kiasi: TZS ${transaction.amount.toLocaleString()}
Makato: TZS ${transaction.fee.toLocaleString()} (Bure)
Hali: ${transaction.status.toUpperCase()}
Salio Lililobaki: TZS ${transaction.remainingBalance.toLocaleString()}
Tarehe: ${transaction.formattedDate}`;
      navigator.clipboard.writeText(summary);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (e) {}
  };

  const getNetworkBadge = (network: string) => {
    switch (network.toLowerCase()) {
      case 'mpesa':
        return { name: 'Vodacom M-Pesa', bg: 'bg-[#E3000F]', text: 'text-white', border: 'border-[#E3000F]' };
      case 'tigo':
        return { name: 'Tigo Pesa', bg: 'bg-[#003B71]', text: 'text-white', border: 'border-[#003B71]' };
      case 'airtel':
        return { name: 'Airtel Money', bg: 'bg-[#FF0000]', text: 'text-white', border: 'border-[#FF0000]' };
      case 'halopesa':
        return { name: 'HaloPesa', bg: 'bg-[#F8981D]', text: 'text-white', border: 'border-[#F8981D]' };
      default:
        return { name: transaction.networkName, bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-600' };
    }
  };

  const netInfo = getNetworkBadge(transaction.network);

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md my-auto py-4 flex flex-col items-center"
        >
          {/* Ujumbe wa juu: Ukitokea baada ya sekunde 3-5 na kukaa sekunde 20 bila kuifunika risiti */}
          <AnimatePresence>
            {showNotice && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full mb-3 bg-gradient-to-r from-amber-950/95 via-[#231709]/95 to-amber-950/95 border-2 border-amber-500/80 rounded-2xl p-4 shadow-[0_0_30px_rgba(245,158,11,0.25)] relative text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5 border border-amber-500/40">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                        Taarifa Muhimu ya Malipo
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-100 font-bold leading-relaxed">
                      pesa ulizo omba kutoa zimetolewa kwenye balance yako na ziko pending kwa sababu huna account ya orderverify iliyo ruhusiwa kupokea pesa tafadhari wezesha account yako
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Risiti Rasmi ya Muamala (Professional Digital Payout Receipt) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full bg-[#12141D] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden relative"
          >
            {/* Header ya Juu yenye Nembo na Hati Rasmi */}
            <div className="bg-gradient-to-b from-[#1C2030] to-[#141724] p-5 border-b border-slate-700/70 relative">
              {/* Close Icon */}
              <button 
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
                aria-label="Funga"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00E676] to-[#00A854] flex items-center justify-center text-black font-black shadow-lg shadow-[#00E676]/20 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm sm:text-base tracking-wide uppercase flex items-center gap-1.5">
                    {transaction.companyName}
                  </h3>
                  <p className="text-[11px] text-[#00E676] font-bold flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    HATI YA MALIPO (DISBURSEMENT RECEIPT)
                  </p>
                </div>
              </div>
            </div>

            {/* Sehemu Kuu ya Kiasi na Hali ya Muamala */}
            <div className="px-5 pt-5 pb-4 text-center bg-[#0B0C12] border-b border-slate-800">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Kiwango Kilichotolewa
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-1 flex items-center justify-center gap-1.5 font-mono">
                <span className="text-xs sm:text-sm text-[#00E676] font-sans font-bold">TZS</span>
                <span>{transaction.amount.toLocaleString()}</span>
              </div>

              {/* Status Badge: PENDING */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider mt-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>PENDING</span>
              </div>
            </div>

            {/* Vipengele vya Risiti (Key-Value Breakdown) */}
            <div className="p-5 space-y-3 text-xs bg-[#12141D]">
              {/* 1. Namba ya Muamala (Transaction Code) */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-slate-500" />
                  Code ya Muamala:
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-white bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                    {transaction.id}
                  </span>
                  <button 
                    type="button"
                    onClick={handleCopyCode}
                    title="Nakili Code"
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-[#00E676] transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* 2. Jina la Kampuni Inayomlipa */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Kampuni Inayolipa:
                </span>
                <span className="font-bold text-white text-right">
                  {transaction.companyName}
                </span>
              </div>

              {/* 3. Namba ya Mpokeaji */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  Namba Iliyojazwa:
                </span>
                <span className="font-mono font-bold text-white text-sm tracking-wide">
                  {transaction.phoneNumber}
                </span>
              </div>

              {/* 4. Mtandao Husika */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <span>🌐</span>
                  Mtandao wa Simu:
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-black ${netInfo.bg} ${netInfo.text}`}>
                  {netInfo.name}
                </span>
              </div>

              {/* 5. Kiwango Alichotoa */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Kiwango Kilichotolewa:</span>
                <span className="font-mono font-bold text-white">
                  TZS {transaction.amount.toLocaleString()}
                </span>
              </div>

              {/* 6. Makato */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Makato ya Muamala:</span>
                <span className="font-bold text-[#00E676]">
                  TZS {transaction.fee.toLocaleString()} (Bure)
                </span>
              </div>

              {/* 7. Hali ya Muamala */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Hali ya Muamala:</span>
                <span className="font-black text-amber-400 uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  PENDING
                </span>
              </div>

              {/* 8. Salio Linalobaki Kwenye Balance */}
              <div className="flex items-center justify-between py-2 bg-[#0B0C12] px-3 rounded-xl border border-slate-800">
                <span className="text-slate-300 font-bold text-xs">Salio Lililobaki:</span>
                <span className="font-mono font-black text-[#00E676] text-sm">
                  TZS {transaction.remainingBalance.toLocaleString()}
                </span>
              </div>

              {/* Tarehe na Muda */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <span>Tarehe & Muda:</span>
                <span className="font-mono text-slate-400">{transaction.formattedDate}</span>
              </div>
            </div>

            {/* Simulated Barcode & Security Strip */}
            <div className="bg-[#0A0B10] px-5 py-3 border-t border-slate-800/80 flex flex-col items-center gap-1">
              {/* Barcode Graphic */}
              <div className="w-48 h-6 flex items-center justify-between gap-[2px] opacity-70">
                {[4, 2, 6, 3, 2, 5, 2, 4, 3, 2, 7, 3, 2, 4, 2, 5, 3, 2, 4, 2, 6, 2, 3, 4, 2, 5, 2, 4, 3].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-400 flex-1 rounded-sm"
                    style={{ height: `${12 + (h * 2)}px` }}
                  />
                ))}
              </div>
              <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">
                SECURITY AUTHENTICATED • ORDERVERIFY GATEWAY
              </p>
            </div>

            {/* Quick Actions Footer (Copy Summary / Share) */}
            <div className="bg-[#10121A] p-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <button 
                type="button"
                onClick={handleCopySummary}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Imenakiliwa!' : 'Nakili Risiti'}</span>
              </button>

              <span className="text-[10px] text-slate-500">
                Risiti Hii Imehifadhiwa
              </span>
            </div>
          </motion.div>

          {/* Batani ya Kuwezesha Account:
              Inatokea baada ya ujumbe kutokea, inakaa chini na haiondoki mpaka mtumiaji abonyeze kurudi nyuma */}
          <div className="w-full mt-3 space-y-2">
            <AnimatePresence>
              {showActivateBtn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <button 
                    type="button"
                    onClick={onActivateAccount}
                    className="w-full bg-gradient-to-r from-[#00E676] via-[#00D069] to-[#00B259] hover:brightness-110 active:scale-95 text-black font-black py-4 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#00E676]/30 cursor-pointer"
                  >
                    <span>WEZESHA AKAUNTI YAKO SASA</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Batani ya Kurudi Nyuma */}
            <button 
              type="button"
              onClick={onClose}
              className="w-full bg-[#1C1D26] hover:bg-[#252733] text-slate-300 font-bold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider border border-slate-700/80 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>RUDI NYUMA</span>
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
