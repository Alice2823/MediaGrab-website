import sharp from 'sharp';

async function processLogo() {
  const { data, info } = await sharp('public/logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width, minY = height, maxX = 0, maxY = 0;

  // Scan only the top 60% of the image to completely avoid the "MediaGrab" text
  const searchHeight = Math.floor(height * 0.60);

  for (let y = 0; y < searchHeight; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // If pixel is not black (luminance > 20)
      if (r > 20 || g > 20 || b > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Detected Symbol Bounding Box: left=${minX}, top=${minY}, right=${maxX}, bottom=${maxY}`);
  const symbolWidth = maxX - minX;
  const symbolHeight = maxY - minY;
  console.log(`Symbol size: ${symbolWidth} x ${symbolHeight}`);

  // Add clean padding around the symbol
  const padding = 24;
  const cropLeft = Math.max(0, minX - padding);
  const cropTop = Math.max(0, minY - padding);
  const cropWidth = Math.min(width - cropLeft, symbolWidth + padding * 2);
  const cropHeight = Math.min(height - cropTop, symbolHeight + padding * 2);

  // Make it square for perfect presentation
  const maxDim = Math.max(cropWidth, cropHeight);
  
  await sharp('public/logo.png')
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropWidth,
      height: cropHeight
    })
    .resize(maxDim, maxDim, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    })
    .png({ quality: 100 })
    .toFile('public/logo-mark.png');

  console.log(`Saved public/logo-mark.png (${maxDim}x${maxDim}) - 100% text-free, pure icon!`);
}

processLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
