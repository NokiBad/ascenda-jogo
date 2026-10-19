const test = require('node:test');
const assert = require('node:assert/strict');
const Progress = require('../progress.js');

const player = {
  name: 'Ana',
  skin: '#e6ac85',
  hair: '#49312c',
  style: 2,
  outfit: 1,
  accessory: 'glasses'
};
const visited = ['recepcao', 'rh'];

test('backup round-trips profile, visited NPCs, and completion', () => {
  const backup = Progress.makeBackup(player, visited, false);
  const result = Progress.parseBackup(JSON.stringify(backup));
  assert.deepEqual(result, { profile: player, visited, complete: false });
  assert.equal(backup.schemaVersion, 1);
});

test('accepts a completed backup only when all twelve discoveries are present', () => {
  const ids = [
    'recepcao', 'rh', 'financeiro', 'comercial', 'soc', 'intel',
    'infra', 'grc', 'appsec', 'red', 'cloud', 'direcao'
  ];
  assert.equal(Progress.validBackup(Progress.makeBackup(player, ids, true)), true);
  assert.equal(Progress.validBackup(Progress.makeBackup(player, visited, false)), true);
  assert.throws(() => Progress.makeBackup(player, visited, true), /não pode ser exportado/);
});

test('rejects unsupported schema, extra fields, unknown NPCs, duplicates, and unsafe names', () => {
  const base = Progress.makeBackup(player, visited, false);
  for (const invalid of [
    { ...base, schemaVersion: 2 },
    { ...base, injected: true },
    { ...base, profile: { ...player, name: 'x'.repeat(21) } },
    { ...base, progress: { visited: ['recepcao', 'desconhecido'], complete: false } },
    { ...base, progress: { visited: ['recepcao', 'recepcao'], complete: false } },
    { ...base, profile: { ...player, name: '   ' } },
    { ...base, profile: { ...player, name: 'linha\ninjetada' } }
  ]) assert.equal(Progress.validBackup(invalid), false);
});

test('rejects invalid JSON and payloads exceeding 16 KiB', () => {
  assert.throws(() => Progress.parseBackup('{'));
  assert.throws(() => Progress.parseBackup('x'.repeat(Progress.MAX_BACKUP_BYTES + 1)), /16 KiB/);
  assert.throws(
    () => Progress.parseBackup(`{"value":"${'é'.repeat(9000)}"}`),
    /16 KiB/
  );
});

test('writes progress using the versioned storage key', () => {
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
  Progress.writeLocal(storage, { profile: player, visited, complete: false });
  assert.equal(JSON.parse(values.get('apolo-v3')).schemaVersion, Progress.SCHEMA_VERSION);
  assert.deepEqual(Progress.readLocal(storage), { profile: player, visited, complete: false });
});

test('migrates only known legacy profile values and NPC progress', () => {
  const storage = {
    getItem(key) {
      return key === 'apolo-v2'
        ? JSON.stringify({ ...player, visited: ['rh', 'rh', 'invalid'], complete: true })
        : null;
    }
  };
  assert.deepEqual(Progress.readLocal(storage), {
    profile: player,
    visited: ['rh'],
    complete: false
  });
});

test('does not fall back to stale legacy data when the versioned backup is corrupt', () => {
  const storage = {
    getItem(key) {
      if (key === 'apolo-v3') return '{broken';
      if (key === 'apolo-v2') return JSON.stringify({ ...player, name: 'stale' });
      return null;
    }
  };
  assert.equal(Progress.readLocal(storage), null);
});
