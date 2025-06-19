import React, { useEffect, useState } from "react";

const SPARKLES = 18;

const SparkleBurst: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-50">
      {Array.from({ length: SPARKLES }).map((_, i) => {
        const angle = (360 / SPARKLES) * i;
        const distance = 60 + Math.random() * 30;
        const style = {
          transform: `rotate(${angle}deg) translateY(-${distance}px)`,
        };
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-purple-400 shadow-lg animate-sparkle"
            style={style as React.CSSProperties}
          />
        );
      })}
      <style>{`
        @keyframes sparkle {
          0% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.5); }
        }
        .animate-sparkle {
          animation: sparkle 1.1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SparkleBurst;
