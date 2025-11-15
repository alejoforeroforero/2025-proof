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
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Prove {`You're`} Human
      </h2>
      <p className="text-gray-400 mb-6 leading-relaxed text-sm">
        Slide the puzzle piece to complete the image
      </p>
      <SliderCaptcha
        request={handleRequest}
        onVerify={handleVerify}
        tipText={{
          default: "Slide to complete the puzzle",
          loading: "Loading...",
          moving: "Sliding...",
          error: "Try again",
          success: "Success!",
        }}
      />
    </div>
  );
}
