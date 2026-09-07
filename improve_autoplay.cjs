const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldUseEffect = `  useEffect(() => {
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
  }, [hasAttemptedAutoplay, volume]);`;

const newUseEffect = `  useEffect(() => {
    let isMounted = true;
    
    const tryPlay = () => {
      if (!isMounted || !audioRef.current || isPlaying) return;
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (isMounted) setIsPlaying(true);
          ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => document.removeEventListener(evt, tryPlay));
        }).catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    // Try immediately on mount
    tryPlay();

    // If blocked, listen to ANY first user interaction across the entire document
    ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => 
      document.addEventListener(evt, tryPlay, { passive: true, once: true })
    );

    return () => {
      isMounted = false;
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => document.removeEventListener(evt, tryPlay));
    };
  }, [volume, isPlaying]);`;

code = code.replace(oldUseEffect, newUseEffect);

// Add playsInline and preload
code = code.replace(
  'src="/Jodef.mp3"',
  'src="/Jodef.mp3"\n        playsInline\n        preload="auto"'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Autoplay improved');
