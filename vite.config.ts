import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function cleanUrlsPlugin(): Plugin {
  return {
    name: 'clean-urls-preview',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && !req.url.includes('.')) {
          const cleanPath = req.url.split('?')[0].replace(/\/+$/, '');
          const htmlFile = path.resolve('dist', `${cleanPath.replace(/^\//, '')}.html`);
          const indexFile = path.resolve('dist', cleanPath.replace(/^\//, ''), 'index.html');

          if (fs.existsSync(htmlFile)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return fs.createReadStream(htmlFile).pipe(res);
          } else if (fs.existsSync(indexFile)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return fs.createReadStream(indexFile).pipe(res);
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cleanUrlsPlugin()],
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});

