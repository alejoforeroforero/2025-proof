'use client'

interface FailureScreenProps {
  onRetry: () => void
}

export default function FailureScreen({ onRetry }: FailureScreenProps) {
  return (
    <div className="text-center pt-2">
      {/* Title */}
      <h2 className="text-[28px] font-semibold mb-6 leading-none">
        Oops, {`Let's`} Try Again!
      </h2>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      {/* Description */}
      <p className="mb-12 leading-none text-[14px] font-medium">
        The verification was unsuccessful. Want to retry?
      </p>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="btn-pink"
      >
        Try Again
      </button>
    </div>
  )
}