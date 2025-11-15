"use client";

import { useWallet, useWalletList } from "@meshsdk/react";
import { useState, useEffect } from "react";

interface ConnectWalletProps {
  onConnect: () => void;
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const { connected, connect } = useWallet();
  const wallets = useWalletList();
  const [showWallets, setShowWallets] = useState(false);

  // Move to next screen when connected - RUNS AFTER RENDER
  useEffect(() => {
    if (connected) {
      console.log("✅ Wallet connected!");
      onConnect();
    }
  }, [connected, onConnect]);

  // Handle wallet selection
  const handleWalletClick = async (walletName: string) => {
    try {
      console.log("🔌 Connecting to:", walletName);
      await connect(walletName);
    } catch (error) {
      console.error("❌ Connection failed:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Connect Your Wallet
      </h2>
      
      <p className="text-gray-400 mb-8 leading-relaxed">
        Connect your Cardano wallet to confirm {`you're`} human and upload your song.
      </p>

      {!showWallets ? (
        // Main connect button
        <button
          onClick={() => setShowWallets(true)}
          className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-pink-500/50"
        >
          Connect Wallet
        </button>
      ) : (
        // Wallet list
        <div className="space-y-3">
          <p className="text-gray-300 text-sm mb-4">
            {wallets.length > 0 
              ? "Choose a wallet:" 
              : "No wallets detected. Please install Lace, Nami, or another Cardano wallet."}
          </p>
          
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletClick(wallet.name)}
              className="w-full flex items-center gap-4 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all cursor-pointer"
            >
              <img 
                src={wallet.icon} 
                alt={wallet.name} 
                className="w-8 h-8"
              />
              <span className="text-white font-medium capitalize">
                {wallet.name}
              </span>
            </button>
          ))}
          
          <button
            onClick={() => setShowWallets(false)}
            className="w-full text-gray-400 hover:text-white text-sm mt-4 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}