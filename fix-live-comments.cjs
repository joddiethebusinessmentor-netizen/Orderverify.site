const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the live comments block and comments state.
const oldLiveComments = `const [comments, setComments] = useState(initialComments);

  // Live Comments Simulation
  useEffect(() => {
    const liveComments = [
      { name: "John Doe", text: "Just received my payout in Kenya via M-Pesa. This is real! 🇰🇪", avatar: "https://i.pravatar.cc/150?img=11" },
      { name: "Aisha", text: "Asanteni sana uongozi, hela yangu imeingia muda huu! 🎉", avatar: "https://i.pravatar.cc/150?img=9" },
      { name: "Sarah O.", text: "Amazing platform. Working perfectly from Nigeria. 🇳🇬", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Fatuma", text: "Leo nimepiga elfu 45. Kazi nzuri sana jamani.", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Kwame", text: "Very efficient system. Loving it from Ghana 🇬🇭", avatar: "https://i.pravatar.cc/150?img=8" },
      { name: "Baraka", text: "Niliogopa kutoa mtaji ila sasa nimerudisha mara tatu yake. Safi sana.", avatar: "https://i.pravatar.cc/150?img=14" },
      { name: "David", text: "Smooth withdrawals. Thanks for the opportunity! 🇿🇦", avatar: "https://i.pravatar.cc/150?img=13" },
      { name: "Mercy", text: "Finally a legit way to earn online. Bless you all. 🙏", avatar: "https://i.pravatar.cc/150?img=15" },
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < liveComments.length) {
        const newC = liveComments[index];
        setComments(prev => [{
          id: Date.now() + index,
          name: newC.name,
          text: newC.text,
          time: "Sasa hivi",
          avatar: newC.avatar,
          replies: []
        }, ...prev]);
        index++;
      }
    }, 12000); // New comment pops up every 12 seconds
    
    return () => clearInterval(interval);
  }, []);`;

const newLiveComments = `const [allComments, setAllComments] = useState(initialComments);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  // Single Live Comment Simulation
  useEffect(() => {
    const liveComments = [
      { id: 991, name: "John Doe", text: "Just received my payout in Kenya via M-Pesa. This is real! 🇰🇪", avatar: "https://i.pravatar.cc/150?img=11", time: "Sasa hivi", replies: [] },
      { id: 992, name: "Aisha", text: "Asanteni sana uongozi, hela yangu imeingia muda huu! 🎉", avatar: "https://i.pravatar.cc/150?img=9", time: "Sasa hivi", replies: [] },
      { id: 993, name: "Sarah O.", text: "Amazing platform. Working perfectly from Nigeria. 🇳🇬", avatar: "https://i.pravatar.cc/150?img=5", time: "Sasa hivi", replies: [] },
      { id: 994, name: "Fatuma", text: "Leo nimepiga elfu 45. Kazi nzuri sana jamani.", avatar: "https://i.pravatar.cc/150?img=12", time: "Sasa hivi", replies: [] },
      { id: 995, name: "Kwame", text: "Very efficient system. Loving it from Ghana 🇬🇭", avatar: "https://i.pravatar.cc/150?img=8", time: "Sasa hivi", replies: [] },
      { id: 996, name: "Baraka", text: "Niliogopa kutoa mtaji ila sasa nimerudisha mara tatu yake. Safi sana.", avatar: "https://i.pravatar.cc/150?img=14", time: "Sasa hivi", replies: [] },
      { id: 997, name: "David", text: "Smooth withdrawals. Thanks for the opportunity! 🇿🇦", avatar: "https://i.pravatar.cc/150?img=13", time: "Sasa hivi", replies: [] },
      { id: 998, name: "Mercy", text: "Finally a legit way to earn online. Bless you all. 🙏", avatar: "https://i.pravatar.cc/150?img=15", time: "Sasa hivi", replies: [] },
    ];
    
    // Combine with initial comments randomly
    setAllComments([...liveComments, ...initialComments].sort(() => Math.random() - 0.5));
    
    const interval = setInterval(() => {
      setCurrentCommentIndex(prev => (prev + 1) % 48);
    }, 6000); // 6 seconds per comment
    
    return () => clearInterval(interval);
  }, []);

  const currentLiveComment = allComments[currentCommentIndex];
  // Fake add comment handler
  const [newCommentText, setNewCommentText] = useState("");
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      name: "Mgeni",
      text: newCommentText,
      time: "Sasa hivi",
      avatar: "https://i.pravatar.cc/150?img=32",
      replies: []
    };
    // Insert right after current so they see it next
    const newComments = [...allComments];
    newComments.splice(currentCommentIndex + 1, 0, newCommentObj);
    setAllComments(newComments);
    setCurrentCommentIndex(currentCommentIndex + 1);
    setNewCommentText("");
  };`;

content = content.replace(oldLiveComments, newLiveComments);

// We need to remove the old handleAddComment since we just rewrote it.
const oldHandleAdd = `  const [showAllComments, setShowAllComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      name: "Wewe",
      text: newCommentText,
      time: "Sasa hivi",
      avatar: "https://i.pravatar.cc/150?img=32"
    };
    runWithLoader(() => {
      setComments([newCommentObj, ...comments]);
      setNewCommentText("");
    });
  };`;
content = content.replace(oldHandleAdd, `  const [showAllComments, setShowAllComments] = useState(false);`);

fs.writeFileSync('src/App.tsx', content);
