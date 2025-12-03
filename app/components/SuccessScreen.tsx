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
    <div className="text-center pt-2">
      {/* Title */}
      <h2 className="text-[28px] font-semibold mb-6 leading-none">
        You&apos;re Verified!
      </h2>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      {/* Description */}
      <p className="mb-12 leading-none text-[14px] font-medium">
        Verification complete! Welcome to the human side of music.
      </p>

      {/* Wallet Address Display */}
      {/* {address ? (
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
      )} */}

      {/* Upload Button */}
      <button
        onClick={onUploadSong}
        className="btn-pink"
      >
        Close Verification Modal & Restart
      </button>
    </div>
  )
}