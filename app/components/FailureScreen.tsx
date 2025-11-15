'use client'

interface FailureScreenProps {
  onRetry: () => void
}

export default function FailureScreen({ onRetry }: FailureScreenProps) {
  return (
    <div className="text-center">
      {/* Failure Icon */}
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-4">
        Oops, {`Let's`} Try Again!
      </h2>

      {/* Description */}
      <p className="text-gray-400 mb-8 leading-relaxed">
        The puzzle {`didn't`} work. Want to retry?
      </p>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-pink-500/50"
      >
        Try Again
      </button>
    </div>
  )
}