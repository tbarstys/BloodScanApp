import { promises as fs } from "node:fs";
import path from "node:path";

async function seed() {
  const seedDir = path.join(process.cwd(), "fixtures", "demo");
  await fs.mkdir(seedDir, { recursive: true });
  await fs.writeFile(
    path.join(seedDir, "README.txt"),
    "Demo fixtures are copied here during the seed step."
  );
  console.info("Seed data prepared at", seedDir);
}

seed().catch((error) => {
  console.error("Failed to seed demo data", error);
  process.exitCode = 1;
});
