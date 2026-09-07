import sharp from 'sharp';

async function generateFavicons() {
  // Generate 32x32 and 16x16 PNGs
  await sharp('public/logo-mark.png')
    .resize(32, 32, { fit: 'contain' })
    .png()
    .toFile('public/favicon-32x32.png');

  await sharp('public/logo-mark.png')
    .resize(16, 16, { fit: 'contain' })
    .png()
    .toFile('public/favicon-16x16.png');

  await sharp('public/logo-mark.png')
    .resize(192, 192, { fit: 'contain' })
    .png()
    .toFile('public/favicon-192.png');

  // Copy as default favicon.png and favicon.ico
  await sharp('public/logo-mark.png')
    .resize(48, 48, { fit: 'contain' })
    .png()
    .toFile('public/favicon.png');

  await sharp('public/logo-mark.png')
    .resize(32, 32, { fit: 'contain' })
    .toFile('public/favicon.ico');

  console.log('All favicons successfully generated from logo-mark.png!');
}

generateFavicons().catch(console.error);
