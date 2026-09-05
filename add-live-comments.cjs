const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `const [comments, setComments] = useState(initialComments);`;

const newCode = `const [comments, setComments] = useState(initialComments);

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

content = content.replace(targetStr, newCode);
fs.writeFileSync('src/App.tsx', content);
