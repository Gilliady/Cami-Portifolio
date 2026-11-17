const fs = require('fs');
const path = require('path');

const uploadsPath = path.join(__dirname, 'public', 'uploads');
const tmpPath = path.join(__dirname, '.tmp');

fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.mkdirSync(tmpPath, { recursive: true });

// On Hostinger Node.js hosting, each deploy runs in .../hbuilds/versions/<uuid>/nodejs.
// Symlink public/uploads to a persistent sibling folder outside hbuilds so uploads survive deploys.
const hbuildsIdx = __dirname.indexOf(`${path.sep}hbuilds${path.sep}`);
const persistentUploads =
  process.env.STRAPI_UPLOADS_DIR ||
  (hbuildsIdx !== -1 ? path.join(__dirname.slice(0, hbuildsIdx), 'strapi-uploads') : null);

if (persistentUploads) {
  fs.mkdirSync(persistentUploads, { recursive: true });
  try {
    const stat = fs.lstatSync(uploadsPath);
    if (!stat.isSymbolicLink()) {
      fs.rmSync(uploadsPath, { recursive: true, force: true });
      fs.symlinkSync(persistentUploads, uploadsPath, 'dir');
    }
  } catch {
    fs.symlinkSync(persistentUploads, uploadsPath, 'dir');
  }
} else {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const strapi = require('@strapi/strapi');

strapi.createStrapi({ distDir: './dist' }).start();
