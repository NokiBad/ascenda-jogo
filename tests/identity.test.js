const test = require('node:test');
const assert = require('node:assert/strict');

// Simula o filtro de identidade do jogador usado em game.js joinRoom/createRoom
// Antes do bug: usava peer.id (curto, PeerJS) que nunca coincidia com me.id (UUID)
// Depois do fix: so compara com me.id (UUID do jogador)
function filterRemotePlayers(players, meId, peerId) {
  return players.filter(p => p.id !== meId);
}

test('filtro remove o proprio jogador pelo UUID (me.id), nao pelo peer.id', () => {
  const players = [
    { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Ana' }, // me.id (UUID)
    { id: 'peer-abc123', name: 'PeerJS id antigo' },            // peer.id antigo
    { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Bia' } // outro jogador
  ];

  const resultado = filterRemotePlayers(players, '550e8400-e29b-41d4-a716-446655440001', 'peer-abc123');

  // so o proprio jogador (me.id) e removido; o peer.id antigo nao e mais usado para filtrar
  assert.equal(resultado.length, 2);
  assert.ok(resultado.find(p => p.id === 'peer-abc123'));
});

test('nao remove outro jogador que tenha id igual ao peer.id antigo', () => {
  const players = [
    { id: 'peer-abc123', name: 'Outro jogador com mesmo id do peer antigo' }
  ];

  const resultado = filterRemotePlayers(players, '550e8400-e29b-41d4-a716-446655440001', 'peer-abc123');

  // com o filtro correto (so me.id), este jogador nao deve ser removido
  assert.equal(resultado.length, 1);
});
