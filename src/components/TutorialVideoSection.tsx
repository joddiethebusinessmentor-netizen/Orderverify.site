import React, { useState, useRef, useEffect } from 'react';
import { Play, Users, X, Video } from 'lucide-react';

interface TutorialVideoSectionProps {
  whatsappUrl?: string;
}

export function TutorialVideoSection({
  whatsappUrl = "https://whatsapp.com/channel/0029Vb9DAjqLY6dFP4TXlE1x"
}: TutorialVideoSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (isFullscreen && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [isFullscreen]);

  return (
    <div className="w-full mt-4 flex flex-col items-center px-2">
      {/* THE "FLAME" / FRAME CONTAINER */}
      <div className="w-full max-w-sm bg-[#1A1C2E] border-2 border-slate-700/50 p-5 rounded-[2.5rem] shadow-2xl flex flex-col items-center relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#00E676]/10 blur-2xl rounded-full" />
        
        <div className="mb-5 text-center px-1 relative z-10">
          <p className="text-[#00E676] font-black text-[13px] sm:text-sm uppercase tracking-tight leading-snug">
            BONYEZA HAPA ILI UJIFUNZE NAMNA YA KUTUMIA WEBSITE YETU NA NAMNA YA KUTOA PESA HAPA ORDERVERIFY👇👇👇👇
          </p>
        </div>

        {/* 1. SEHEMU YA KWANZA: Compact Video Preview with Autoplay Muted */}
        <div 
          onClick={handleOpenFullscreen}
          className="relative w-full aspect-video rounded-3xl overflow-hidden group shadow-[0_0_30px_rgba(0,230,118,0.15)] border-4 border-slate-800/90 cursor-pointer bg-black"
        >
          <video
            ref={previewVideoRef}
            src="/Muongozo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10 group-hover:bg-transparent transition-all">
            <div 
              className="w-14 h-14 rounded-full bg-[#00E676] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.5)] group-hover:scale-110 active:scale-95 transition-all"
            >
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          </div>
        </div>

        {/* WhatsApp Community Button inside the same frame */}
        <div className="w-full mt-5 pt-4 border-t border-slate-700/30">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:brightness-110 text-white font-bold text-center py-2.5 px-3 rounded-xl uppercase text-[11px] sm:text-xs tracking-normal transition-all shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="leading-tight">JIUNGE NA CHANNEL YETU YA WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* 2. FULLSCREEN OVERLAY (OUTSIDE THE FRAME TO AVOID TRANSFORM ISSUES) */}
      <div 
        className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-5 transition-all duration-300 ${
          isFullscreen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Fullscreen Header */}
        <div className="w-full z-20 flex justify-between items-center py-2 px-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-white">
            <Video className="w-5 h-5 text-[#00E676]" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
              ORDERVERIFY - MUONGOZO
            </span>
          </div>
          
          <button 
            type="button"
            onClick={handleCloseFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <X className="w-6 h-6" />
            <span className="text-xs font-bold pr-1">Funga</span>
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="w-full flex-1 flex items-center justify-center my-auto min-h-0">
          <video
            ref={videoRef}
            src={isFullscreen ? "/Muongozo.mp4" : undefined}
            controls
            playsInline
            preload={isFullscreen ? "auto" : "none"}
            controlsList="nodownload noplaybackrate"
            onEnded={handleCloseFullscreen}
            className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-[95vw] sm:max-w-[420px] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-slate-800 bg-black transform-gpu"
          >
            {isFullscreen && <source src="/Muongozo.mp4" type="video/mp4" />}
          </video>
        </div>
        
        {/* Bottom CTA Button */}
        <div className="w-full max-w-md mx-auto pt-3 pb-2 flex justify-center px-4">
          <button 
            type="button"
            onClick={handleCloseFullscreen}
            className="w-full bg-[#00E676] hover:bg-[#00c853] text-black font-black rounded-2xl py-3 shadow-xl active:scale-95 transition-all uppercase text-xs tracking-wider cursor-pointer text-center"
          >
            Funga Video & Rudi Kwenye Tovuti
          </button>
        </div>
      </div>
    </div>
  );
}
