// Use globalThis to persist across hot reloads in development
const globalForPuzzles = globalThis as unknown as {
  puzzleSolutions: Map<string, { x: number; timestamp: number }> | undefined;
  cleanupInterval: NodeJS.Timeout | undefined;
};

// Create or reuse the existing Map
export const puzzleSolutions =
  globalForPuzzles.puzzleSolutions ??
  new Map<string, { x: number; timestamp: number }>();

// Store in global for next hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForPuzzles.puzzleSolutions = puzzleSolutions;
}

console.log('🔷 Storage module loaded. Size:', puzzleSolutions.size);

// Setup cleanup interval (only once)
if (typeof window === 'undefined' && !globalForPuzzles.cleanupInterval) {
  console.log('🔷 Setting up cleanup interval');
  
  globalForPuzzles.cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [token, data] of puzzleSolutions.entries()) {
      if (now - data.timestamp > 5 * 60 * 1000) {
        puzzleSolutions.delete(token);
        console.log('🧹 Cleaned up expired token:', token);
      }
    }
  }, 60 * 1000);
}