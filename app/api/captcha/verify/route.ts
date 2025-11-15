import { NextResponse } from "next/server";
import { puzzleSolutions } from "../storage";

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { token, x } = body;

    // Debug logs
    console.log('🔍 Verifying token:', token);
    console.log('📍 User position x:', x);
    console.log('📦 Storage size:', puzzleSolutions.size);
    console.log('📦 Storage contents:', Array.from(puzzleSolutions.keys()));

    // Validate input
    if (!token || typeof x !== "number") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request - token and x position required",
        },
        {
          status: 400,
        }
      );
    }

    // Look up the solution for this token
    const solution = puzzleSolutions.get(token);
    console.log('✅ Found solution:', solution);

    if (!solution) {
      return NextResponse.json(
        {
          success: false,
          message: "Token not found or expired",
        },
        {
          status: 404,
        }
      );
    }

    // Check if solution is expired (5 minutes)
    const age = Date.now() - solution.timestamp;
    if (age > 5 * 60 * 1000) {
      puzzleSolutions.delete(token);
      return NextResponse.json(
        {
          success: false,
          message: "Puzzle expired",
        },
        {
          status: 410,
        }
      );
    }

    // Verify position with tolerance
    const TOLERANCE = 5;
    const isCorrect = Math.abs(x - solution.x) <= TOLERANCE;

    console.log('🎯 Correct X:', solution.x);
    console.log('👤 User X:', x);
    console.log('📏 Difference:', Math.abs(x - solution.x));
    console.log('✅ Is correct?', isCorrect);

    // Delete token (one-time use)
    puzzleSolutions.delete(token);

    // Return result
    if (isCorrect) {
      return NextResponse.json({
        success: true,
        message: "Verification successful",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect position",
      });
    }
  } catch (error) {
    console.error("❌ Verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}