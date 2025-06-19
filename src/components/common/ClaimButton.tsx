import React from "react";
import { Gift, Lock } from "lucide-react";
import SparkleBurst from "./SparkleBurst";

interface ClaimButtonProps {
  canClaim: boolean;
  onClaim: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ canClaim, onClaim }) => {
  const [showSparkle, setShowSparkle] = React.useState(false);
  const prevCanClaim = React.useRef(canClaim);
  React.useEffect(() => {
    if (prevCanClaim.current && !canClaim) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
    }
    prevCanClaim.current = canClaim;
  }, [canClaim]);

  return (
    <div className="relative">
      {canClaim && (
        <>
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-lg animate-pulse opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-full blur-xl animate-ping opacity-50"></div>
        </>
      )}
      {showSparkle && <SparkleBurst />}
      <button
        onClick={onClaim}
        disabled={!canClaim}
        className={`relative w-full md:w-auto px-16 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl border-2 border-yellow-400 select-none touch-pan-y
          ${
            canClaim
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-900 shadow-yellow-400/40 hover:shadow-xl transform hover:scale-105 active:scale-95 animate-shimmer"
              : "bg-gradient-to-r from-slate-600 to-slate-700 text-slate-400 cursor-not-allowed"
          }
        `}
      >
        <div className="flex items-center justify-center space-x-3">
          {canClaim ? (
            <>
              <Gift className="w-7 h-7" />
              <span>Claim Reward</span>
            </>
          ) : (
            <>
              <Lock className="w-7 h-7" />
              <span>Claim Locked</span>
            </>
          )}
        </div>
        {canClaim && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full animate-shimmer"></div>
        )}
      </button>
    </div>
  );
};

export default ClaimButton;
