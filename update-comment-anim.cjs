const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldMap = `{comments.slice(0, showAllComments ? comments.length : 4).map((comment) => (
              <div key={comment.id} className="flex flex-col gap-3 bg-[#0B0C10] p-3 rounded-2xl border border-slate-800">
                <div className="flex gap-3">
                  <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full border border-slate-700 object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{comment.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{comment.text}</p>
                    <span className="text-[10px] text-slate-500 mt-2 block">{comment.time}</span>
                  </div>
                </div>`;
                
const newMap = `<AnimatePresence>
            {comments.slice(0, showAllComments ? comments.length : 4).map((comment) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={comment.id} 
                className="flex flex-col gap-3 bg-[#0B0C10] p-3 rounded-2xl border border-slate-800"
              >
                <div className="flex gap-3">
                  <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full border border-slate-700 object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{comment.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{comment.text}</p>
                    <span className="text-[10px] text-slate-500 mt-2 block">{comment.time}</span>
                  </div>
                </div>`;
                
content = content.replace(oldMap, newMap);

const oldMapEnd = `                </div>
              </div>
            ))}`;
const newMapEnd = `                </div>
              </motion.div>
            ))}
            </AnimatePresence>`;
content = content.replace(oldMapEnd, newMapEnd);            

fs.writeFileSync('src/App.tsx', content);
