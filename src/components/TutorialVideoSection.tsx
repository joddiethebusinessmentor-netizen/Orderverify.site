import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Users, RotateCcw } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, any>;
          events?: {
            onReady?: (event: any) => void;
            onStateChange?: (event: { data: number; target: any }) => void;
            onError?: (event: any) => void;
          };
        }
      ) => any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

interface TutorialVideoSectionProps {
  whatsappUrl?: string;
}

// Helper to format seconds into mm:ss
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function TutorialVideoSection({
  whatsappUrl = "https://chat.whatsapp.com/D1b8NV1tkMo0uPGHdE4rjR?s=cl&p=a&mlu=4&ilr=4"
}: TutorialVideoSectionProps) {
  // YouTube video ID from https://youtube.com/shorts/Hd_hXPYPIKk?si=d4hzUsIOgS7GLAvv
  const videoId = "Hd_hXPYPIKk";

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(34);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame Player API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      return;
    }

    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize player once fullscreen is requested
  const initializePlayer = () => {
    if (playerRef.current) {
      try {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        // safe ignore
      }
      return;
    }

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('custom-yt-player-embed', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          fs: 1,
          disablekb: 0,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            try {
              event.target.playVideo();
              setIsPlaying(true);
              const dur = event.target.getDuration();
              if (dur && dur > 0) setDuration(dur);
            } catch {
              // safe ignore
            }
          },
          onStateChange: (event: { data: number; target: any }) => {
            if (!window.YT) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              const dur = event.target.getDuration();
              if (dur && dur > 0) setDuration(dur);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              // Video ikimalizika, funga fullscreen na urudishe mtumiaji kwenye landscape preview 16:9
              handleCloseFullscreen();
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevReady) prevReady();
        createPlayer();
      };
    }
  };

  // Poll progress while playing
  useEffect(() => {
    if (isPlaying && isFullscreen) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const curr = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || duration;
          setCurrentTime(curr);
          if (dur > 0) {
            setDuration(dur);
            setProgress((curr / dur) * 100);
          }
        }
      }, 250);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, isFullscreen, duration]);

  // Handle Play Click from Landscape 16:9 Thumbnail
  const handleStartPlay = () => {
    setIsFullscreen(true);
    showControlsTemporarily();

    // Trigger native browser fullscreen if allowed by environment
    if (overlayRef.current && typeof overlayRef.current.requestFullscreen === 'function') {
      overlayRef.current.requestFullscreen().catch(() => {});
    }

    initializePlayer();
  };

  // Handle Close Fullscreen & return to Landscape 16:9 Preview
  const handleCloseFullscreen = () => {
    if (playerRef.current) {
      try {
        playerRef.current.pauseVideo();
        playerRef.current.seekTo(0, true);
      } catch {
        // safe ignore
      }
    }

    setIsPlaying(false);
    setIsFullscreen(false);
    setCurrentTime(0);
    setProgress(0);

    // Exit native browser fullscreen if active
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {
        // safe ignore
      }
    }
  };

  // Keyboard handler for Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleCloseFullscreen();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  // Auto-hide controls timer
  const showControlsTemporarily = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3500);
  };

  // Custom Controls actions
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    showControlsTemporarily();
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    showControlsTemporarily();
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;
    showControlsTemporarily();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(pct * 100);
  };

  const handleRestart = () => {
    if (!playerRef.current) return;
    showControlsTemporarily();
    playerRef.current.seekTo(0, true);
    playerRef.current.playVideo();
    setIsPlaying(true);
  };

  return (
    <div className="w-full border border-emerald-500/35 rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(0,230,118,0.12)] mt-4 bg-[#0B0D14] p-4 sm:p-5">
      {/* Kichwa cha video - Hakuna taarifa za ziada za YouTube */}
      <h2 className="text-sm sm:text-base md:text-lg font-black text-white leading-snug uppercase tracking-wide mb-3 text-center">
        ANGALIA NAMNA YA KUFANYA KAZI NA KUTOA PESA HAPA ORDERVERIFY
      </h2>

      {/* 1. KABLA YA PLAY: Muundo wa kulala (LANDSCAPE) wa 16:9, responsive, picha halisi ya video na Play button katikati */}
      <div
        onClick={handleStartPlay}
        className="w-full max-w-2xl aspect-[16/9] mx-auto relative rounded-2xl overflow-hidden bg-black shadow-[0_0_30px_rgba(0,0,0,0.85)] border border-slate-800 group cursor-pointer"
      >
        {/* Picha halisi (frame/thumbnail) inayotokana na video halisi */}
        <img
          src="/orderverify_landscape_thumb.jpg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/youtube_preview.jpg';
          }}
          alt="ANGALIA NAMNA YA KUFANYA KAZI NA KUTOA PESA HAPA ORDERVERIFY"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectFit: 'cover' }}
        />

        {/* Kivuli chenye Play Button kubwa na nzuri katikati ya picha */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 group-hover:bg-black/25 transition-all flex flex-col items-center justify-center">
          <button
            type="button"
            aria-label="Play video"
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

      {/* 2 & 3. MTUMIAJI AKIBONYEZA PLAY: Fullscreen Mode, Video Halisi katika Portrait Ratio 9:16 (Isikatwe, Isizoomiwe, Isinyooshwe) */}
      <div
        ref={overlayRef}
        onMouseMove={showControlsTemporarily}
        onTouchStart={showControlsTemporarily}
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

        {/* Video Player Frame - Portrait Ratio 9:16 Halisi, katikati ya screen, object-fit: contain bila kukatwa */}
        <div className="relative w-full max-w-[380px] sm:max-w-[400px] aspect-[9/16] max-h-[85vh] sm:max-h-[88vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.95)] bg-black border border-slate-800 mx-auto">
          {/* Vizuizi vya kuficha taarifa za YouTube kabisa (Title, Channel Name, nk) */}
          {/* 1. Kizuizi cha Juu - Kuficha jina la channel na title (Taller & stronger gradient) */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-black z-20 pointer-events-none" />

          {/* 2. Kizuizi cha Chini - Kuficha logo za YouTube au links zinazoweza kutokea */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/90 to-transparent z-20 pointer-events-none" />

          {/* YouTube IFrame Player Instance */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div id="custom-yt-player-embed" className="w-full h-full" style={{ objectFit: 'contain' }} />
          </div>

          {/* Clickable Overlay to toggle play/pause when tapping video */}
          <div
            onClick={togglePlayPause}
            className="absolute inset-0 z-10 cursor-pointer"
          />

          {/* Pause splash indicator in center */}
          {!isPlaying && isPlayerReady && (
            <div
              onClick={togglePlayPause}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 pointer-events-auto cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00E676] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,230,118,0.7)] transform hover:scale-105 transition-transform">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Custom Bottom Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black via-black/85 to-transparent transition-opacity duration-300 ${
              controlsVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Custom Interactive Progress Bar (Scrubber) */}
            <div
              className="relative w-full py-2.5 cursor-pointer group"
              onClick={handleSeek}
            >
              <div className="w-full h-1.5 sm:h-2 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00E676] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls Row: Play/Pause, Replay, Volume, Timer, Close */}
            <div className="flex items-center justify-between mt-1 text-white">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="p-1.5 hover:text-[#00E676] transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  )}
                </button>

                {/* Restart Video */}
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1.5 hover:text-[#00E676] transition-colors cursor-pointer text-slate-300 hover:text-white"
                  title="Anza upya"
                  aria-label="Restart video"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Mute / Unmute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 hover:text-[#00E676] transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>

                {/* Timestamp */}
                <span className="text-xs sm:text-sm font-mono text-slate-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Close Button in Bottom Controls */}
              <button
                type="button"
                onClick={handleCloseFullscreen}
                className="px-3 py-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg font-bold text-white transition-all cursor-pointer"
              >
                Funga
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
