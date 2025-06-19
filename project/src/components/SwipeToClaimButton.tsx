import React, { useState, useRef, useEffect } from "react";
import { Gift, Lock, ChevronRight } from "lucide-react";
import SparkleBurst from "./SparkleBurst";

interface SwipeToClaimButtonProps {
  canClaim: boolean;
  onClaim: () => void;
}

const SwipeToClaimButton: React.FC<SwipeToClaimButtonProps> = ({
  canClaim,
  onClaim,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStart = (clientX: number) => {
    if (!canClaim || isCompleted) return;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !buttonRef.current || !canClaim) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const sliderWidth = sliderRef.current?.offsetWidth || 60;
    const maxPosition = buttonWidth - sliderWidth;
    const newPosition = Math.max(
      0,
      Math.min(clientX - rect.left - sliderWidth / 2, maxPosition)
    );

    setDragPosition(newPosition);

    // Check if dragged far enough (80% of the way)
    if (newPosition >= maxPosition * 0.8) {
      setIsCompleted(true);
      setIsDragging(false);

      // Trigger claim after animation
      setTimeout(() => {
        onClaim();
        // Reset after claim
        setTimeout(() => {
          setIsCompleted(false);
          setDragPosition(0);
        }, 1000);
      }, 300);
    }
  };

  const handleEnd = () => {
    if (!isCompleted) {
      // Snap back if not completed
      setDragPosition(0);
    }
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const progressPercentage =
    buttonWidth > 0 ? (dragPosition / (buttonWidth - 60)) * 100 : 0;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow effects when claimable */}
      {canClaim && !isCompleted && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-lg animate-pulse opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-full blur-xl animate-ping opacity-50"></div>
        </>
      )}

      {/* Success glow when completed */}
      {isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-xl animate-pulse opacity-90"></div>
      )}

      {/* Main button container */}
      <div
        ref={buttonRef}
        className={`relative h-16 rounded-full border-2 overflow-hidden transition-all duration-300 ${
          canClaim
            ? "bg-gradient-to-r from-slate-700 to-slate-800 border-yellow-500/50"
            : "bg-gradient-to-r from-slate-600 to-slate-700 border-slate-500/30"
        } ${
          isCompleted
            ? "bg-gradient-to-r from-green-600 to-green-700 border-green-400"
            : ""
        }`}
      >
        {/* Progress background */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isCompleted
              ? "bg-gradient-to-r from-green-500 to-green-400"
              : canClaim
              ? "bg-gradient-to-r from-yellow-500/20 to-yellow-400/20"
              : "bg-gradient-to-r from-slate-500/20 to-slate-400/20"
          }`}
          style={{
            width: `${Math.max(progressPercentage, 0)}%`,
          }}
        />

        {/* Sliding element */}
        <div
          ref={sliderRef}
          className={`absolute top-1 left-1 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging ? "scale-110" : "scale-100"
          } ${
            isCompleted
              ? "bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/50"
              : canClaim
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/50"
              : "bg-gradient-to-r from-slate-500 to-slate-600 shadow-lg"
          }`}
          style={{
            transform: `translateX(${dragPosition}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {isCompleted ? (
            <Gift className="w-6 h-6 text-white animate-bounce" />
          ) : canClaim ? (
            <ChevronRight
              className={`w-6 h-6 text-slate-900 ${
                isDragging ? "animate-pulse" : ""
              }`}
            />
          ) : (
            <Lock className="w-6 h-6 text-slate-400" />
          )}
        </div>

        {/* Text content */}
        <div className="flex items-center justify-center h-full">
          <span
            className={`font-bold text-lg transition-all duration-300 ${
              isCompleted
                ? "text-white"
                : canClaim
                ? "text-yellow-300"
                : "text-slate-400"
            }`}
            style={{
              opacity: progressPercentage > 50 ? 0.3 : 1,
            }}
          >
            {isCompleted
              ? "Claimed! 🎉"
              : canClaim
              ? "Swipe to Claim Reward"
              : "Claim Locked"}
          </span>
        </div>

        {/* Animated chevrons */}
        {canClaim && !isCompleted && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <ChevronRight className="w-4 h-4 text-yellow-400/60 animate-pulse" />
            <ChevronRight className="w-4 h-4 text-yellow-400/40 animate-pulse delay-100" />
            <ChevronRight className="w-4 h-4 text-yellow-400/20 animate-pulse delay-200" />
          </div>
        )}

        {/* Shimmer effect */}
        {canClaim && !isCompleted && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        )}
      </div>

      {/* Instruction text */}
      <div className="text-center mt-3">
        <p
          className={`text-sm transition-colors duration-300 ${
            canClaim ? "text-purple-300" : "text-slate-500"
          }`}
        >
          {canClaim
            ? "Drag the slider to unlock your reward"
            : "Wait for the timer to complete"}
        </p>
      </div>

      {isCompleted && <SparkleBurst />}
    </div>
  );
};

export default SwipeToClaimButton;
