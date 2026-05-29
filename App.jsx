import { useState } from "react";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    age: "Adult",
    cover: "📗",
    summary: "Most people think that massive success requires massive action. But James Clear argues the opposite — that real change comes from the compound effect of hundreds of small decisions. If you get 1% better each day for a year, you'll end up 37 times better. This book breaks down the science of habit formation and gives you a proven system to build good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. Whether you want to exercise more, eat better, sleep earlier, or learn a new skill — this book shows you exactly how.",
    quote: { text: "You do not rise to the level of your goals. You fall to the level of your systems.", person: "James Clear" },
    reviews: [
      { user: "Sofia M.", text: "Changed the way I approach my daily routine completely!" },
      { user: "Liam K.", text: "Every page felt like a revelation. Highly recommend." }
    ]
  },
  {
    id: 2,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Classic",
    age: "Kids",
    cover: "📘",
    summary: "A pilot stranded in the desert meets a mysterious little boy who has fallen from a tiny asteroid. As the prince shares stories of his travels across different planets — each inhabited by a peculiar grown-up — we slowly uncover a tale about love, loneliness, and what adults forget as they grow older. Beautiful, poetic, and deeply philosophical, this short book has captivated readers of all ages for decades. It asks the most important questions: What does it mean to be responsible for someone? What is truly important in life?",
    quote: { text: "It is only with the heart that one can see rightly. What is essential is invisible to the eye.", person: "Antoine de Saint-Exupéry" },
    reviews: [{ user: "Emma R.", text: "A timeless story that made me cry happy tears." }]
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    age: "Adult",
    cover: "📙",
    summary: "How did one primate species — Homo sapiens — come to dominate the entire planet? Yuval Noah Harari takes us on a sweeping journey through 70,000 years of human history, from the Stone Age to the Silicon Age. He explores how the Cognitive Revolution gave us storytelling, how the Agricultural Revolution changed our lives forever, and how money, religion, and empires shaped civilizations. This book will make you question everything you thought you knew about progress, happiness, and what it means to be human.",
    quote: { text: "History is something that very few people have been doing while everyone else was ploughing fields and carrying water.", person: "Yuval Noah Harari" },
    reviews: [
      { user: "Marco T.", text: "Completely reshaped how I see the world and humanity." },
      { user: "Aisha B.", text: "Dense but absolutely worth it. A masterpiece." }
    ]
  },
  {
    id: 4,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    category: "Fiction",
    age: "Teen",
    cover: "📕",
    summary: "In the ruins of what was once North America, the totalitarian nation of Panem forces each of its twelve districts to send one boy and one girl to compete in the Hunger Games — a brutal, televised fight to the death. When sixteen-year-old Katniss Everdeen volunteers to take her younger sister's place, she enters an arena where survival means becoming a pawn in a much larger political game. Fast-paced, emotionally gripping, and packed with social commentary about power and media.",
    quote: { text: "Hope is the only thing stronger than fear.", person: "Suzanne Collins" },
    reviews: [{ user: "Zoe P.", text: "Couldn't put it down. Read the whole trilogy in a week!" }]
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    category: "Memoir",
    age: "Adult",
    cover: "📒",
    summary: "Tara Westover grew up in rural Idaho, the daughter of survivalist parents who distrusted the government, hospitals, and public schools. She had never set foot in a classroom until she was seventeen years old. Yet through sheer determination, she taught herself enough to pass the entrance exam to BYU, eventually earning a PhD from Cambridge University. This memoir is a stunning account of self-invention — about the tension between loyalty to family and the pursuit of knowledge.",
    quote: { text: "You can love someone and still choose to say goodbye to them.", person: "Tara Westover" },
    reviews: [{ user: "Nina S.", text: "One of the most powerful books I've ever read." }]
  },
  {
    id: 6,
    title: "Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    category: "Fiction",
    age: "Kids",
    cover: "📓",
    summary: "Greg Heffley is not exactly your typical hero. Armed with a journal (not a diary — he's very clear about that), Greg chronicles his hilarious attempts to survive middle school, avoid his over-enthusiastic best friend Rowley, and somehow become popular. Told through a brilliant mix of text and cartoon illustrations, this book captures all the awkwardness, embarrassment, and unexpected moments of growing up. The perfect book for reluctant readers of any age.",
    quote: { text: "Just because something is a tradition doesn't make it a good idea.", person: "Jeff Kinney" },
    reviews: [{ user: "Tommy L.", text: "Made me laugh out loud every single chapter!" }]
  }
];

