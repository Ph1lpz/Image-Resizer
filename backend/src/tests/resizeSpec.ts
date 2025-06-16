import { handleResize } from "../controllers/ResizeController";
import { join } from "path";
import { existsSync,mkdirSync,rmSync } from "fs";
import sharp from "sharp";



describe('Image processing ', () => {
  const testDir = join(__dirname, 'test-temp');
  const inputPath = join(testDir, 'input.png');
  const outputPath = join(testDir, 'output.png');

  beforeAll(async () => {
    if (!existsSync(testDir)) mkdirSync(testDir);
    
    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 1 }
      }
    }).toFile(inputPath);
  });

  afterAll(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true });
  });

  it('should resize an image to specified dimensions', async () => {
    await handleResize(50, 50, inputPath, outputPath);
    
    const metadata = await sharp(outputPath).metadata();
    expect(metadata.width).toBe(50);
    expect(metadata.height).toBe(50);
  });

  it('should reject when input file doesnt exist', async () => {
    await expectAsync(
      handleResize(50, 50, 'nonexistent.jpg', outputPath)
    ).toBeRejected();
  });
});