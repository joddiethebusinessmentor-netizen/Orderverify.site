const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const doubleDeclarations = `  const [showAllComments, setShowAllComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      name: "Mgeni (Wewe)",
      text: newCommentText,
      time: "Sasa hivi",
      avatar: "https://i.pravatar.cc/150?img=32"
    };
    runWithLoader(() => {
      setComments([newCommentObj, ...comments]);
      setNewCommentText("");
    });
  };`;

content = content.replace(doubleDeclarations, "");

fs.writeFileSync('src/App.tsx', content);
