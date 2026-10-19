(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ApoloProgress = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  const SCHEMA_VERSION = 1;
  const MAX_BACKUP_BYTES = 16 * 1024;
  const IDS = new Set([
    'recepcao', 'rh', 'financeiro', 'comercial', 'soc', 'intel',
    'infra', 'grc', 'appsec', 'red', 'cloud', 'direcao'
  ]);
  const SKINS = new Set(['#f2d2bb', '#e6ac85', '#cd8d65', '#a66a48', '#814d35', '#553023']);
  const HAIRS = new Set(['#211d26', '#49312c', '#865037', '#d7b16f', '#c3c9d5', '#8b315e']);
  const ACCESSORIES = new Set(['none', 'glasses', 'backpack', 'headphones', 'glasses-backpack']);
  const PROFILE_KEYS = ['name', 'skin', 'hair', 'style', 'outfit', 'accessory'];

  function isPlainObject(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  function hasExactKeys(value, keys) {
    return isPlainObject(value)
      && Object.keys(value).length === keys.length
      && keys.every(key => Object.hasOwn(value, key));
  }

  function validProfile(profile) {
    return hasExactKeys(profile, PROFILE_KEYS)
      && typeof profile.name === 'string'
      && profile.name.length <= 20
      && profile.name.trim().length > 0
      && !/[\u0000-\u001f\u007f]/.test(profile.name)
      && SKINS.has(profile.skin)
      && HAIRS.has(profile.hair)
      && Number.isInteger(profile.style) && profile.style >= 0 && profile.style < 8
      && Number.isInteger(profile.outfit) && profile.outfit >= 0 && profile.outfit < 6
      && ACCESSORIES.has(profile.accessory);
  }

  function makeBackup(profile, visited, complete) {
    const value = {
      app: 'apolo',
      schemaVersion: SCHEMA_VERSION,
      profile: { ...profile },
      progress: { visited: [...visited], complete }
    };
    if (!validBackup(value)) throw new TypeError('O progresso atual não pode ser exportado.');
    return value;
  }

  function validBackup(value) {
    if (!hasExactKeys(value, ['app', 'schemaVersion', 'profile', 'progress'])
        || value.app !== 'apolo' || value.schemaVersion !== SCHEMA_VERSION
        || !validProfile(value.profile)
        || !hasExactKeys(value.progress, ['visited', 'complete'])
        || !Array.isArray(value.progress.visited)
        || value.progress.visited.length > IDS.size
        || typeof value.progress.complete !== 'boolean') return false;
    const seen = new Set();
    for (const id of value.progress.visited) {
      if (typeof id !== 'string' || !IDS.has(id) || seen.has(id)) return false;
      seen.add(id);
    }
    return !value.progress.complete || seen.size === IDS.size;
  }

  function parseBackup(text) {
    if (typeof text !== 'string' || text.length === 0 || text.length > MAX_BACKUP_BYTES) {
      throw new TypeError('O arquivo de progresso está vazio ou excede o limite de 16 KiB.');
    }
    if (typeof TextEncoder === 'function' && new TextEncoder().encode(text).byteLength > MAX_BACKUP_BYTES) {
      throw new TypeError('O arquivo de progresso excede o limite de 16 KiB.');
    }
    let value;
    try {
      value = JSON.parse(text);
    } catch {
      throw new TypeError('O arquivo não contém JSON válido.');
    }
    if (!validBackup(value)) throw new TypeError('O arquivo não corresponde a um backup ASCENDA válido.');
    return {
      profile: { ...value.profile },
      visited: [...value.progress.visited],
      complete: value.progress.complete
    };
  }

  function fromLegacy(value) {
    if (!isPlainObject(value)) return null;
    const profile = {
      name: typeof value.name === 'string' ? value.name.slice(0, 20).replace(/[\u0000-\u001f\u007f]/g, '') : '',
      skin: SKINS.has(value.skin) ? value.skin : '#e6ac85',
      hair: HAIRS.has(value.hair) ? value.hair : '#49312c',
      style: Number.isInteger(value.style) && value.style >= 0 && value.style < 8 ? value.style : 0,
      outfit: Number.isInteger(value.outfit) && value.outfit >= 0 && value.outfit < 6 ? value.outfit : 0,
      accessory: ACCESSORIES.has(value.accessory) ? value.accessory : 'none'
    };
    const visited = [...new Set(Array.isArray(value.visited)
      ? value.visited.filter(id => typeof id === 'string' && IDS.has(id))
      : [])];
    return { profile, visited, complete: value.complete === true && visited.length === IDS.size };
  }

  function readLocal(storage) {
    const current = storage.getItem('apolo-v3');
    if (current !== null) {
      try {
        return parseBackup(current);
      } catch {
        return null;
      }
    }
    for (const key of ['apolo-v2', 'apollo-v1']) {
      const raw = storage.getItem(key);
      if (raw === null || raw.length > MAX_BACKUP_BYTES) continue;
      try {
        const result = fromLegacy(JSON.parse(raw));
        if (result) return result;
      } catch {
        continue;
      }
    }
    return null;
  }

  function writeLocal(storage, state) {
    storage.setItem('apolo-v3', JSON.stringify(makeBackup(state.profile, state.visited, state.complete)));
  }

  return {
    MAX_BACKUP_BYTES,
    SCHEMA_VERSION,
    makeBackup,
    parseBackup,
    readLocal,
    validBackup,
    validProfile,
    writeLocal
  };
});
