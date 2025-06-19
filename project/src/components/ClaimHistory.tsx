import React from 'react';
import { History, TrendingUp } from 'lucide-react';

interface ClaimLog {
  id: number;
  amount: number;
  timestamp: Date;
}

interface ClaimHistoryProps {
  logs: ClaimLog[];
}

const ClaimHistory: React.FC<ClaimHistoryProps> = ({ logs }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours}h ago`;
    }
  };

  const totalClaimed = logs.reduce((sum, log) => sum + log.amount, 0);

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-slate-700/20 p-6 border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <History className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Recent Claims</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-purple-300">
            <TrendingUp className="w-4 h-4" />
            <span>Total: {totalClaimed.toFixed(2)} ST</span>
          </div>
        </div>
      </div>

      {/* Claims list */}
      <div className="p-6">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No claims yet. Start claiming to build your history!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log, index) => (
              <div
                key={log.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border-yellow-500/30 shadow-lg'
                    : 'bg-slate-700/30 border-slate-600/30 hover:border-purple-500/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-yellow-400 animate-pulse' : 'bg-purple-400'
                  }`}></div>
                  <div>
                    <div className={`font-bold ${
                      index === 0 ? 'text-yellow-300' : 'text-white'
                    }`}>
                      +{log.amount.toFixed(2)} ST
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatTime(log.timestamp)}
                    </div>
                  </div>
                </div>
                
                {index === 0 && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                    LATEST
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;