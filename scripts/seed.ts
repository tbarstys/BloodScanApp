import { promises as fs } from 'fs';
import path from 'path';

const target = path.join(process.cwd(), 'fixtures', 'demo', 'readme.txt');

async function seed() {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(
    target,
    'Demo mode loads curated samples (cbc_1.pdf, lipids_img.jpg, cmp_photo.jpg, thyroid_panel.pdf).'
  );
  console.log('Seeded demo artifacts.');
}

void seed();
