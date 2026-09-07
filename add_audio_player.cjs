const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const audioComponent = `
// --- Global Audio Player Component ---
function GlobalAudioPlayer() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  useEffect(() => {
    if (hasAttemptedAutoplay) return;
    
    // Attempt autoplay
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          setHasAttemptedAutoplay(true);
        }).catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
          setHasAttemptedAutoplay(true);
        });
      }
    }
  }, [hasAttemptedAutoplay, volume]);

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
    <div className="fixed bottom-32 sm:bottom-28 right-4 z-[150] flex flex-col items-end gap-2 pointer-events-none">
      <audio 
        ref={audioRef} 
        src="/Voice.mp3" 
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
            className="bg-[#1C1D24] border border-slate-700 p-3.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-3 w-52 pointer-events-auto backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <div className={\`w-2 h-2 rounded-full \${isPlaying ? 'bg-[#00E676] animate-pulse' : 'bg-slate-500'}\`}></div>
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Sauti ya Mwongozo</span>
              </div>
              <button onClick={() => setShowControls(false)} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-1 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-5 py-1">
              <button onClick={toggleMute} className="text-white p-2.5 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
              </button>
              <button onClick={togglePlay} className="bg-[#00E676] text-black p-3.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,230,118,0.3)]">
                {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 ml-0.5 fill-black" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2.5 pt-1">
              <VolumeX className="w-3 h-3 text-slate-500" />
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={volume} 
                onChange={handleVolume}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
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
          className={\`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.3)] border transition-all pointer-events-auto \${
            isPlaying 
              ? 'bg-[#1C1D24] border-[#00E676]/40 text-[#00E676] animate-pulse' 
              : 'bg-[#00E676] border-[#00E676] text-black hover:bg-[#00C260] hover:scale-105'
          }\`}
        >
          {isPlaying ? (
            <>
              <div className="flex items-center gap-0.5 mr-1">
                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#00E676] rounded-full"></motion.div>
                <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-[#00E676] rounded-full"></motion.div>
                <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 bg-[#00E676] rounded-full"></motion.div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Inacheza...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">Washa Sauti</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function App() {`;

code = code.replace('export default function App() {', audioComponent);

fs.writeFileSync('src/App.tsx', code);
console.log('Added GlobalAudioPlayer component before App');
