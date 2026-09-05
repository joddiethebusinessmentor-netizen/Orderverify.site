const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `{comments.slice(0, showAllComments ? comments.length : 4).map((comment) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}`;

// We already replaced this logic in an earlier step but the old code block might still be there somehow. Let's just remove the block if it exists and clean it up.

