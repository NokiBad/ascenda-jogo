(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ApoloProtocol = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  const PLAYER_KEYS = [
    'id', 'name', 'x', 'y', 'floor', 'skin', 'hair',
    'style', 'outfit', 'accessory', 'dir', 'moving'
  ];

  function hasExactKeys(value, keys) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    const prototype = Object.getPrototypeOf(value);
    return (prototype === Object.prototype || prototype === null)
      && Object.keys(value).length === keys.length
      && keys.every(key => Object.hasOwn(value, key));
  }

  function validPlayer(player, { skins, hairs, walkable, width, height, floors }) {
    return hasExactKeys(player, PLAYER_KEYS)
      && typeof player.id === 'string' && player.id.length > 0 && player.id.length < 100
      && typeof player.name === 'string' && player.name.length > 0 && player.name.length <= 20
      && Number.isFinite(player.x) && player.x >= 0 && player.x <= width
      && Number.isFinite(player.y) && player.y >= 0 && player.y <= height
      && Number.isInteger(player.floor) && player.floor >= 0 && player.floor < floors
      && skins.includes(player.skin) && hairs.includes(player.hair)
      && Number.isInteger(player.style) && player.style >= 0 && player.style < 8
      && Number.isInteger(player.outfit) && player.outfit >= 0 && player.outfit < 6
      && ['none', 'glasses', 'backpack', 'headphones', 'glasses-backpack'].includes(player.accessory)
      && [0, 1, 2, 3].includes(player.dir)
      && typeof player.moving === 'boolean'
      && walkable(player.floor, player.x, player.y, 6);
  }

  function validPlayerPacket(packet, isValidPlayer) {
    return hasExactKeys(packet, ['type', 'player'])
      && packet.type === 'player' && isValidPlayer(packet.player);
  }

  function validWorldPacket(packet, isValidPlayer) {
    return hasExactKeys(packet, ['type', 'players'])
      && packet.type === 'world'
      && Array.isArray(packet.players)
      && packet.players.length <= 40
      && packet.players.every(isValidPlayer);
  }

  function isFullPacket(packet) {
    return hasExactKeys(packet, ['type']) && packet.type === 'full';
  }

  return { isFullPacket, validPlayer, validPlayerPacket, validWorldPacket };
});
