const urls = [
  '/',
  '/download-tools',
  '/youtube-video-downloader',
  '/youtube-shorts-downloader',
  '/youtube-to-mp3',
  '/youtube-to-mp4',
  '/instagram-reels-downloader',
  '/instagram-video-downloader',
  '/video-downloader',
  '/video-to-mp3',
  '/video-converter',
  '/audio-converter',
  '/mp4-to-mov',
  '/mov-to-mp4',
  '/sitemap.xml',
  '/robots.txt',
];

async function check() {
  let passed = 0;
  for (const u of urls) {
    try {
      const res = await fetch('http://localhost:4173' + u);
      const text = await res.text();
      const hasContent = text.includes('<h1') || text.includes('<?xml') || text.includes('User-agent');
      const titleMatch = text.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'No title';
      console.log(`[${res.status}] ${u} -> ${title.slice(0, 50)}... (Size: ${text.length})`);
      if (res.status === 200 && hasContent) passed++;
    } catch (err) {
      console.error(`FAILED: ${u} - ${err.message}`);
    }
  }
  console.log(`\nResult: ${passed}/${urls.length} URLs verified successfully.`);
  if (passed === urls.length) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

check();
