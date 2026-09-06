import React, { useState } from 'react';
import { Play, Users, X } from 'lucide-react';

interface TutorialVideoSectionProps {
  whatsappUrl?: string;
}

export function TutorialVideoSection({
  whatsappUrl = "https://chat.whatsapp.com/D1b8NV1tkMo0uPGHdE4rjR?s=cl&p=a&mlu=4&ilr=4"
}: TutorialVideoSectionProps) {
  const videoId = "Hd_hXPYPIKk";
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className="w-full mt-4">
      {/* 1. SEHEMU YA KWANZA: Banner (Thumbnail) inayovutia kwenye ukurasa */}
      <div 
        onClick={handleOpenFullscreen}
        className="relative w-full aspect-[21/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl border border-slate-800/80 cursor-pointer bg-slate-900"
      >
        {/* Picha ya Nyuma (Thumbnail Simulation) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Jifunze Jinsi ya Kufanya Kazi"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition-opacity duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Maandishi na Kitufe cha Play */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <button 
            type="button"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00E676] hover:bg-[#00c853] text-black flex items-center justify-center shadow-[0_0_35px_rgba(0,230,118,0.7)] transform transition-transform group-hover:scale-110 active:scale-95 cursor-pointer"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
          </button>
          <p className="text-white text-xs sm:text-sm font-black mt-3 uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Bofya Kutazama Video
          </p>
        </div>
      </div>

      {/* WhatsApp Community Button */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:brightness-110 text-white font-bold text-center py-2.5 px-3 rounded-xl uppercase text-xs sm:text-sm tracking-normal sm:tracking-wide transition-all shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Users className="w-4 h-4 shrink-0" />
          <span className="leading-tight">JIUNGE NA GROUP LETU LA WHATSAPP</span>
        </a>
      </div>

      {/* 2. MTUMIAJI AKIBONYEZA PLAY: Fullscreen Mode */}
      <div 
        className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center select-none transition-all duration-300 p-2 sm:p-4 ${
          isFullscreen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Fullscreen Header na Kitufe cha Kufunga */}
        <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 sm:py-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase">
              ORDERVERIFY - MUONGOZO
            </span>
          </div>
          
          <button 
            type="button"
            onClick={handleCloseFullscreen}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all cursor-pointer backdrop-blur-sm flex items-center gap-1.5"
            aria-label="Funga video"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs font-bold hidden xs:inline pr-1">Funga</span>
          </button>
        </div>

        {/* Video Player Frame - Standard Iframe to support all browsers/webviews safely */}
        <div className="relative w-full max-w-[380px] sm:max-w-[400px] aspect-[9/16] max-h-[85vh] sm:max-h-[88vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.95)] bg-black border border-slate-800 mx-auto mt-12">
          {isFullscreen && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&playsinline=1&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
        </div>
        
        <div className="mt-6 text-center w-full">
           <button 
            type="button"
            onClick={handleCloseFullscreen}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl font-bold text-white transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Funga Video
          </button>
        </div>
      </div>
    </div>
  );
}
