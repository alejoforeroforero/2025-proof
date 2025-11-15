'use client'

import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

interface SuccessScreenProps {
  onUploadSong: () => void
}

export default function SuccessScreen({ onUploadSong }: SuccessScreenProps) {
  const { wallet, connected } = useWallet();
  const [address, setAddress] = useState<string>("");

  console.log('🔍 SuccessScreen - connected:', connected);
  console.log('🔍 SuccessScreen - wallet:', wallet);

  useEffect(() => {
  console.log('🔍 useEffect running...');
  if (wallet) {
    console.log('✅ Wallet exists, fetching address...');
    
    // Try multiple methods to get address
    wallet.getUsedAddresses()
      .then((addresses) => {
        console.log('📍 Used addresses:', addresses);
        if (addresses.length > 0) {
          setAddress(addresses[0]);
          console.log('✅ Address set from used:', addresses[0]);
        } else {
          // If no used addresses, try unused addresses
          console.log('⚠️ No used addresses, trying unused...');
          return wallet.getUnusedAddresses();
        }
      })
      .then((addresses) => {
        if (addresses && addresses.length > 0 && !address) {
          setAddress(addresses[0]);
          console.log('✅ Address set from unused:', addresses[0]);
        } else if (!address) {
          // Last resort: get change address
          console.log('⚠️ No unused addresses, trying change address...');
          return wallet.getChangeAddress();
        }
      })
      .then((changeAddr) => {
        if (changeAddr && !address) {
          setAddress(changeAddr);
          console.log('✅ Address set from change:', changeAddr);
        }
      })
      .catch((error) => {
        console.error("❌ Error getting address:", error);
      });
  } else {
    console.log('❌ No wallet found');
  }
}, [wallet]);

  console.log('🔍 Current address state:', address);

  return (
    <div className="text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
        <svg 
          className="w-10 h-10 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-4">
        {`You're`} Verified!
      </h2>

      {/* Description */}
      <p className="text-gray-400 mb-6 leading-relaxed">
        Verification complete! Welcome to the human side of music.
      </p>

      {/* Wallet Address Display */}
      {address ? (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-gray-500 text-xs mb-2">Verified Wallet:</p>
          <p className="text-gray-300 font-mono text-xs break-all">
            {address.slice(0, 20)}...{address.slice(-20)}
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-gray-500 text-xs">Loading wallet address...</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUploadSong}
        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-pink-500/50"
      >
        Upload Song Now
      </button>
    </div>
  )
}