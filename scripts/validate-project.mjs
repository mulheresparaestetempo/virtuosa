import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const required = [
  'app-filha/package.json',
  'app-filha/src/firebase.ts',
  'app-filha/src/context/AuthContext.tsx',
  'apps/painel_lider/package.json',
  'apps/painel_lider/lib/firebase.ts',
  'apps/painel_lider/app/page.tsx',
  'firestore.rules',
];

const missing = required.filter((file) => !existsSync(resolve(root, file)));
if (missing.length) {
  console.error('Arquivos obrigatórios ausentes:', missing.join(', '));
  process.exit(1);
}

const rules = readFileSync(resolve(root, 'firestore.rules'), 'utf8');
for (const marker of ["papel == 'lider'", 'discipuladoraId', 'allow delete: if false']) {
  if (!rules.includes(marker)) {
    console.error(`Regra obrigatória ausente: ${marker}`);
    process.exit(1);
  }
}

console.log('Validação estrutural do projeto: OK');
