const test = require('node:test');
const assert = require('node:assert/strict');

// Lógica extraída de apolo/game.js para teste isolado (sem DOM/localStorage)
const STAKE_BY_NPC = {
  recepcao: 'cliente',
  rh: 'empregado',
  financeiro: 'acionista',
  comercial: 'cliente',
  soc: 'cliente',
  intel: 'sociedade',
  infra: 'fornecedor',
  grc: 'sociedade',
  appsec: 'fornecedor',
  cloud: 'fornecedor',
  red: 'fornecedor',
  direcao: 'sociedade'
};

const STAKES = ['acionista', 'empregado', 'cliente', 'fornecedor', 'sociedade'];

function newStakes() {
  return { acionista: 0, empregado: 0, cliente: 0, fornecedor: 0, sociedade: 0 };
}

function applyQuiz(stakes, npcSector) {
  const stake = STAKE_BY_NPC[npcSector];
  if (!stake) return stakes;
  const next = { ...stakes };
  next[stake] = Math.min(100, (next[stake] || 0) + 10);
  return next;
}

function canStartFinalMission(stakes, visitedCount) {
  const low = STAKES.filter(k => (stakes[k] || 0) < 70);
  return visitedCount >= 12 && low.length === 0;
}

function canFinish(stakes) {
  const low = STAKES.filter(k => (stakes[k] || 0) < 70);
  return low.length === 0 && (stakes.cliente || 0) >= 80;
}

test('STAKE_BY_NPC mapeia todos os 12 NPCs para um stakeholder valido', () => {
  const npcs = Object.keys(STAKE_BY_NPC);
  assert.equal(npcs.length, 12);
  for (const stake of Object.values(STAKE_BY_NPC)) {
    assert.ok(STAKES.includes(stake), `stake invalido: ${stake}`);
  }
});

test('applyQuiz aumenta o stakeholder correspondente em 10, limitado a 100', () => {
  let s = newStakes();
  s = applyQuiz(s, 'recepcao'); // cliente
  assert.equal(s.cliente, 10);
  s = applyQuiz(s, 'rh'); // empregado
  assert.equal(s.empregado, 10);
  for (let i = 0; i < 10; i++) s = applyQuiz(s, 'recepcao');
  assert.equal(s.cliente, 100);
});

test('canStartFinalMission exige 12 visitados e todas as stakes >= 70', () => {
  const full = { acionista: 70, empregado: 70, cliente: 70, fornecedor: 70, sociedade: 70 };
  assert.equal(canStartFinalMission(full, 12), true);
  assert.equal(canStartFinalMission(full, 11), false);

  const low = { ...full, acionista: 69 };
  assert.equal(canStartFinalMission(low, 12), false);
});

test('canFinish exige todas as stakes >= 70 E cliente >= 80', () => {
  const ok = { acionista: 70, empregado: 70, cliente: 80, fornecedor: 70, sociedade: 70 };
  assert.equal(canFinish(ok), true);

  const clienteBaixo = { ...ok, cliente: 79 };
  assert.equal(canFinish(clienteBaixo), false);

  const outroBaixo = { ...ok, acionista: 69 };
  assert.equal(canFinish(outroBaixo), false);
});
