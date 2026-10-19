const test = require('node:test');
const assert = require('node:assert/strict');
const Protocol = require('../protocol.js');

const config = {
  skins: ['#e6ac85'],
  hairs: ['#49312c'],
  walkable: () => true,
  width: 1536,
  height: 1024,
  floors: 4
};
const player = {
  id: 'peer-1',
  name: 'Ana',
  x: 20,
  y: 30,
  floor: 0,
  skin: '#e6ac85',
  hair: '#49312c',
  style: 0,
  outfit: 0,
  accessory: 'none',
  dir: 0,
  moving: false
};
const validate = value => Protocol.validPlayer(value, config);

test('accepts valid player state and rejects malformed or out-of-bounds state', () => {
  assert.equal(validate(player), true);
  assert.equal(validate({ ...player, x: 1537 }), false);
  assert.equal(validate({ ...player, floor: 4 }), false);
  assert.equal(validate({ ...player, style: 8 }), false);
  assert.equal(validate({ ...player, name: 'x'.repeat(21) }), false);
  assert.equal(validate({ ...player, extra: 'ignored by the UI, rejected by protocol' }), false);
  assert.equal(validate([player]), false);
  assert.equal(Protocol.validPlayer(null, config), false);
});

test('validates peer-to-host and host-to-peer packet envelopes', () => {
  assert.equal(Protocol.validPlayerPacket({ type: 'player', player }, validate), true);
  assert.equal(Protocol.validPlayerPacket({ type: 'player', player, extra: true }, validate), false);
  assert.equal(Protocol.validPlayerPacket({ type: 'player', player: { ...player, x: -1 } }, validate), false);
  assert.equal(Protocol.validWorldPacket({ type: 'world', players: [player] }, validate), true);
  assert.equal(Protocol.validWorldPacket({ type: 'world', players: [{ ...player, floor: 8 }] }, validate), false);
  assert.equal(Protocol.validWorldPacket({ type: 'world', players: Array(41).fill(player) }, validate), false);
  assert.equal(Protocol.isFullPacket({ type: 'full' }), true);
  assert.equal(Protocol.isFullPacket({ type: 'full', players: 'unexpected' }), false);
  assert.equal(Protocol.isFullPacket(null), false);
});
