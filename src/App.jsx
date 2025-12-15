import React, { useState, useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("0d 0h 0m 0s");

  useEffect(() => {
    const endDate = new Date("2025-12-31T00:00:00Z");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;
      if (diff <= 0) {
        setTimeLeft("0d 0h 0m 0s");
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchRank = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      // const res = await fetch("https://leaderboard-bice-mu.vercel.app/api/zama");
      const data = await res.json();
      const clean = username.replace("@", "").toLowerCase();
      const user = data.find((u) => u.username.toLowerCase() === clean);
      setResult(user || { rank: null });
    } catch {
      setError("Error fetching leaderboard. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-between px-4 py-6 text-center space-y-8">
      {/* Hero */}
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold glow mb-3">Zama Rank Checker</h1>
        <p className="text-lg mb-2">Season 5</p>
        <p className="text-2xl md:text-3xl font-bold mb-2">{timeLeft}</p>
        <p className="text-lg font-semibold">Live Prize Pool</p>
        <p className="text-4xl font-extrabold glow mb-4">$53,000</p>
        <p className="text-lg font-semibold">OG NFT</p>
        <p className="text-3xl font-extrabold glow mb-4">1006</p>
        <p className="italic opacity-90">The last chance to be the first</p>
        <p className="mt-3 text-sm">Some follow the path, others draw the map…</p>
      </div>

      {/* Search */}
      <div className="w-full max-w-md">
        <div className="flex items-center bg-[#ffc420] rounded-full overflow-hidden p-1 focus-within:ring-4 focus-within:ring-yellow-300 transition-all duration-300">
          <input
            type="text"
            placeholder="Enter X username (e.g., @username)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchRank()}
            className="flex-1 px-4 py-3 text-black placeholder-gray-800 focus:outline-none"
          />
          <button
            onClick={fetchRank}
            className="bg-black text-[#ffc420] font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
          >
            Check Rank
          </button>
        </div>

        {loading && <p className="mt-4 animate-pulse">Checking your rank...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {result && !loading && (
          <div className="mt-6 card mx-auto w-full max-w-sm animate-fade-in">
            {result.rank ? (
              <>
                <h2 className="text-2xl font-bold">@{result.username}</h2>
                <p className="text-xl mt-2">Rank: <span className="font-extrabold">{result.rank}</span></p>
                {result.rank <= 1000 && (
                  <div className="mt-3 bg-[#ffc420] text-black px-4 py-2 rounded-full inline-block font-bold animate-bounce">
                    🏅 Top {result.rank <= 100 ? "100" : "1000"} Reward Winner
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-lg font-bold">@{username.replace("@", "")}</p>
                <p>Not in top 1500 — keep going!</p>
                <p className="text-2xl font-extrabold mt-3">----</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col space-y-3 w-full max-w-sm">
        <a
          href="https://www.zama.org/programs/creator-program"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ffc420] text-black font-bold py-3 rounded-full hover:bg-yellow-300 transition-all duration-300"
        >
          Join the Zama Creator Program to boost your rank →
        </a>
        <a
          href="https://x.com/hprime0"
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-[#ffc420] py-3 rounded-full font-semibold hover:bg-[#ffc420] hover:text-black transition-all duration-300"
        >
          If you find this useful, kindly follow @hprime0
        </a>
      </div>

      {/* Footer */}
      <footer className="pt-8 text-sm opacity-80">
        Built by <a href="https://x.com/hprime0" target="_blank" className="underline">@hprime0</a>
      </footer>
    </div>
  );
};

export default App;