const categories = ["All", "Self-Help", "Classic", "History", "Fiction", "Memoir"];
const ages = ["All Ages", "Kids", "Teen", "Adult"];
const categoryColors = {
  "Self-Help": "#c8a84b", "Classic": "#b5a87a",
  "History": "#a0926e", "Fiction": "#c4a35a", "Memoir": "#b8975f",
};

const moodSuggestions = [
  "I want something inspiring and motivating 💪",
  "I feel like a gripping adventure 🏹",
  "I want to learn something new about the world 🌍",
  "I need a quick fun read 😄",
  "I want to understand myself better 🧠",
  "I'm in the mood for something emotional ❤️",
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeAge, setActiveAge] = useState("All Ages");
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeTab, setActiveTab] = useState("discover");
  const [newReview, setNewReview] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [allBooks, setAllBooks] = useState(books);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // AI state
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const filtered = allBooks.filter(b =>
    (activeCategory === "All" || b.category === activeCategory) &&
    (activeAge === "All Ages" || b.age === activeAge)
  );

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const submitReview = (bookId) => {
    if (!newReview.trim() || !reviewName.trim()) return;
    setAllBooks(prev => prev.map(b =>
      b.id === bookId ? { ...b, reviews: [...b.reviews, { user: reviewName, text: newReview }] } : b
    ));
    setNewReview(""); setReviewName("");
  };

  const askAI = async (query) => {
    const q = query || aiQuery;
    if (!q.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    setAiError(null);
    try {
      const bookList = allBooks.map(b =>
        `ID:${b.id} | "${b.title}" by ${b.author} | Category: ${b.category} | Age: ${b.age} | Summary: ${b.summary.slice(0, 120)}...`
      ).join("\n");

      const prompt = `You are a warm, enthusiastic book advisor for an app called PageTurn. A user said: "${q}"

Here are the available books:
${bookList}

Pick the BEST 1-2 books that match what the user is looking for. Reply in this exact JSON format (no markdown, no extra text):
{
  "recommendations": [
    {
      "id": <book id as number>,
      "reason": "<2-3 warm, personal sentences explaining exactly why this book is perfect for them based on what they said>"
    }
  ],
  "message": "<one friendly opening sentence addressing their mood or request directly>"
}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("").trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiResponse(parsed);
    } catch (err) {
      setAiError("Something went wrong. Please try again!");
    }
    setAiLoading(false);
  };

  const shareLink = "https://pageturn.app";
  const shareMessage = `📚 Hey! I've been using PageTurn to discover amazing books. Check it out: ${shareLink}`;
  const copyLink = () => { navigator.clipboard.writeText(shareLink); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const favBooks = allBooks.filter(b => favorites.includes(b.id));
  const book = allBooks.find(b => b.id === selectedBook);

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", fontFamily: "'Georgia', serif", color: "#f0e6cc", maxWidth: 480, margin: "0 auto" }}>

      {/* Share Modal */}
      {showShare && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#1a1a1a", borderRadius: 24, padding: 28, width: "100%", maxWidth: 380, border: "1px solid #c8a84b" }}>
            <h2 style={{ margin: "0 0 6px", color: "#c8a84b", fontSize: 22 }}>📤 Share PageTurn</h2>
            <p style={{ margin: "0 0 20px", color: "#999", fontSize: 14 }}>Invite your friends to discover great books!</p>
            <div style={{ background: "#111", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, border: "1px solid #333" }}>
              <span style={{ fontSize: 13, color: "#888", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shareLink}</span>
              <button onClick={copyLink} style={{ background: copied ? "#2a6e3b" : "#c8a84b", border: "none", borderRadius: 8, padding: "6px 14px", color: "#000", fontWeight: "bold", fontSize: 13, cursor: "pointer", marginLeft: 10 }}>{copied ? "✓ Copied!" : "Copy"}</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank")} style={{ padding: 14, borderRadius: 14, border: "none", background: "#25D366", color: "#fff", fontWeight: "bold", fontSize: 15, cursor: "pointer" }}>📱 Share via WhatsApp</button>
              <button onClick={() => window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, "_blank")} style={{ padding: 14, borderRadius: 14, border: "none", background: "#1a73e8", color: "#fff", fontWeight: "bold", fontSize: 15, cursor: "pointer" }}>💬 Share via Text Message</button>
              <button onClick={() => window.open(`mailto:?subject=Check out PageTurn 📚&body=${encodeURIComponent(shareMessage)}`, "_blank")} style={{ padding: 14, borderRadius: 14, border: "1px solid #555", background: "#333", color: "#f0e6cc", fontWeight: "bold", fontSize: 15, cursor: "pointer" }}>✉️ Share via Email</button>
            </div>
            <button onClick={() => setShowShare(false)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #444", background: "none", color: "#888", fontSize: 14, cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)", padding: "28px 20px 18px", borderBottom: "1px solid #c8a84b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, color: "#c8a84b", fontSize: 28, letterSpacing: 2, fontStyle: "italic" }}>PageTurn</h1>
          <p style={{ margin: "3px 0 0", color: "#666", fontSize: 12, letterSpacing: 1 }}>YOUR NEXT GREAT READ</p>
        </div>
        <button onClick={() => setShowShare(true)} style={{ background: "#c8a84b", border: "none", borderRadius: 12, padding: "10px 16px", color: "#000", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>📤 Share</button>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #222", background: "#111" }}>
        {[
          { key: "discover", label: "Discover" },
          { key: "ai", label: "✨ AI Pick" },
          { key: "favorites", label: `Favorites${favorites.length > 0 ? ` (${favorites.length})` : ""}` },
        ].map(tab => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSelectedBook(null); }} style={{
            flex: 1, padding: "14px 6px", border: "none",
            borderBottom: activeTab === tab.key ? "2px solid #c8a84b" : "2px solid transparent",
            background: "none", color: activeTab === tab.key ? "#c8a84b" : "#555",
            fontWeight: "bold", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif"
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Book Detail */}
      {selectedBook && book ? (
        <div style={{ padding: "16px 16px 60px" }}>
          <button onClick={() => setSelectedBook(null)} style={{ background: "none", border: "none", color: "#c8a84b", fontWeight: "bold", fontSize: 14, cursor: "pointer", marginBottom: 16, padding: 0, letterSpacing: 1 }}>← BACK</button>
          <div style={{ background: "#1a1a1a", borderRadius: 20, padding: 24, border: "1px solid #2a2a2a" }}>
            <div style={{ textAlign: "center", fontSize: 72, marginBottom: 16 }}>{book.cover}</div>
            <h2 style={{ margin: "0 0 4px", fontSize: 24, color: "#f0e6cc", textAlign: "center" }}>{book.title}</h2>
            <p style={{ margin: "0 0 16px", color: "#888", fontSize: 14, textAlign: "center", fontStyle: "italic" }}>by {book.author}</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center" }}>
              <span style={{ background: "#222", border: `1px solid ${categoryColors[book.category] || "#c8a84b"}`, borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: "bold", color: categoryColors[book.category] || "#c8a84b" }}>{book.category}</span>
              <span style={{ background: "#222", border: "1px solid #444", borderRadius: 999, padding: "4px 14px", fontSize: 12, color: "#888" }}>{book.age}</span>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: "bold", color: "#c8a84b", letterSpacing: 2, textTransform: "uppercase" }}>About this book</p>
              <p style={{ margin: 0, lineHeight: 1.85, fontSize: 15, color: "#ccc" }}>{book.summary}</p>
            </div>
            <div style={{ background: "#111", borderRadius: 14, padding: "18px 20px", marginBottom: 20, borderLeft: "3px solid #c8a84b" }}>
              <p style={{ margin: 0, color: "#f0e6cc", fontSize: 14, fontStyle: "italic", lineHeight: 1.7 }}>"{book.quote.text}"</p>
              <p style={{ margin: "10px 0 0", color: "#c8a84b", fontSize: 12, fontWeight: "bold", letterSpacing: 1 }}>— {book.quote.person}</p>
            </div>
            <button onClick={() => toggleFav(book.id)} style={{ width: "100%", padding: 14, borderRadius: 12, border: `1px solid ${favorites.includes(book.id) ? "#c8a84b" : "#333"}`, background: favorites.includes(book.id) ? "#c8a84b" : "transparent", color: favorites.includes(book.id) ? "#000" : "#666", fontWeight: "bold", fontSize: 15, cursor: "pointer", marginBottom: 28, fontFamily: "Georgia, serif" }}>
              {favorites.includes(book.id) ? "★ Saved to Favorites" : "☆ Add to Favorites"}
            </button>
            <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: "bold", color: "#c8a84b", letterSpacing: 2, textTransform: "uppercase" }}>Community Reviews</p>
            {book.reviews.map((r, i) => (
              <div key={i} style={{ background: "#111", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1px solid #222" }}>
                <p style={{ margin: "0 0 5px", fontWeight: "bold", fontSize: 13, color: "#c8a84b" }}>{r.user}</p>
                <p style={{ margin: 0, fontSize: 14, color: "#aaa", lineHeight: 1.7 }}>{r.text}</p>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: "bold", color: "#c8a84b", letterSpacing: 2, textTransform: "uppercase" }}>Share Your Thoughts</p>
              <input placeholder="Your name" value={reviewName} onChange={e => setReviewName(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #333", background: "#111", color: "#f0e6cc", fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
              <textarea placeholder="What did you think of this book?" value={newReview} onChange={e => setNewReview(e.target.value)} rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #333", background: "#111", color: "#f0e6cc", fontSize: 14, marginBottom: 12, boxSizing: "border-box", resize: "none", fontFamily: "Georgia, serif" }} />
              <button onClick={() => submitReview(book.id)} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "#c8a84b", color: "#000", fontWeight: "bold", fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>Post Review</button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "16px 16px 60px" }}>

          {/* AI TAB */}
          {activeTab === "ai" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>✨</div>
                <h2 style={{ margin: "0 0 6px", color: "#c8a84b", fontSize: 22 }}>AI Book Advisor</h2>
                <p style={{ margin: 0, color: "#666", fontSize: 14, lineHeight: 1.6 }}>Tell me your mood, what you're going through, or what kind of story you're craving — I'll find your perfect book.</p>
              </div>

              {/* Mood chips */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ margin: "0 0 10px", fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", fontWeight: "bold" }}>Quick Picks</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {moodSuggestions.map((s, i) => (
                    <button key={i} onClick={() => { setAiQuery(s); askAI(s); }} style={{
                      padding: "8px 14px", borderRadius: 999, border: "1px solid #2a2a2a",
                      background: "#1a1a1a", color: "#aaa", fontSize: 13, cursor: "pointer",
                      fontFamily: "Georgia, serif", textAlign: "left"
                    }}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Custom input */}
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <input
                  placeholder="Or describe what you're looking for..."
                  value={aiQuery}
                  onChange={e => setAiQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && askAI()}
                  style={{ flex: 1, padding: "13px 16px", borderRadius: 12, border: "1px solid #2a2a2a", background: "#1a1a1a", color: "#f0e6cc", fontSize: 14, fontFamily: "Georgia, serif" }}
                />
                <button onClick={() => askAI()} disabled={aiLoading} style={{ padding: "13px 18px", borderRadius: 12, border: "none", background: aiLoading ? "#444" : "#c8a84b", color: "#000", fontWeight: "bold", fontSize: 15, cursor: aiLoading ? "not-allowed" : "pointer" }}>
                  {aiLoading ? "..." : "→"}
                </button>
              </div>

              {/* Loading */}
              {aiLoading && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📚</div>
                  <p style={{ color: "#666", fontSize: 14 }}>Finding your perfect book...</p>
                </div>
              )}

              {/* Error */}
              {aiError && <p style={{ color: "#e74c3c", textAlign: "center", fontSize: 14 }}>{aiError}</p>}

              {/* AI Response */}
              {aiResponse && !aiLoading && (
                <div>
                  <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "16px 18px", marginBottom: 16, borderLeft: "3px solid #c8a84b" }}>
                    <p style={{ margin: 0, color: "#ccc", fontSize: 15, lineHeight: 1.7, fontStyle: "italic" }}>✨ {aiResponse.message}</p>
                  </div>
                  {aiResponse.recommendations.map((rec, i) => {
                    const b = allBooks.find(bk => bk.id === rec.id);
                    if (!b) return null;
                    return (
                      <div key={i} style={{ background: "#1a1a1a", borderRadius: 18, padding: 20, marginBottom: 14, border: "1px solid #2a2a2a" }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                          <div style={{ fontSize: 44 }}>{b.cover}</div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: "0 0 3px", fontSize: 17, color: "#f0e6cc" }}>{b.title}</h3>
                            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#666", fontStyle: "italic" }}>by {b.author}</p>
                            <span style={{ border: `1px solid ${categoryColors[b.category] || "#c8a84b"}`, borderRadius: 999, padding: "2px 10px", fontSize: 11, color: categoryColors[b.category] || "#c8a84b" }}>{b.category}</span>
                          </div>
                        </div>
                        <div style={{ background: "#111", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
                          <p style={{ margin: "0 0 4px", fontSize: 11, color: "#c8a84b", fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Why this book for you</p>
                          <p style={{ margin: 0, fontSize: 14, color: "#bbb", lineHeight: 1.7 }}>{rec.reason}</p>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={() => { setSelectedBook(b.id); setActiveTab("discover"); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid #333", background: "transparent", color: "#f0e6cc", fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif" }}>Read More</button>
                          <button onClick={() => toggleFav(b.id)} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${favorites.includes(b.id) ? "#c8a84b" : "#333"}`, background: favorites.includes(b.id) ? "#c8a84b" : "transparent", color: favorites.includes(b.id) ? "#000" : "#666", fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                            {favorites.includes(b.id) ? "★ Saved" : "☆ Save"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <button onClick={() => { setAiResponse(null); setAiQuery(""); }} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #2a2a2a", background: "none", color: "#555", fontSize: 14, cursor: "pointer", marginTop: 4, fontFamily: "Georgia, serif" }}>Ask something else</button>
                </div>
              )}
            </div>
          )}

          {/* DISCOVER TAB */}
          {activeTab === "discover" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: "bold", color: "#555", letterSpacing: 2, textTransform: "uppercase" }}>Category</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {categories.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "7px 16px", borderRadius: 999, border: activeCategory === c ? "1px solid #c8a84b" : "1px solid #2a2a2a", background: activeCategory === c ? "#c8a84b" : "#1a1a1a", color: activeCategory === c ? "#000" : "#666", fontSize: 13, cursor: "pointer", fontWeight: activeCategory === c ? "bold" : "normal", fontFamily: "Georgia, serif" }}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: "bold", color: "#555", letterSpacing: 2, textTransform: "uppercase" }}>Age Group</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {ages.map(a => (
                    <button key={a} onClick={() => setActiveAge(a)} style={{ padding: "7px 16px", borderRadius: 999, border: activeAge === a ? "1px solid #c8a84b" : "1px solid #2a2a2a", background: activeAge === a ? "#c8a84b" : "#1a1a1a", color: activeAge === a ? "#000" : "#666", fontSize: 13, cursor: "pointer", fontWeight: activeAge === a ? "bold" : "normal", fontFamily: "Georgia, serif" }}>{a}</button>
                  ))}
                </div>
              </div>
              {filtered.length === 0 ? (
                <p style={{ textAlign: "center", color: "#444", marginTop: 40 }}>No books found for these filters.</p>
              ) : (
                filtered.map(b => (
                  <div key={b.id} onClick={() => setSelectedBook(b.id)} style={{ background: "#1a1a1a", borderRadius: 18, padding: 18, marginBottom: 14, cursor: "pointer", border: "1px solid #2a2a2a", display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 48, lineHeight: 1 }}>{b.cover}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: "0 0 3px", fontSize: 17, color: "#f0e6cc" }}>{b.title}</h3>
                      <p style={{ margin: "0 0 8px", fontSize: 13, color: "#666", fontStyle: "italic" }}>by {b.author}</p>
                      <p style={{ margin: "0 0 10px", fontSize: 13, color: "#888", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{b.summary}</p>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span style={{ border: `1px solid ${categoryColors[b.category] || "#c8a84b"}`, borderRadius: 999, padding: "2px 10px", fontSize: 11, color: categoryColors[b.category] || "#c8a84b" }}>{b.category}</span>
                        <span style={{ border: "1px solid #333", borderRadius: 999, padding: "2px 10px", fontSize: 11, color: "#555" }}>{b.age}</span>
                      </div>
                    </div>
                    <div onClick={e => { e.stopPropagation(); toggleFav(b.id); }} style={{ fontSize: 20, cursor: "pointer", color: favorites.includes(b.id) ? "#c8a84b" : "#333", paddingTop: 2 }}>
                      {favorites.includes(b.id) ? "★" : "☆"}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* FAVORITES TAB */}
          {activeTab === "favorites" && (
            <>
              <h2 style={{ color: "#c8a84b", fontSize: 18, margin: "4px 0 16px", letterSpacing: 1 }}>YOUR FAVORITES</h2>
              {favBooks.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: 60 }}>
                  <div style={{ fontSize: 48 }}>☆</div>
                  <p style={{ color: "#444", marginTop: 16, lineHeight: 1.7 }}>No favorites yet.<br />Tap ☆ on any book to save it here.</p>
                </div>
              ) : (
                favBooks.map(b => (
                  <div key={b.id} onClick={() => { setSelectedBook(b.id); setActiveTab("discover"); }} style={{ background: "#1a1a1a", borderRadius: 18, padding: 18, marginBottom: 14, display: "flex", gap: 16, alignItems: "center", cursor: "pointer", border: "1px solid #c8a84b33" }}>
                    <div style={{ fontSize: 44 }}>{b.cover}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 3px", fontSize: 16, color: "#f0e6cc" }}>{b.title}</h3>
                      <p style={{ margin: 0, fontSize: 13, color: "#666", fontStyle: "italic" }}>by {b.author}</p>
                    </div>
                    <div style={{ color: "#c8a84b", fontSize: 20 }}>★</div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
