const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the welcome message
const oldWelcome = 'setTopNotification("Karibu kwenye site yetu ya kuthibitisha order za wateja na kulipwa! Lengo letu ni kuhakikisha unatimiza ndoto zako huku tukishirikiana na kukua kwa pamoja.");';
const newWelcome = 'setTopNotification("Karibu kwenye site yetu ambayo itakusaidia kutimiza ndoto zako kwa kuthibitisha order za wateja na kulipwa");';
content = content.replace(oldWelcome, newWelcome);

// 2. Fix the motivation timeout
const oldTrigger = `const triggerMotivation = (message: string) => {
    setTopNotification(message);
    setShowTopNotification(true);
    setTimeout(() => setShowTopNotification(false), 12000);
  };`;
const newTrigger = `const triggerMotivation = (message: string) => {
    setTopNotification(message);
    setShowTopNotification(true);
    setTimeout(() => setShowTopNotification(false), 10000);
  };`;
content = content.replace(oldTrigger, newTrigger);

// 3. Extract exact block using regex
const regex = /<div className="space-y-4">\s*<AnimatePresence>[\s\S]*?<\/AnimatePresence><\/div>/;
const newCommentBlock = `<div className="relative min-h-[140px] overflow-hidden">
            <AnimatePresence mode="popLayout">
              {currentLiveComment && (
                <motion.div 
                  layout
                  key={currentLiveComment.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="flex flex-col gap-3 bg-[#0B0C10] p-4 rounded-2xl border border-slate-800 shadow-xl w-full"
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
              )}
            </AnimatePresence>
          </div>`;

content = content.replace(regex, newCommentBlock);

fs.writeFileSync('src/App.tsx', content);
