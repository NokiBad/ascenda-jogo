const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const game = fs.readFileSync(path.join(root, 'game.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
test('single player offers three difficulty levels', () => {
  assert.match(html, /id="difficulty"/);
  for (const value of ['easy', 'normal', 'hard']) assert.match(html, new RegExp(`value="${value}"`));
});
test('online sessions force standard rules and hide difficulty picker when joining by link', () => {
  assert.match(game, /gameMode='online';difficulty='normal'/);
  assert.match(game, /has\('sala'\)/);
});
test('business choices apply difficulty multipliers and persistent company metrics', () => {
  assert.match(game, /easy:\.65,normal:1,hard:1\.5/);
  assert.match(game, /ascenda-economy/);
  for (const metric of ['cash','reputation','team','quality']) assert.ok(game.includes(metric));
});
test('quizzes have been replaced with decision scenarios and consequences', () => {
  assert.match(game, /DECISÃO EMPRESARIAL/);
  assert.match(game, /CONSEQUÊNCIAS DA ESCOLHA/);
  assert.match(game, /Testar uma versão pequena, medir resultados e ajustar/);
});
