import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, X } from 'lucide-react';

interface TutorialVideoSectionProps {
  whatsappUrl?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export function TutorialVideoSection({
  whatsappUrl = "https://whatsapp.com/channel/0029Vb9DAjqLY6dFP4TXlE1x",
  onPlay,
  onPause
}: TutorialVideoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const smallVideoRef = useRef<HTMLVideoElement>(null);
  const largeVideoRef = useRef<HTMLVideoElement>(null);

  // Handle opening large TikTok-style video
  const handleOpenVideo = () => {
    setIsOpen(true);

    // Pause the small preview video
    if (smallVideoRef.current) {
      smallVideoRef.current.pause();
    }

    // Stop background website audio
    (window as any).__isMediaVideoPlaying = true;
    window.dispatchEvent(new CustomEvent('ov-pause-audio'));
    if (onPlay) onPlay();

    // Prevent background scrolling while large video is open
    document.body.style.overflow = 'hidden';

    // Synchronously start large video from second 0 with sound
    if (largeVideoRef.current) {
      const vid = largeVideoRef.current;
      vid.currentTime = 0;
      vid.muted = false;
      vid.volume = 1;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Browser required explicit interaction for sound:', err);
        });
      }
    }
  };

  // Handle closing large video
  const handleCloseVideo = useCallback(() => {
    setIsOpen(false);

    // Pause large video and reset
    if (largeVideoRef.current) {
      largeVideoRef.current.pause();
      largeVideoRef.current.currentTime = 0;
    }

    // Restore background scrolling
    document.body.style.overflow = '';

    // Allow background website audio again
    (window as any).__isMediaVideoPlaying = false;
    window.dispatchEvent(new CustomEvent('ov-resume-audio'));
    if (onPause) onPause();

    // Resume the small preview video (muted)
    if (smallVideoRef.current) {
      smallVideoRef.current.muted = true;
      smallVideoRef.current.play().catch(() => {});
    }
  }, [onPause]);

  // Handle Escape key to close on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleCloseVideo]);

  // Ensure small video plays muted automatically on mount
  useEffect(() => {
    if (smallVideoRef.current) {
      smallVideoRef.current.muted = true;
      const playPromise = smallVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-2 py-1">
      {/* Heading above the small preview */}
      <div className="mb-2 text-center max-w-md px-2">
        <p className="text-[#00E676] font-black text-[12px] sm:text-sm uppercase tracking-tight leading-snug">
          BONYEZA HAPA ILI UJIFUNZE NAMNA YA KUTUMIA WEBSITE YETU NA NAMNA YA KUTOA PESA HAPA ORDERVERIFY
        </p>
      </div>

      {/* 1. SEHEMU YA KWANZA: Video Ndogo (YouTube-Style 16:9 Landscape Preview) */}
      <div
        onClick={handleOpenVideo}
        className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-video rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.35)] border-2 border-red-600/70 hover:border-red-500 active:scale-95 transition-all group bg-black"
        title="Gusa hapa kucheza video"
      >
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-10" />

        {/* Small Video playing muted automatically */}
        <video
          ref={smallVideoRef}
          src="/Muongozo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />

        {/* Alama ya Play ya rangi nyekundu katikati ya video (sio kijani; hakuna neno play) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.95)] border-2 border-white/20 group-hover:scale-110 group-hover:bg-red-500 transition-all">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* 2. SEHEMU YA PILI: Dirisha Kubwa la Video (TikTok Fullscreen Overlay - z-index ya juu zaidi) */}
      <div
        className={`fixed inset-0 z-[999999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-5 select-none transition-all duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        onClick={handleCloseVideo}
      >
        {/* Top Header Bar */}
        <div
          className="w-full max-w-md z-30 flex justify-between items-center py-1 px-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Title without the word Muongozo */}
          <div className="flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
              ORDERVERIFY.SITE
            </span>
          </div>

          {/* Kitufe cha Kufunga (×) kwenye kona ya juu kulia */}
          <button
            type="button"
            onClick={handleCloseVideo}
            className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 text-white transition-all flex items-center justify-center cursor-pointer border border-white/20 shadow-lg"
            aria-label="Funga video"
            title="Funga video (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Container - TikTok Vertical Format 9:16, object-fit: contain */}
        <div
          className="w-full flex-1 flex items-center justify-center my-auto min-h-0 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-[420px] aspect-[9/16] max-h-[76vh] sm:max-h-[82vh] bg-black rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] border border-slate-800 flex items-center justify-center relative">
            <video
              ref={largeVideoRef}
              src="/Muongozo.mp4"
              controls
              playsInline
              preload="auto"
              className="w-full h-full object-contain bg-black"
              onEnded={handleCloseVideo}
            >
              <source src="/Muongozo.mp4" type="video/mp4" />
              Kivinjari chako hakikubali kucheza video hii.
            </video>
          </div>
        </div>

        {/* Bottom Bar: Kitufe cha ziada cha kurudi */}
        <div
          className="w-full max-w-md pt-2 pb-1 flex justify-center z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleCloseVideo}
            className="px-6 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white rounded-full text-xs font-bold tracking-wider uppercase border border-slate-700 transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <X className="w-4 h-4 text-red-500" />
            <span>Funga Video & Rudi Kwenye Tovuti</span>
          </button>
        </div>
      </div>
    </div>
  );
}
