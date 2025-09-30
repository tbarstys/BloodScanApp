import { writeFileSync } from 'fs';
import { join } from 'path';

const storageFile = join(process.cwd(), 'demo', 'seed-state.json');

const seed = {
  locale: 'en',
  units: 'si',
  consentCloudOcr: false
};

writeFileSync(storageFile, JSON.stringify(seed, null, 2));
console.log('Seed data written to', storageFile);
