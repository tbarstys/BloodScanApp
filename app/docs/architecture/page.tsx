export const dynamic = 'force-static';

import { readFileSync } from 'node:fs';
import path from 'node:path';

export default function ArchitectureDoc() {
  const content = readFileSync(path.join(process.cwd(), 'docs/architecture.md'), 'utf8');
  return (
    <main className="mx-auto max-w-2xl p-6 text-sm leading-relaxed text-slate-800">
      <article>
        <pre className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">{content}</pre>
      </article>
    </main>
  );
}
