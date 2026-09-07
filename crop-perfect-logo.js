import sharp from 'sharp';

async function createPerfectLogo() {
  // 1. Extract exact symbol region (X: 311 to 731, Y: 207 to 627) - completely excludes text starting at Y: 646
  const cropLeft = 311;
  const cropTop = 207;
  const cropWidth = 420;
  const cropHeight = 420;

  const { data, info } = await sharp('public/logo.png')
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const pixels = new Uint8Array(data);

  // Flood fill from outer borders to make outer black transparent
  // BFS queue
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Add all border pixels to queue
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
  }
  for (let y = 1; y < height - 1; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const idx = y * width + x;

    if (visited[idx]) continue;
    visited[idx] = 1;

    const pIdx = idx * 4;
    const r = pixels[pIdx];
    const g = pixels[pIdx + 1];
    const b = pixels[pIdx + 2];

    // Background threshold (near black)
    if (r < 16 && g < 16 && b < 16) {
      pixels[pIdx + 3] = 0; // Make transparent

      // Check neighbors
      if (x > 0 && !visited[idx - 1]) queue.push(x - 1, y);
      if (x < width - 1 && !visited[idx + 1]) queue.push(x + 1, y);
      if (y > 0 && !visited[idx - width]) queue.push(x, y - 1);
      if (y < height - 1 && !visited[idx + width]) queue.push(x, y + 1);
    }
  }

  // Save transparent PNG
  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/logo-mark.png');

  console.log('Successfully created transparent high-res public/logo-mark.png (420x420)');

  // Verify bottom has 0 visible pixels
  const finalBuffer = await sharp('public/logo-mark.png').raw().toBuffer({ resolveWithObject: true });
  let maxAlphaBottom = 0;
  for (let y = 390; y < 420; y++) {
    for (let x = 0; x < 420; x++) {
      const a = finalBuffer.data[(y * 420 + x) * 4 + 3];
      if (a > maxAlphaBottom) maxAlphaBottom = a;
    }
  }
  console.log('Bottom area max alpha (should be 0):', maxAlphaBottom);
}

createPerfectLogo().catch(console.error);
