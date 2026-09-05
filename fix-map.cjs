const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `<div className="space-y-4">
            <AnimatePresence>
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
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 mt-1 space-y-2 border-l-2 border-slate-800 pl-3">
                    {comment.replies.map((reply: any) => (
                      <div key={reply.id} className="flex gap-2">
                        <img src={reply.avatar} alt={reply.name} className="w-6 h-6 rounded-full border border-slate-700 object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-white">{reply.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>`;

const newStr = `<div className="space-y-4">
            <AnimatePresence>
            {comments.slice(0, showAllComments ? comments.length : 4).map((comment) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 mt-1 space-y-2 border-l-2 border-slate-800 pl-3">
                    {comment.replies.map((reply: any) => (
                      <div key={reply.id} className="flex gap-2">
                        <img src={reply.avatar} alt={reply.name} className="w-6 h-6 rounded-full border border-slate-700 object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-white">{reply.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </div>`;

content = content.replace(targetStr, newStr);
fs.writeFileSync('src/App.tsx', content);
