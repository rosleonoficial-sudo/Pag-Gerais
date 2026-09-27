import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function cacheImagePlugin(): Plugin {
  return {
    name: 'cache-image-plugin',
    configureServer(server) {
      server.middlewares.use('/api/cache-depoimentos', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const data = parsed.data;
              if (data && typeof data === 'string' && data.startsWith('data:image/')) {
                const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const targetDir = path.resolve(__dirname, 'public/images');
                if (!fs.existsSync(targetDir)) {
                  fs.mkdirSync(targetDir, { recursive: true });
                }
                fs.writeFileSync(path.join(targetDir, 'depoimentos.webp'), buffer);
                const distDir = path.resolve(__dirname, 'dist/images');
                if (fs.existsSync(distDir)) {
                  fs.writeFileSync(path.join(distDir, 'depoimentos.webp'), buffer);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                return;
              }
            } catch (err) {
              console.error('Error saving cached image:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'invalid payload' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cacheImagePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
