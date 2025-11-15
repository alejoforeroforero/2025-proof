import sharp from "sharp";
import path from "path";

export async function generatePuzzle() {
  try {
    const sourcePath = path.join(
      process.cwd(),
      "public",
      "captcha-sources",
      "image1.jpg"
    );
    const sourceBuffer = await sharp(sourcePath)
      .resize(320, 160, { fit: "cover" })
      .toBuffer();

    const imageWidth = 320;
    const imageHeight = 160;
    const pieceWidth = 60;
    const pieceHeight = imageHeight;

    const minX = 50;
    const maxX = imageWidth - pieceWidth - 50;
    const cutoutX = Math.floor(Math.random() * (maxX - minX)) + minX;

    console.log("🎯 Generating puzzle at position:", cutoutX);

    const puzzlePiece = await sharp(sourceBuffer)
      .extract({
        left: cutoutX,
        top: 0,
        width: pieceWidth,
        height: pieceHeight,
      })
      .toBuffer();

    const darkRectSVG = `
      <svg width="${pieceWidth}" height="${pieceHeight}">
        <rect width="${pieceWidth}" height="${pieceHeight}" fill="rgba(0, 0, 0, 0.6)"/>
      </svg>
    `;

    const darkRect = Buffer.from(darkRectSVG);

    // 6. Create background with darkened cutout
    const backgroundWithCutout = await sharp(sourceBuffer)
      .composite([
        {
          input: darkRect,
          left: cutoutX,
          top: 0,
          blend: "over",
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    // 7. Convert to base64
    const bgBase64 = `data:image/jpeg;base64,${backgroundWithCutout.toString(
      "base64"
    )}`;
    const pieceBase64 = `data:image/jpeg;base64,${puzzlePiece.toString(
      "base64"
    )}`;

    return {
      bgUrl: bgBase64,
      puzzleUrl: pieceBase64,
      correctX: cutoutX,
    };
  } catch (error) {
    throw error;
  }
}
