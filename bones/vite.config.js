import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'file-saver',
      configureServer(server) {
        // Serve data files directly from project root
        server.middlewares.use((req, res, next) => {
          const dataFiles = ['/data/areas.json', '/data/muscles.json'];
          if (dataFiles.includes(req.url)) {
            const filepath = path.resolve(process.cwd(), 'data', path.basename(req.url));
            if (fs.existsSync(filepath)) {
              res.setHeader('Content-Type', 'application/json');
              res.end(fs.readFileSync(filepath, 'utf-8'));
              return;
            }
          }
          next();
        });

        server.middlewares.use('/save', (req, res) => {
          if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const { filename, content } = JSON.parse(body);
              const safe = path.basename(filename);
              const dataDir = path.resolve(process.cwd(), 'data');
              if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
              fs.writeFileSync(path.join(dataDir, safe), content, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e.message }));
            }
          });
        });
      },
    },
  ],
});
