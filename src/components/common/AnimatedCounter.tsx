import React, { useState, useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true);
      const startValue = displayValue;
      const difference = value - startValue;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentValue = startValue + difference * easeOutQuart;
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, duration, displayValue]);

  return (
    <span
      className={
        `${className} money-counter transition-all duration-300 ` +
        (isAnimating
          ? "animate-pulse text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)] scale-110"
          : "")
      }
      style={isAnimating ? { filter: "drop-shadow(0 0 16px #fde047)" } : {}}
    >
      {displayValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

export default AnimatedCounter;
