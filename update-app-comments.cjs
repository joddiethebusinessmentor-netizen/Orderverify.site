const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// We need to make sure comments are also updated when the epoch changes.
// The easiest way is to re-run generate2HourComments when time triggers an epoch boundary, 
// but simply checking the epoch and storing it in a ref is better.

const effectOld = `  // Rotate comments and sync with 12-hour refresh
  useEffect(() => {
    const dynamicComments = generate2HourComments();
    setAllComments(dynamicComments);

    const interval = setInterval(() => {
      setCurrentCommentIndex(prev => (prev + 1) % dynamicComments.length);
    }, 13000); // 13 seconds per comment so user can read comfortably before it changes
    
    return () => clearInterval(interval);
  }, []);`;

const effectNew = `  // Rotate comments and sync with 2-hour refresh
  useEffect(() => {
    let lastEpoch = Math.floor(Date.now() / (2 * 60 * 60 * 1000));
    let dynamicComments = generate2HourComments();
    setAllComments(dynamicComments);

    const interval = setInterval(() => {
      const currentEpoch = Math.floor(Date.now() / (2 * 60 * 60 * 1000));
      if (currentEpoch !== lastEpoch) {
        lastEpoch = currentEpoch;
        dynamicComments = generate2HourComments();
        setAllComments(dynamicComments);
        setCurrentCommentIndex(0);
      } else {
        setCurrentCommentIndex(prev => (prev + 1) % dynamicComments.length);
      }
    }, 13000); // 13 seconds per comment so user can read comfortably before it changes
    
    return () => clearInterval(interval);
  }, []);`;

if (app.includes('// Rotate comments and sync with')) {
  app = app.replace(effectOld, effectNew);
  // Also handle the case where "2-hour refresh" is already in the comment from previous replace
  const effectOld2 = effectOld.replace(/12-hour/g, '2-hour');
  app = app.replace(effectOld2, effectNew);
  fs.writeFileSync('src/App.tsx', app);
  console.log('App.tsx comments updated.');
} else {
  console.log('Could not find comments useEffect.');
}
