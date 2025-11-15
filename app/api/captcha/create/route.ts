import { NextResponse } from "next/server";
import { puzzleSolutions } from "../storage";
import { generatePuzzle } from "../generator";

export async function GET() {
  try {
    // Generate puzzle with real images
    const puzzle = await generatePuzzle();
    
    // Create unique token
    const token = crypto.randomUUID();
    
    // Store the correct position
    puzzleSolutions.set(token, {
      x: puzzle.correctX,
      timestamp: Date.now(),
    });
    
    console.log('✅ Puzzle created. Token:', token, 'Correct X:', puzzle.correctX);
    
    return NextResponse.json({
      bgUrl: puzzle.bgUrl,
      puzzleUrl: puzzle.puzzleUrl,
      token: token,
    });
    
  } catch (error) {
    console.error("❌ Error creating puzzle:", error);
    return NextResponse.json(
      { error: "Failed to create puzzle" },
      { status: 500 }
    );
  }
}
