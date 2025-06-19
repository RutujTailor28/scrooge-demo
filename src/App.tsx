import React from "react";
import VaultClaim from "./components/vault/VaultClaim";
import CasinoBackground from "./components/effects/CasinoBackground";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      <CasinoBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-2">
            SCROOGE
          </h1>
          <p className="text-purple-300 text-lg">Premium Vault System</p>
        </div>
        <VaultClaim />
      </div>
    </div>
  );
}

export default App;
