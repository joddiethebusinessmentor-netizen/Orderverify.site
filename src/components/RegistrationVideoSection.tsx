import React, { useState, useRef, useEffect } from 'react';
import { Play, X, Video } from 'lucide-react';

interface RegistrationVideoSectionProps {
  videoSrc: string;
}

export function RegistrationVideoSection({
  videoSrc
}: RegistrationVideoSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
    if (videoRef.current) {
      if (videoRef.current.ended) {
        videoRef.current.currentTime = 0;
      }
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback notice:', err);
        });
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
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [isFullscreen]);

  return (
    <div className="w-full">
      <div className="mb-3 text-center">
        <p className="text-[#00E676] font-extrabold text-xs sm:text-sm uppercase tracking-wide">
          TAZAMA VIDEO HII KUJUA NAMNA YA KUJISAJILI
        </p>
      </div>
      
      {/* Thumbnail / Play Button Banner (Bila kupakia video ya pili chini kwa chini ili kuzuia kuganda) */}
      <div 
        onClick={handleOpenFullscreen}
        className="relative w-full aspect-video rounded-2xl overflow-hidden group shadow-xl border border-slate-800 cursor-pointer bg-gradient-to-br from-[#121420] via-[#0B0C12] to-[#181B2C]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E676]/10 via-transparent to-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00E676] to-[#00B259] text-black flex items-center justify-center shadow-[0_0_25px_rgba(0,230,118,0.7)] group-hover:scale-110 active:scale-95 transition-all">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>
          <p className="text-white text-xs sm:text-sm font-black mt-3 uppercase tracking-wider drop-shadow-md">
            GUSA HAPA ILI KUCHEZA VIDEO
          </p>
          <span className="text-[10px] text-slate-400 font-bold mt-1 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-700">
            Muongozo Rasmi wa Hatua kwa Hatua
          </span>
        </div>
      </div>

      {/* Fullscreen Video Overlay */}
      <div 
        className={`fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-5 transition-all duration-300 ${
          isFullscreen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Header bar */}
        <div className="w-full z-20 flex justify-between items-center py-2 px-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-white">
            <Video className="w-5 h-5 text-[#00E676]" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">MUONGOZO WA KUJISAJILI</span>
          </div>
          <button 
            type="button"
            onClick={handleCloseFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label="Funga video"
          >
            <X className="w-6 h-6" />
            <span className="text-xs font-bold pr-1">Funga</span>
          </button>
        </div>

        {/* Video Player Container */}
        <div className="w-full flex-1 flex items-center justify-center my-auto min-h-0">
          <video
            ref={videoRef}
            src={isFullscreen ? videoSrc : undefined}
            controls
            playsInline
            preload={isFullscreen ? "auto" : "none"}
            controlsList="nodownload noplaybackrate"
            className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-[95vw] sm:max-w-[420px] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-slate-800 bg-black transform-gpu"
            onEnded={handleCloseFullscreen}
          >
            {isFullscreen && <source src={videoSrc} type="video/mp4" />}
            Samahani, kivinjari chako hakikubali kucheza video hii.
          </video>
        </div>

        {/* Bottom CTA Button */}
        <div className="w-full max-w-md mx-auto pt-3 pb-2 flex justify-center">
          <button 
            type="button"
            onClick={handleCloseFullscreen}
            className="w-full sm:w-auto px-8 py-3 bg-[#00E676] hover:bg-[#00c853] text-black font-black rounded-2xl shadow-xl active:scale-95 transition-all uppercase text-xs tracking-wider cursor-pointer text-center"
          >
            Funga Video & Anza Kujisajili
          </button>
        </div>
      </div>
    </div>
  );
}
