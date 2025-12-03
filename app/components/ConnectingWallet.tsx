'use client'

import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function ConnectingWallet() {
  const { wallet } = useWallet();
  const [address, setAddress] = useState<string>("");

  // Fetch wallet address when available
  useEffect(() => {
    if (wallet) {
      wallet.getUsedAddresses().then((addresses) => {
        if (addresses.length > 0) {
          setAddress(addresses[0]);
        }
      }).catch((error) => {
        console.error("Error getting address:", error);
      });
    }
  }, [wallet]);

  return (
    <div className="text-center py-8">
      {/* Spinner */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-lg">
        Connecting To Your Wallet...
      </p>

      {/* Address Display (only shows if address is loaded) */}
      {address && (
        <div className="mt-6 bg-gray-800 rounded-lg p-3 max-w-sm mx-auto">
          <p className="text-xs mb-1">Connected Address:</p>
          <p className="font-mono text-xs break-all">
            {address.slice(0, 20)}...{address.slice(-20)}
          </p>
        </div>
      )}
    </div>
  );
}