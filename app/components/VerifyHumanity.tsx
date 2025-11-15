"use client";

interface VerifyHumanityProps {
  onStart: () => void;
}

export default function VerifyHumanity({ onStart }: VerifyHumanityProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Verify Your Humanity
      </h2>
      <p className="text-grey-400 mb-8 leading-relax">
        To keep NFSW secure and fair for all artists, we need to confirm{" "}
        {`you're`}
        human. This takes just 30 seconds.
      </p>
      <button
        onClick={onStart}
        className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-pink-500/50"
      >
        Start Verification
      </button>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span className="w-4 h-4 border-2 border-gray-500 rounded-full flex items-center justify-center text-xs">
          ?
        </span>
        <span>Why do I need to verify?</span>
      </div>
    </div>
  );
}
