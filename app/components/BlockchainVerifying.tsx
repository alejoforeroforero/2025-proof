'use client'

export default function BlockchainVerifying() {
  return (
    <div className="text-center py-8">
      {/* Spinner */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-gray-400 text-lg">
        Securely Verifying On The Blockchain...
      </p>
    </div>
  )
}
