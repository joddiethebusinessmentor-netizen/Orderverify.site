const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const searchStr = `  useEffect(() => {
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

const replaceStr = `  const autoplaySuccess = React.useRef(false);

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
  }, [volume]);`;

if (code.includes(searchStr)) {
    code = code.replace(searchStr, replaceStr);
    fs.writeFileSync('src/App.tsx', code);
    console.log('Successfully fixed scratchy audio and looping bug');
} else {
    console.log('Error: Could not find the target string');
}
