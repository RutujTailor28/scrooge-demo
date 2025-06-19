import React from "react";
import CountdownTimer from "./CountdownTimer";
import SwipeToClaimButton from "./SwipeToClaimButton";
import AnimatedCounter from "./AnimatedCounter";
import { Vault, Coins, TrendingUp } from "lucide-react";
import SparkleBurst from "./SparkleBurst";

interface VaultCardProps {
  balance: number;
  timeRemaining: number;
  canClaim: boolean;
  onClaim: () => void;
  isBalanceUpdating?: boolean;
}

const VaultCard: React.FC<VaultCardProps> = ({
  balance,
  timeRemaining,
  canClaim,
  onClaim,
  isBalanceUpdating = false,
}) => {
  return (
    <div className="relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse"></div>

      {/* Extra glow when balance is updating */}
      {isBalanceUpdating && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-yellow-400/30 rounded-2xl blur-2xl animate-ping"></div>
      )}

      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl border border-yellow-500/30 shadow-2xl overflow-hidden">
        {/* Header with gradient overlay */}
        <div className="relative bg-gradient-to-r from-yellow-500/20 to-purple-600/20 p-6 border-b border-yellow-500/20">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Vault className="w-8 h-8 text-yellow-400" />
              <div className="absolute inset-0 animate-ping">
                <Vault className="w-8 h-8 text-yellow-400/50" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              Premium Vault
            </h2>
          </div>
        </div>

        {/* Balance section */}
        <div className="p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coins className="w-6 h-6 text-yellow-400" />
            <span className="text-lg text-purple-300">Current Balance</span>
            {isBalanceUpdating && (
              <TrendingUp className="w-5 h-5 text-green-400 animate-bounce" />
            )}
          </div>

          <div className="relative inline-block">
            {/* Balance display with animation */}
            <div
              className={`text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mb-8 transition-all duration-300 ${
                isBalanceUpdating ? "scale-110 drop-shadow-lg" : ""
              }`}
            >
              <AnimatedCounter value={balance} duration={1500} /> ST
            </div>

            {/* Animated background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-yellow-500/20 rounded-lg blur-md transition-all duration-300 ${
                isBalanceUpdating ? "scale-110 opacity-100" : "opacity-50"
              }`}
            ></div>

            {/* Money rain effect when updating */}
            {isBalanceUpdating && (
              <>
                <div className="absolute -top-4 left-1/4 text-green-400 text-xl animate-bounce">
                  💰
                </div>
                <div className="absolute -top-6 right-1/4 text-yellow-400 text-lg animate-bounce delay-100">
                  💎
                </div>
                <div className="absolute -top-2 left-1/3 text-green-300 text-sm animate-bounce delay-200">
                  ✨
                </div>
                <div className="absolute -top-8 right-1/3 text-yellow-300 text-sm animate-bounce delay-300">
                  🎉
                </div>
              </>
            )}
          </div>

          {/* Floating +amount indicator */}
          {isBalanceUpdating && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-float-up">
                +{(Math.floor(Math.random() * 200) + 150).toFixed(2)} ST
              </div>
            </div>
          )}

          {/* Timer section */}
          <div className="mb-8">
            <CountdownTimer timeRemaining={timeRemaining} />
          </div>

          {/* Swipe to Claim button */}
          <SwipeToClaimButton canClaim={canClaim} onClaim={onClaim} />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-lg"></div>

        {/* Animated particles when balance updates */}
        {isBalanceUpdating && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping delay-100"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-200"></div>
            <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-300"></div>
          </>
        )}

        {isBalanceUpdating && <SparkleBurst />}
      </div>
    </div>
  );
};

export default VaultCard;
