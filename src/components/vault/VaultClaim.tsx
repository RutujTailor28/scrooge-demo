import React, { useState, useEffect } from "react";
import VaultCard from "./VaultCard";
import ClaimHistory from "./ClaimHistory";

// Mock data
const mockBalance = 15420.5;
const mockClaimLogs = [
  { id: 1, amount: 250.0, timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 2, amount: 180.75, timestamp: new Date(Date.now() - 1000 * 60 * 45) },
  { id: 3, amount: 320.25, timestamp: new Date(Date.now() - 1000 * 60 * 90) },
  { id: 4, amount: 195.5, timestamp: new Date(Date.now() - 1000 * 60 * 120) },
  { id: 5, amount: 275.0, timestamp: new Date(Date.now() - 1000 * 60 * 180) },
];

const VaultClaim: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [canClaim, setCanClaim] = useState(false);
  const [claimLogs, setClaimLogs] = useState(mockClaimLogs);
  const [balance, setBalance] = useState(mockBalance);
  const [isBalanceUpdating, setIsBalanceUpdating] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClaim(true);
    }
  }, [timeRemaining]);

  const handleClaim = () => {
    if (!canClaim) return;

    // Start balance update animation
    setIsBalanceUpdating(true);

    // Generate random claim amount between 150-350
    const claimAmount = Math.floor(Math.random() * 200) + 150;

    // Add some delay for dramatic effect
    setTimeout(() => {
      const newBalance = balance + claimAmount;

      const newLog = {
        id: Date.now(),
        amount: claimAmount,
        timestamp: new Date(),
      };

      setBalance(newBalance);
      setClaimLogs([newLog, ...claimLogs.slice(0, 4)]);
      setTimeRemaining(60);
      setCanClaim(false);

      // Stop animation after balance updates
      setTimeout(() => {
        setIsBalanceUpdating(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <VaultCard
        balance={balance}
        timeRemaining={timeRemaining}
        canClaim={canClaim}
        onClaim={handleClaim}
        isBalanceUpdating={isBalanceUpdating}
      />
      <ClaimHistory logs={claimLogs} />
    </div>
  );
};

export default VaultClaim;
