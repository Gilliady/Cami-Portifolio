const fs = require('fs');
const path = require('path');

// Ensure upload and SQLite temp directories exist on ephemeral/clean deploys
fs.mkdirSync(path.join(__dirname, 'public', 'uploads'), { recursive: true });
fs.mkdirSync(path.join(__dirname, '.tmp'), { recursive: true });

const strapi = require('@strapi/strapi');

strapi.createStrapi({ distDir: './dist' }).start();
