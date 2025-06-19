import React from "react";

const CasinoBackground: React.FC = () => {
  // Array of floating elements (coins, chips, sparkles)
  const elements = [
    { left: "10%", top: "20%", size: 32, delay: "0s", emoji: "🪙" },
    { left: "80%", top: "30%", size: 40, delay: "1s", emoji: "💎" },
    { left: "25%", top: "70%", size: 28, delay: "2s", emoji: "🟡" },
    { left: "60%", top: "80%", size: 36, delay: "0.5s", emoji: "🟣" },
    { left: "50%", top: "10%", size: 24, delay: "1.5s", emoji: "✨" },
    { left: "70%", top: "60%", size: 30, delay: "2.5s", emoji: "🪙" },
    { left: "15%", top: "50%", size: 22, delay: "0.8s", emoji: "💎" },
    { left: "40%", top: "40%", size: 26, delay: "1.2s", emoji: "✨" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0 select-none">
      {elements.map((el, i) => (
        <span
          key={i}
          className="absolute opacity-60 animate-casino-float"
          style={{
            left: el.left,
            top: el.top,
            fontSize: el.size,
            animationDelay: el.delay,
            filter: "blur(0.5px) drop-shadow(0 0 8px #facc15)", // subtle glow
          }}
        >
          {el.emoji}
        </span>
      ))}
      <style>{`
        @keyframes casino-float {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-24px) scale(1.1) rotate(8deg); opacity: 1; }
          100% { transform: translateY(0) scale(1) rotate(-8deg); opacity: 0.7; }
        }
        .animate-casino-float {
          animation: casino-float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CasinoBackground;
