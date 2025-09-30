import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const seedData = {
  createdAt: new Date().toISOString(),
  analyses: []
};

writeFileSync(join(process.cwd(), 'fixtures', 'seed.json'), JSON.stringify(seedData, null, 2));
console.log('Seed file created at fixtures/seed.json');
