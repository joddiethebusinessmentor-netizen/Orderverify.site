import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, History, FileText, ChevronRight, Clock, AlertCircle, 
  Smartphone, Hash, ChevronLeft, CreditCard
} from 'lucide-react';
import { WithdrawalTransaction } from '../types/withdrawal';

interface WithdrawHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: WithdrawalTransaction[];
  onViewReceipt: (txn: WithdrawalTransaction) => void;
  onNewWithdraw?: () => void;
}

export function WithdrawHistoryModal({
  isOpen,
  onClose,
  transactions,
  onViewReceipt,
  onNewWithdraw
}: WithdrawHistoryModalProps) {
  if (!isOpen) return null;

  const getNetworkStyle = (network: string) => {
    switch (network.toLowerCase()) {
      case 'mpesa':
        return { name: 'M-Pesa', bg: 'bg-[#E3000F]/15 border-[#E3000F]/40 text-[#E3000F]' };
      case 'tigo':
        return { name: 'Tigo Pesa', bg: 'bg-[#003B71]/20 border-[#003B71]/50 text-[#4A90E2]' };
      case 'airtel':
        return { name: 'Airtel Money', bg: 'bg-[#FF0000]/15 border-[#FF0000]/40 text-[#FF4D4D]' };
      case 'halopesa':
        return { name: 'HaloPesa', bg: 'bg-[#F8981D]/15 border-[#F8981D]/40 text-[#F8981D]' };
      default:
        return { name: network.toUpperCase(), bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' };
    }
  };

  const pendingCount = transactions.filter(t => t.status.toLowerCase() === 'pending').length;

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      >
        <motion.div 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#141624] border border-slate-700/80 rounded-3xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl relative my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] shrink-0">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-black text-base uppercase tracking-wide">
                  Kumbukumbu ya Miamala
                </h3>
                <p className="text-[11px] text-slate-400">
                  {transactions.length === 0 
                    ? 'Huna muamala wowote' 
                    : `${transactions.length} ${transactions.length === 1 ? 'muamala umehifadhiwa' : 'miamala imehifadhiwa'}`}
                </p>
              </div>
            </div>

            <button 
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full p-1.5 transition-colors cursor-pointer"
              aria-label="Funga"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Pending Status Summary Tag */}
          {pendingCount > 0 && (
            <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Miamala Iliyo Pending:</span>
              </div>
              <span className="font-mono font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full text-[11px]">
                {pendingCount} PENDING
              </span>
            </div>
          )}

          {/* List ya Miamala */}
          <div className="my-3 overflow-y-auto space-y-2.5 max-h-[50vh] pr-1">
            {transactions.length === 0 ? (
              <div className="text-center py-10 px-4 bg-[#0B0C12] border border-slate-800/80 rounded-2xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold text-xs">Bado Huna Muamala</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Miamala yote utakayoomba kutoa fedha itaonekana hapa moja kwa moja ikiwa na risiti zake rasmi.
                </p>
              </div>
            ) : (
              transactions.map((txn) => {
                const netStyle = getNetworkStyle(txn.network);
                return (
                  <div
                    key={txn.id}
                    className="bg-[#0B0C12] hover:bg-[#0f1118] border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 transition-all space-y-2.5 text-left"
                  >
                    {/* Top Row: Network & Status */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border uppercase ${netStyle.bg}`}>
                        {txn.networkName || netStyle.name}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        PENDING
                      </span>
                    </div>

                    {/* Middle Row: Amount & Phone */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Kiasi</span>
                        <div className="text-base sm:text-lg font-black text-white font-mono">
                          TZS {txn.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Namba ya Simu</span>
                        <span className="text-xs font-mono font-bold text-slate-200">
                          {txn.phoneNumber}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Code, Date & Tazama Risiti Button */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <div className="text-slate-400 font-mono text-[10px]">
                        <div>{txn.id}</div>
                        <div className="text-slate-500">{txn.formattedDate}</div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => onViewReceipt(txn)}
                        className="bg-[#00E676]/15 hover:bg-[#00E676] text-[#00E676] hover:text-black font-bold px-3 py-1.5 rounded-xl border border-[#00E676]/40 transition-all flex items-center gap-1 cursor-pointer text-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Tazama Risiti</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 space-y-2">
            {onNewWithdraw && (
              <button 
                type="button"
                onClick={() => {
                  onClose();
                  onNewWithdraw();
                }}
                className="w-full bg-[#00E676] text-black font-black py-3 rounded-2xl hover:bg-[#00C260] active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#00E676]/20"
              >
                <CreditCard className="w-4 h-4" />
                <span>TOA PESA TENA</span>
              </button>
            )}

            <button 
              type="button"
              onClick={onClose}
              className="w-full bg-[#1C1D26] hover:bg-[#252733] text-slate-300 font-bold py-2.5 rounded-2xl transition-all text-xs uppercase tracking-wider border border-slate-700/80 cursor-pointer flex items-center justify-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>RUDI NYUMA</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
