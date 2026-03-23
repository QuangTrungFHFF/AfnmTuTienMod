const fs = require('fs');
const path = require('path');

const MODS_FOLDER = 'G:\\SteamLibrary\\steamapps\\common\\Ascend From Nine Mountains\\mods';

const buildsDir = path.join(__dirname, '..', 'builds');
const files = fs.readdirSync(buildsDir).filter(f => f.endsWith('.zip'));

if (files.length === 0) {
  console.error('❌ No ZIP found in builds/. Run npm run build first.');
  process.exit(1);
}

// Pick the latest ZIP
const latest = files.sort().at(-1);
const src = path.join(buildsDir, latest);
const dest = path.join(MODS_FOLDER, latest);

if (!fs.existsSync(MODS_FOLDER)) {
  console.error(`❌ Mods folder not found: ${MODS_FOLDER}`);
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log(`✅ Deployed: ${latest} → ${MODS_FOLDER}`);