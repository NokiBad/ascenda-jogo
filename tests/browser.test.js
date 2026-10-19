const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '..', 'index.html');

test('index.html existe e contem o titulo do ASCENDA', () => {
  assert.ok(fs.existsSync(indexPath), 'index.html nao encontrado');
  const html = fs.readFileSync(indexPath, 'utf8');
  assert.ok(html.includes('ASCENDA'), 'index.html nao menciona ASCENDA');
  assert.ok(html.includes('<canvas'), 'index.html nao tem canvas');
});

test('index.html referencias os arquivos JS do jogo', () => {
  const html = fs.readFileSync(indexPath, 'utf8');
  assert.ok(html.includes('game.js'), 'index.html nao referencia game.js');
  assert.ok(html.includes('network.js'), 'index.html nao referencia network.js');
});
