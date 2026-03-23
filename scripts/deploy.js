const fs = require('fs');
const path = require('path');

const MOD_NAME = 'afnm-tu-tien-mod';
const MODS_FOLDER = 'G:\\SteamLibrary\\steamapps\\common\\Ascend From Nine Mountains\\mods';

const buildsDir = path.join(__dirname, '..', 'builds');
const files = fs.readdirSync(buildsDir).filter(f => f.endsWith('.zip'));

if (files.length === 0) {
  console.error('❌ No ZIP found in builds/. Run npm run build first.');
  process.exit(1);
}

if (!fs.existsSync(MODS_FOLDER)) {
  console.error(`❌ Mods folder not found: ${MODS_FOLDER}`);
  process.exit(1);
}

// Delete any old versions of this mod from the mods folder
const oldFiles = fs.readdirSync(MODS_FOLDER).filter(f => f.startsWith(MOD_NAME) && f.endsWith('.zip'));
for (const old of oldFiles) {
  fs.unlinkSync(path.join(MODS_FOLDER, old));
  console.log(`🗑️  Removed old version: ${old}`);
}

// Deploy the latest ZIP
const latest = files.sort().at(-1);
const src = path.join(buildsDir, latest);
const dest = path.join(MODS_FOLDER, latest);

fs.copyFileSync(src, dest);
console.log(`✅ Deployed: ${latest} → ${MODS_FOLDER}`);