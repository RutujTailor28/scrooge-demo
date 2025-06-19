import React from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  timeRemaining: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-2 text-purple-300">
        <Clock className="w-5 h-5" />
        <span className="text-sm font-medium">Next Claim Available</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg px-4 py-3 border border-purple-500/30">
          <div className="text-2xl md:text-3xl font-mono font-bold text-white">
            {formatTime(minutes)}
          </div>
          <div className="text-xs text-purple-300 text-center">MIN</div>
        </div>
        
        <div className="text-2xl text-purple-400 animate-pulse">:</div>
        
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg px-4 py-3 border border-purple-500/30">
          <div className="text-2xl md:text-3xl font-mono font-bold text-white">
            {formatTime(seconds)}
          </div>
          <div className="text-xs text-purple-300 text-center">SEC</div>
        </div>
      </div>
      
      {timeRemaining <= 10 && timeRemaining > 0 && (
        <div className="text-yellow-400 text-sm font-medium animate-bounce">
          Almost ready to claim! 🎉
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;