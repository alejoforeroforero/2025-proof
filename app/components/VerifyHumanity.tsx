"use client";

interface VerifyHumanityProps {
  onStart: () => void;
}

export default function VerifyHumanity({ onStart }: VerifyHumanityProps) {
  return (
    <div className="text-center pt-2">
      <h2 className="text-[28px] font-semibold mb-6 leading-none">
        Verify Your Humanity
      </h2>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      <p className="mb-12 leading-none text-[14px] font-medium">
        To keep the NEWM ecosystem secure and fair for all artists, we need to confirm you&apos;re human. <br></br>This takes just 30 seconds.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="btn-pink"
      >
        Start Verification
      </button>
      {/* <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span className="w-4 h-4 border-2 border-gray-500 rounded-full flex items-center justify-center text-xs">
          ?
        </span>
        <span>Why do I need to verify?</span>
      </div> */}
    </div>
  );
}
