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
  const [hasCheckedInitialConnection, setHasCheckedInitialConnection] = useState(false);

  // Check if already connected on mount
  useEffect(() => {
    if (!hasCheckedInitialConnection) {
      setHasCheckedInitialConnection(true);
      if (connected) {
        console.log("✅ Wallet already connected!");
        onConnect();
      }
    }
  }, []);

  // Move to next screen when connected - RUNS AFTER RENDER
  useEffect(() => {
    if (connected && hasCheckedInitialConnection) {
      console.log("✅ Wallet connected!");
      onConnect();
    }
  }, [connected, onConnect, hasCheckedInitialConnection]);

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
    <div className="text-center pt-2">
      <h2 className="text-3xl font-bold mb-6">
        Connect Your Wallet
      </h2>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      <p className="mb-12 leading-relaxed text-base">
        Connect your Cardano wallet prior to verification.
      </p>

      {!showWallets ? (
        // Main connect button
        <button
          type="button"
          onClick={() => setShowWallets(true)}
          className="btn-pink"
        >
          Connect Wallet
        </button>
      ) : (
        // Wallet list
        <div className="space-y-3">
          <p className="text-sm mb-4">
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
            className="w-full text-gray-400 hover:text-white mt-4 transition-colors text-[14px]"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}