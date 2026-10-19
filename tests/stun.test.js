const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const apoloDir = path.resolve(__dirname, '..');

function ler(nomeArquivo) {
  return fs.readFileSync(path.join(apoloDir, nomeArquivo), 'utf8');
}

const networkJs = ler('network.js');
const gameJs = ler('game.js');

const STUN_GOOGLE_1 = "stun:stun.l.google.com:19302";
const STUN_GOOGLE_2 = "stun:stun1.l.google.com:19302";

test('network.js contem iceServers com os dois STUN publicos do Google', () => {
  assert.ok(networkJs.includes(STUN_GOOGLE_1), 'network.js falta STUN 1');
  assert.ok(networkJs.includes(STUN_GOOGLE_2), 'network.js falta STUN 2');
  assert.ok(networkJs.includes('iceServers'), 'network.js nao declara iceServers');
});

test('game.js contem iceServers com os dois STUN publicos do Google', () => {
  assert.ok(gameJs.includes(STUN_GOOGLE_1), 'game.js falta STUN 1');
  assert.ok(gameJs.includes(STUN_GOOGLE_2), 'game.js falta STUN 2');
  assert.ok(gameJs.includes('iceServers'), 'game.js nao declara iceServers');
});

test('nenhum arquivo contem placeholders de credenciais Xirsys', () => {
  for (const nome of ['network.js', 'game.js']) {
    const conteudo = ler(nome);
    assert.ok(!conteudo.includes('SEU_CONTA'), `${nome} ainda tem placeholder SEU_CONTA`);
    assert.ok(!conteudo.includes('SEU_USERNAME_XIRSYS'), `${nome} ainda tem placeholder SEU_USERNAME_XIRSYS`);
    assert.ok(!conteudo.includes('SUA_CREDENTIAL_XIRSYS'), `${nome} ainda tem placeholder SUA_CREDENTIAL_XIRSYS`);
  }
});
