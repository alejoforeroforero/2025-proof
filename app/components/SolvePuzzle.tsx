"use client";

import { useState } from "react";
import SliderCaptcha, { VerifyParam } from "rc-slider-captcha";

interface SolvePuzzleProps {
  onSubmit: () => void;
}

export default function SolvePuzzle({ onSubmit }: SolvePuzzleProps) {
  const [token, setToken] = useState<string>("");

  const handleRequest = async () => {
    try {
      const response = await fetch("/api/captcha/create");
      const data = await response.json();

      console.log("get request token");

      setToken(data.token);

      return {
        bgUrl: data.bgUrl,
        puzzleUrl: data.puzzleUrl,
      };
    } catch (e) {
      console.log(e);
      return {
        bgUrl: "https://picsum.photos/320/160",
        puzzleUrl: "https://picsum.photos/60/160",
      };
    }
  };

  const handleVerify = async (data: VerifyParam) => {
    try {
      const response = await fetch("api/captcha/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          x: data.x,
        }),
      });

      const result = await response.json();

      console.log(result, data);

      if (result.success) {
        onSubmit();
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  };

  return (
    <div className="text-center pt-2">
      <h2 className="text-[28px] font-semibold mb-6 leading-none">
        Complete Verification
      </h2>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      <p className="mb-12 leading-none text-[14px] font-medium">
        Almost There! Please Solve the puzzle below to confirm you&apos;re human. <br></br>
Slide the puzzle piece to the right place.
      </p>
      <div className="flex justify-center items-center">
        <SliderCaptcha
          request={handleRequest}
          onVerify={handleVerify}
          tipText={{
            default: "Slide to complete the puzzle",
            loading: "Loading puzzle...",
            moving: "Keep sliding...",
            verifying: "Verifying...",
            success: "Verified successfully!",
            error: "Verification failed, try again",
            errors: "Please try again",
            loadFailed: "Failed to load puzzle, please refresh",
          }}
        />
      </div>
    </div>
  );
}
