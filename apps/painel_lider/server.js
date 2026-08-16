#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

console.log('\n================================================================================');
console.log('   🎉 ABBA VIRTUOSA - Iniciando Aplicativo');
console.log('================================================================================\n');

// Abre o navegador automaticamente
function openBrowser() {
  const url = 'http://localhost:3000';
  console.log(`🚀 Abrindo em: ${url}\n`);

  const start = (process.platform === 'darwin' ? 'open' :
                  process.platform === 'win32' ? 'start' :
                  'xdg-open');

  require('child_process').exec(start + ' ' + url);
}

// Inicia o servidor
console.log('⏳ Iniciando servidor...\n');

const server = spawn('npm', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Abre o navegador após 3 segundos
setTimeout(openBrowser, 3000);

server.on('error', (err) => {
  console.error('❌ Erro ao iniciar:', err.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n\n✅ Aplicativo encerrado');
  process.exit(0);
});
