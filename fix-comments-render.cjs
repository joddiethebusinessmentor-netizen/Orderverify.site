const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldMap = `{comments.slice(0, showAllComments ? comments.length : 4).map((comment) => (
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
              </motion.div>
            ))}`;
            
const newMap = `              {currentLiveComment && (
                <motion.div 
                  layout
                  key={currentLiveComment.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95, position: 'absolute', width: '100%' }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="flex flex-col gap-3 bg-[#0B0C10] p-4 rounded-2xl border border-slate-800 shadow-xl"
                >
                  <div className="flex gap-3">
                    <img src={currentLiveComment.avatar} alt={currentLiveComment.name} className="w-10 h-10 rounded-full border border-[#00E676]/40 object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{currentLiveComment.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{currentLiveComment.text}</p>
                      <span className="text-[10px] text-slate-500 mt-2 block font-bold text-[#00E676]/60">{currentLiveComment.time}</span>
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {currentLiveComment.replies && currentLiveComment.replies.length > 0 && (
                    <div className="ml-8 mt-1 space-y-2 border-l-2 border-[#00E676]/20 pl-3">
                      {currentLiveComment.replies.map((reply: any) => (
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
              )}`;

content = content.replace(oldMap, newMap);

const oldViewAllBtn = `          {!showAllComments && comments.length > 4 && (
            <button 
              onClick={() => runWithLoader(() => {
                setShowAllComments(true);
                triggerMotivation("Wanachama wenzako wote unaowaona hapa walianza kwa mtaji wa 14,500/= tu. Na wewe unaweza kuanza leo na kubadilisha maisha yako!");
              })}
              className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              View All <ChevronDown className="w-4 h-4" />
            </button>
          )}`;
content = content.replace(oldViewAllBtn, `          {/* View All removed for live rotating comment design */}`);

fs.writeFileSync('src/App.tsx', content);
